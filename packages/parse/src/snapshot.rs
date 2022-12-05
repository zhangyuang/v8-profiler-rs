pub mod snapshot {

    use crate::define::define::{
        Edge, EdgePropertyType, Heapsnapshot, JsValueType, Node, NodePropertyType, RcNode,
        EDGE_FIELDS, EDGE_OTHERS_PROPERTY, EDGE_TYPES_PROPERTY, NODE_OTHERS_PROPERTY,
        NODE_TYPES_PROPERTY,
    };
    use chrono::prelude::*;
    use std::cell::RefCell;
    use std::collections::HashMap;
    use std::fs::read_to_string;
    use std::rc::Rc;
    use std::sync::{Arc, Mutex};
    use std::thread;
    use yuuang_petgraph::algo::dominators::Dominators;
    pub fn parse_snapshot(path: &str, multiply_threads: bool) -> Vec<RcNode> {
        let now = Local::now().timestamp_millis();
        let (node_struct_arr, id_to_ordinal, node_map) = parse_snapshot_with_node(path);
        let root_id = 1;
        let user_root_id = 4445;
        let mut flags = vec![0; node_struct_arr.len()];
        flags[get_ordinal(&id_to_ordinal, user_root_id)] = 1;
        let mut edges_retainer: Vec<(u32, u32)> = vec![];
        mark_page_own_node(
            user_root_id,
            &node_map,
            &mut HashMap::new(),
            &mut flags,
            &id_to_ordinal,
        );
        println!(
            "calculate page own node spend {}ms",
            Local::now().timestamp_millis() - now
        );
        mark_retainer(
            root_id,
            &node_map,
            &mut HashMap::new(),
            &mut flags,
            &id_to_ordinal,
            &mut edges_retainer,
        );
        println!(
            "calculate retaineder spend {}ms",
            Local::now().timestamp_millis() - now
        );
        collect_edges(root_id, &node_map, &mut HashMap::new(), &mut edges_retainer);
        println!(
            "calculate collect_edges spend {}ms",
            Local::now().timestamp_millis() - now
        );
        let doms: Dominators<u32> = Dominators {
            root: 1,
            dominators: edges_retainer.iter().cloned().collect(),
        };
        let node_ids = node_struct_arr
            .iter()
            .map(|x| usize::from(&x.borrow().id))
            .collect::<Vec<usize>>();
        let immdiately_node_dominator = if multiply_threads {
            get_dominators_by_multiply_threads(node_ids, doms)
        } else {
            let mut immdiately_node_dominator: HashMap<usize, Vec<u32>> = HashMap::new();
            for node_id in node_ids {
                let dom_by: Vec<u32> = doms.immediately_dominated_by(node_id as u32).collect();
                immdiately_node_dominator.insert(node_id, dom_by);
            }
            immdiately_node_dominator
        };
        let mut all_node_dominator: HashMap<usize, Vec<u32>> = HashMap::new();
        for node in &node_struct_arr {
            let node = node.borrow();
            let node_id = usize::from(&node.id);
            let queue =
                get_all_retainer_node(&immdiately_node_dominator, node_id, &mut HashMap::new());
            all_node_dominator.insert(node_id, queue);
        }

        for node in &node_struct_arr {
            let mut node = node.borrow_mut();
            let node_id = usize::from(&node.id);
            let all_node_dominators = all_node_dominator.get(&node_id).unwrap();
            let mut retained_size = usize::from(&node.self_size);
            for retained_node_id in all_node_dominators {
                let retained_node_id = *retained_node_id as usize;
                if retained_node_id != node_id {
                    let retained_node = node_map.get(&retained_node_id);
                    retained_size += usize::from(&retained_node.unwrap().borrow().self_size);
                }
            }
            node.retained_size = Some(retained_size)
        }
        println!(
            "calculate retainedsize spend {}ms",
            Local::now().timestamp_millis() - now
        );

        node_struct_arr
    }
    fn parse_snapshot_with_node(
        path: &str,
    ) -> (
        Vec<Rc<RefCell<Node>>>,
        HashMap<usize, usize>,
        HashMap<usize, Rc<RefCell<Node>>>,
    ) {
        let now = Local::now().timestamp_millis();
        let mut node_map = HashMap::new();
        let (snapshot, node_fields_len) = read_to_snapshot(path);
        let nodes = snapshot.snapshot.node_count;
        let node_struct_arr: Vec<RcNode> = (0..nodes)
            .enumerate()
            .map(|(i, _)| {
                let node_start = i * node_fields_len;
                let node = Rc::new(RefCell::new(Node {
                    node_type: get_node_property(node_start, 0, &snapshot),
                    name: get_node_property(node_start, 1, &snapshot),
                    id: get_node_property(node_start, 2, &snapshot),
                    self_size: get_node_property(node_start, 3, &snapshot),
                    edge_count: get_node_property(node_start, 4, &snapshot),
                    // trace_node_id: get_node_property(node_start, 5, &snapshot),
                    edges: vec![],
                    retained_size: None,
                    parents: vec![],
                }));
                node_map.insert(usize::from(&node.borrow_mut().id), Rc::clone(&node));
                Rc::clone(&node)
            })
            .collect();
        let mut edge_index = 0; // 代表当前是第几个 edge
        let mut id_to_ordinal: HashMap<usize, usize> = HashMap::new();
        println!(
            "calculate node spend {}ms",
            Local::now().timestamp_millis() - now
        );
        node_struct_arr
            .iter()
            .enumerate()
            .for_each(|(index, node)| {
                let mut node = node.borrow_mut();
                let node_id = usize::from(&node.id);
                id_to_ordinal.insert(usize::from(&node.id), index);
                let edge_count = usize::from(&node.edge_count);
                let edges = (0..edge_count)
                    .map(|_| {
                        let edge_start = edge_index * EDGE_FIELDS.len();
                        let edge_type = get_edgs_property(edge_start, 0, &snapshot);
                        let is_weak_retainer = String::from(&edge_type) == String::from("weak");
                        let edge = Edge {
                            edge_type,
                            name_or_index: get_edgs_property(edge_start, 1, &snapshot),
                            to_node: get_edgs_property(edge_start, 2, &snapshot),
                            is_weak_retainer,
                            is_retainer: true,
                        };
                        let to_node_id = usize::from(&edge.to_node);
                        let to_node = node_map.get(&to_node_id).unwrap();
                       
                        if to_node_id != node_id {
                            to_node.borrow_mut().parents.push(usize::from(&node.id));
                        } else {
                            node.parents.push(node_id)
                        }

                        edge_index += 1;
                        edge
                    })
                    .collect();
                node.edges = edges;
            });
        println!(
            "calculate edge spend {}ms",
            Local::now().timestamp_millis() - now
        );
        (node_struct_arr, id_to_ordinal, node_map)
    }
    fn get_dominators_by_multiply_threads(
        node_ids: Vec<usize>,
        doms: Dominators<u32>,
    ) -> HashMap<usize, Vec<u32>> {
        let now = Local::now().timestamp_millis();
        let immdiately_node_dominator = Arc::new(Mutex::new(HashMap::new()));
        let mut handles = vec![];
        let thread_nums = 10;
        let (mut start, length) = (0, node_ids.len() - 1);
        let node_ids = Arc::new(node_ids);
        let doms = Arc::new(doms);
        for num in 0..thread_nums {
            let node_ids = Arc::clone(&node_ids);
            let immdiately_node_dominator = Arc::clone(&immdiately_node_dominator);
            let doms = Arc::clone(&doms);
            let end: usize = if num == thread_nums - 1 {
                node_ids.len() - 1
            } else {
                start + length / thread_nums
            };
            let handle = thread::spawn(move || {
                for i in start..end {
                    let node_id = node_ids[i];
                    let dom_by: Vec<u32> = doms.immediately_dominated_by(node_id as u32).collect();
                    immdiately_node_dominator
                        .lock()
                        .unwrap()
                        .insert(node_id, dom_by);
                }
            });
            start = end;
            handles.push(handle);
        }
        for handle in handles {
            handle.join().unwrap();
        }
        let immdiately_node_dominator_main = immdiately_node_dominator.lock().unwrap().clone();
        println!(
            "calculate immediately_dominated spend {}ms",
            Local::now().timestamp_millis() - now
        );
        immdiately_node_dominator_main
    }
    fn get_all_retainer_node(
        immdiately_node_dominator: &HashMap<usize, Vec<u32>>,
        node_id: usize,
        has_visited_map: &mut HashMap<usize, bool>,
    ) -> Vec<u32> {
        let mut queue = vec![];
        if immdiately_node_dominator.get(&node_id).is_none() {
            return queue;
        }
        let immediately_nodes = immdiately_node_dominator.get(&node_id).unwrap();
        for node in immediately_nodes {
            let node = *node as usize;
            if has_visited_map.get(&node).is_none() {
                queue.push(node as u32);
                has_visited_map.insert(node, true);
                queue.append(&mut get_all_retainer_node(
                    immdiately_node_dominator,
                    node,
                    has_visited_map,
                ));
            }
        }
        return queue;
    }
    fn collect_edges(
        user_root_id: usize,
        node_map: &HashMap<usize, RcNode>,
        has_visited_map: &mut HashMap<usize, bool>,
        edges_retainer: &mut Vec<(u32, u32)>,
    ) {
        if has_visited_map.get(&user_root_id).is_some() {
            return;
        }
        let user_root = node_map.get(&user_root_id).unwrap().borrow();
        has_visited_map.insert(user_root_id, true);
        user_root.edges.iter().for_each(|edge| {
            let to_node_id = usize::from(&edge.to_node);
            if edge.is_retainer {
                edges_retainer.push((to_node_id as u32, user_root_id as u32));
            }
            collect_edges(to_node_id, node_map, has_visited_map, edges_retainer);
        });
    }
    fn mark_page_own_node(
        user_root_id: usize,
        node_map: &HashMap<usize, RcNode>,
        has_visited_map: &mut HashMap<usize, bool>,
        flags: &mut Vec<i32>,
        id_to_ordinal: &HashMap<usize, usize>,
    ) {
        if has_visited_map.get(&user_root_id).is_some() {
            return;
        }
        let user_root = node_map.get(&user_root_id).unwrap().borrow();
        has_visited_map.insert(user_root_id, true);
        user_root.edges.iter().for_each(|edge| {
            let to_node_id = usize::from(&edge.to_node);
            if !edge.is_weak_retainer {
                flags[get_ordinal(id_to_ordinal, to_node_id)] = 1;
                mark_page_own_node(to_node_id, node_map, has_visited_map, flags, id_to_ordinal);
            }
        });
    }
    fn mark_retainer(
        root_id: usize,
        node_map: &HashMap<usize, RcNode>,
        has_visited_map: &mut HashMap<usize, bool>,
        flags: &mut Vec<i32>,
        id_to_ordinal: &HashMap<usize, usize>,
        edges_retainer: &mut Vec<(u32, u32)>,
    ) {
        if has_visited_map.get(&root_id).is_some() {
            return;
        }
        let mut root = node_map.get(&root_id).unwrap().borrow_mut();
        let root_id = usize::from(&root.id);
        has_visited_map.insert(root_id, false);
        root.edges.iter_mut().for_each(|edge| {
            let to_node_id = usize::from(&edge.to_node);
            if edge.is_weak_retainer
                || (String::from(&edge.edge_type) == String::from("shortcut") && root_id != 1)
            {
                edge.is_retainer = false
            }
            if root_id != 1
                && (flags[get_ordinal(&id_to_ordinal, root_id)] == 0
                    && flags[get_ordinal(&id_to_ordinal, to_node_id)] == 1)
            {
                edge.is_retainer = false
            }

            mark_retainer(
                to_node_id,
                node_map,
                has_visited_map,
                flags,
                id_to_ordinal,
                edges_retainer,
            );
        });
    }

    fn get_ordinal(id_to_ordinal: &HashMap<usize, usize>, node_id: usize) -> usize {
        *id_to_ordinal.get(&node_id).unwrap()
    }

    fn read_to_snapshot(path: &str) -> (Heapsnapshot, usize) {
        let snapshot_string = if path.starts_with("{") {
            String::from(path)
        } else {
            read_to_string(path).expect("file not found")
        };

        let heap_snap_shot =
            serde_json::from_str::<Heapsnapshot>(&snapshot_string).expect("type format error");
        let node_fields_len = &heap_snap_shot.snapshot.meta.node_fields.len();
        (heap_snap_shot, *node_fields_len)
    }
    fn get_edgs_property(edge_start: usize, col: usize, snapshot: &Heapsnapshot) -> JsValueType {
        // edge_start 代表当前 edge 的起始索引, col 代表属性的偏移量
        let offset = edge_start + col;
        let edge_val = snapshot.edges[offset];
        let edge_property_type: EdgePropertyType = if col == 0 {
            EdgePropertyType::Arr(EDGE_TYPES_PROPERTY)
        } else {
            EdgePropertyType::Str(EDGE_OTHERS_PROPERTY[col - 1].clone())
        };
        let edge_property_val: JsValueType = match edge_property_type {
            EdgePropertyType::Str(property_type) => {
                if property_type == "string" || property_type == "string_or_number" {
                    if edge_val >= snapshot.strings.len() {
                        JsValueType::JsString("".to_string())
                    } else {
                        JsValueType::JsString(snapshot.strings[edge_val].to_string())
                    }
                } else if property_type == "number" {
                    JsValueType::JsNumber(edge_val)
                } else if property_type == "node" {
                    get_node_property(edge_val, 2, snapshot)
                } else {
                    panic!("unknkow property_type {} ", property_type)
                }
            }
            EdgePropertyType::Arr(property_type_arr) => {
                JsValueType::JsString(property_type_arr[edge_val].to_string())
            }
        };
        edge_property_val
    }

    pub fn get_node_property(
        node_start: usize,
        col: usize,
        snapshot: &Heapsnapshot,
    ) -> JsValueType {
        // node_start 代表当前 node 的起始索引, col 代表属性的偏移量
        let offset = node_start + col; // 当前属性在 nodes 中的索引
        let node_val = snapshot.nodes[offset];
        let node_property_type: NodePropertyType = if col == 0 {
            NodePropertyType::Arr(NODE_TYPES_PROPERTY)
        } else {
            NodePropertyType::Str(NODE_OTHERS_PROPERTY[col - 1].clone())
        };
        let node_property_val: JsValueType = match node_property_type {
            NodePropertyType::Str(property_type) => {
                if property_type == "string" {
                    if node_val >= snapshot.strings.len() {
                        JsValueType::JsString("".to_string())
                    } else {
                        JsValueType::JsString(snapshot.strings[node_val].to_string())
                    }
                } else if property_type == "number" {
                    JsValueType::JsNumber(node_val)
                } else {
                    panic!("unknkow property_type {} ", property_type)
                }
            }
            NodePropertyType::Arr(property_type_arr) => {
                if node_val >= property_type_arr.len() {
                    JsValueType::JsString("".to_string())
                } else {
                    JsValueType::JsString(property_type_arr[node_val].to_string())
                }
            }
        };
        node_property_val
    }
}
