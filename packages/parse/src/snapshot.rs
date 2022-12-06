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
    use yuuang_dominators::algo::dominators::simple_fast;
    use yuuang_dominators::graph::{DiGraph, NodeIndex};
    use yuuang_dominators::Graph;
    pub fn parse_snapshot(path: &str) -> Vec<RcNode> {
        let now = Local::now().timestamp_millis();
        let mut graph = DiGraph::<usize, usize>::new();
        let graph_mut = &mut graph;
        let (node_struct_arr, id_to_ordinal, node_map) = parse_snapshot_with_node(path, graph_mut);
        let root_id = 1;
        let root_node = &node_struct_arr[0].borrow().clone();
        let user_root_id = root_node
            .edges
            .iter()
            .find(|&edge| String::from(&edge.edge_type) == "shortcut");
        let user_root_id = usize::from(&user_root_id.unwrap().to_node);
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
            graph_mut,
        );

        let (doms, post_order) = simple_fast(&graph, NodeIndex::new(0));

        for post_order_index in post_order {
            let node_ordinal = post_order_index.index();
            if node_ordinal != 0 {
                let dominator = doms.immediate_dominator(post_order_index).unwrap().index();
                let mut dominator_node = node_struct_arr[dominator].borrow_mut();
                let be_dominator_node = node_struct_arr[node_ordinal].borrow_mut();
                dominator_node.retained_size += be_dominator_node.retained_size;
            }
        }
        println!(
            "calculate retainedsize spend {}ms",
            Local::now().timestamp_millis() - now
        );

        node_struct_arr
    }

    fn parse_snapshot_with_node(
        path: &str,
        graph: &mut Graph<usize, usize>,
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
                    retained_size: 0,
                    parents: vec![],
                }));
                let mut node_mut = node.borrow_mut();
                node_mut.retained_size = usize::from(&node_mut.self_size);
                node_map.insert(usize::from(&node_mut.id), Rc::clone(&node));
                graph.add_node(usize::from(&node_mut.id));
                Rc::clone(&node)
            })
            .collect();
        let mut edge_index = 0; // 代表当前是第几个 edge
        let mut id_to_ordinal: HashMap<usize, usize> = HashMap::new();
        println!(
            "calculate node {} spend {}ms",
            node_struct_arr.len(),
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
    fn get_all_retainer_node(
        immdiately_node_dominator: &HashMap<usize, Vec<usize>>,
        node_id: usize,
        has_visited_map: &mut HashMap<usize, bool>,
    ) -> Vec<usize> {
        let mut queue = vec![];
        if immdiately_node_dominator.get(&node_id).is_none() {
            return queue;
        }
        let immediately_nodes = immdiately_node_dominator.get(&node_id).unwrap();
        for node in immediately_nodes {
            let node = *node as usize;
            if has_visited_map.get(&node).is_none() {
                queue.push(node);
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
        graph: &mut Graph<usize, usize>,
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
            if edge.is_retainer {
                graph.add_edge(
                    NodeIndex::new(get_ordinal(&id_to_ordinal, root_id)),
                    NodeIndex::new(get_ordinal(&id_to_ordinal, to_node_id)),
                    0,
                );
            }

            mark_retainer(
                to_node_id,
                node_map,
                has_visited_map,
                flags,
                id_to_ordinal,
                edges_retainer,
                graph,
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
