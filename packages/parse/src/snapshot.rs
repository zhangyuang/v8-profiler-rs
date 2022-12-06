pub mod snapshot {
    // use wasm_bindgen::prelude::*;

    // // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // // allocator.
    // #[cfg(feature = "wee_alloc")]
    // #[global_allocator]
    // static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

    // #[wasm_bindgen]
    // extern "C" {
    //     // Use `js_namespace` here to bind `console.log(..)` instead of just
    //     // `log(..)`
    //     #[wasm_bindgen(js_namespace = console)]
    //     fn log(s: &str);

    //     // The `console.log` is quite polymorphic, so we can bind it with multiple
    //     // signatures. Note that we need to use `js_name` to ensure we always call
    //     // `log` in JS.
    //     #[wasm_bindgen(js_namespace = console, js_name = log)]
    //     fn log_u32(a: u32);

    //     // Multiple arguments too!
    //     #[wasm_bindgen(js_namespace = console, js_name = log)]
    //     fn log_many(a: &str, b: &str);
    // }
    // macro_rules! console_log {
    //   // Note that this is using the `log` function imported above during
    //   // `bare_bones`
    //   ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
    // }
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
        let (mut node_struct_arr, id_to_ordinal) = parse_snapshot_with_node(path, graph_mut);
        let root_node = &node_struct_arr[0].borrow().clone();
        let user_root_id = root_node
            .edges
            .iter()
            .find(|&edge| String::from(&edge.edge_type) == "shortcut");
        let user_root_id = usize::from(&user_root_id.unwrap().to_node);
        let mut flags = vec![0; node_struct_arr.len()];
        let node_struct_arr_mut = &mut node_struct_arr;
        flags[get_ordinal(&id_to_ordinal, user_root_id)] = 1;
        mark_page_own_node(
            user_root_id,
            node_struct_arr_mut,
            &mut flags,
            &id_to_ordinal,
        );
        println!(
            "calculate page own node spend {}ms",
            Local::now().timestamp_millis() - now
        );

        mark_retainer(node_struct_arr_mut, &mut flags, &id_to_ordinal, graph_mut);

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
        node_struct_arr.sort_by(|a, b| b.borrow().retained_size.cmp(&a.borrow().retained_size));
        node_struct_arr
    }

    fn parse_snapshot_with_node(
        path: &str,
        graph: &mut Graph<usize, usize>,
    ) -> (Vec<Rc<RefCell<Node>>>, HashMap<usize, usize>) {
        let now = Local::now().timestamp_millis();
        let mut id_to_ordinal: HashMap<usize, usize> = HashMap::new();
        let (snapshot, node_fields_len) = read_to_snapshot(path);
        let nodes = snapshot.snapshot.node_count;
        let node_struct_arr: Vec<RcNode> = (0..nodes)
            .enumerate()
            .map(|(index, _)| {
                let node_start = index * node_fields_len;
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
                id_to_ordinal.insert(usize::from(&node_mut.id), index);
                node_mut.retained_size = usize::from(&node_mut.self_size);
                graph.add_node(usize::from(&node_mut.id));
                Rc::clone(&node)
            })
            .collect();
        let mut edge_index = 0; // 代表当前是第几个 edge
        println!(
            "calculate node {} spend {}ms",
            node_struct_arr.len(),
            Local::now().timestamp_millis() - now
        );
        node_struct_arr.iter().enumerate().for_each(|(_, node)| {
            let mut node = node.borrow_mut();
            let node_id = usize::from(&node.id);
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
                    let to_node = &node_struct_arr[get_ordinal(&id_to_ordinal, to_node_id)];

                    if to_node_id != node_id {
                        to_node.borrow_mut().parents.push(usize::from(&node.id));
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
        (node_struct_arr, id_to_ordinal)
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
        node_struct_arr: &mut Vec<Rc<RefCell<Node>>>,
        flags: &mut Vec<i32>,
        id_to_ordinal: &HashMap<usize, usize>,
    ) {
        let user_root = &node_struct_arr[get_ordinal(id_to_ordinal, user_root_id)];
        let mut has_visited_map = HashMap::new();
        let mut queue:Vec<usize> = vec![usize::from(&user_root.borrow().id)];
        while queue.len() !=0 {
            let node_id = queue.pop().unwrap();
            if has_visited_map.get(&node_id).is_some() {
                continue;
            }
            has_visited_map.insert(node_id, true);
            let node = &node_struct_arr[get_ordinal(id_to_ordinal, node_id)].borrow();
            for edge in &node.edges {
                let to_node_id = usize::from(&edge.to_node);
                if to_node_id != node_id {
                    if !edge.is_weak_retainer {
                        flags[get_ordinal(id_to_ordinal, to_node_id)] = 1;
                    }
                    let to_node =&node_struct_arr[get_ordinal(id_to_ordinal, to_node_id)];
                    queue.push(usize::from(&to_node.borrow().id))
                }
            }
        }
    }
    fn mark_retainer(
        node_struct_arr: &mut Vec<Rc<RefCell<Node>>>,
        flags: &mut Vec<i32>,
        id_to_ordinal: &HashMap<usize, usize>,
        graph: &mut Graph<usize, usize>,
    ) {
        for node in node_struct_arr {
            let mut node_mut = node.borrow_mut();
            let node_id = usize::from(&node_mut.id);
            for edge in &mut node_mut.edges {
                let to_node_id = usize::from(&edge.to_node);
                if to_node_id == node_id {
                    continue;
                }
                if edge.is_weak_retainer
                    || (String::from(&edge.edge_type) == String::from("shortcut") && node_id != 1)
                {
                    edge.is_retainer = false
                }
                if node_id != 1
                    && (flags[get_ordinal(&id_to_ordinal, node_id)] == 0
                        && flags[get_ordinal(&id_to_ordinal, to_node_id)] == 1)
                {
                    edge.is_retainer = false
                }
                if edge.is_retainer {
                    graph.add_edge(
                        NodeIndex::new(get_ordinal(&id_to_ordinal, node_id)),
                        NodeIndex::new(get_ordinal(&id_to_ordinal, to_node_id)),
                        0,
                    );
                }
            }
        }
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
