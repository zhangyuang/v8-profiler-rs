pub mod snapshot {
    use crate::define::define::{
        forbidden_edge_type, Edge, EdgeFields, EdgeOthersProperty, EdgePropertyType,
        EdgeTypesProperty, Heapsnapshot, JsValueType, Node, NodeFields, NodeOthersProperty,
        NodePropertyType, NodeTypesProperty, RcNode,
    };
    use std::cell::RefCell;
    use std::collections::HashMap;
    use std::fs::read_to_string;
    use std::rc::Rc;
    pub fn can_access(edge_type: String) -> bool {
        return forbidden_edge_type
            .iter()
            .find(|&&item| item == edge_type.as_str())
            .is_none();
    }
    pub fn parse_snapshot(path: &str) -> Vec<RcNode> {
        let mut node_map = HashMap::new();
        let snapshot = read_to_snapshot(path);
        let nodes = snapshot.snapshot.node_count;
        let node_struct_arr: Vec<RcNode> = (0..nodes)
            .enumerate()
            .map(|(i, _)| {
                let node_start = i * NodeFields.len();
                let node = Rc::new(RefCell::new(Node {
                    node_type: get_node_property(node_start, 0, &snapshot),
                    id: get_node_property(node_start, 2, &snapshot),
                    name: get_node_property(node_start, 1, &snapshot),
                    self_size: get_node_property(node_start, 3, &snapshot),
                    edge_count: get_node_property(node_start, 4, &snapshot),
                    trace_node_id: get_node_property(node_start, 5, &snapshot),
                    edges: vec![],
                    retained_size: None,
                    parent_node: vec![],
                    weak_parent_node: vec![],
                }));
                node_map.insert(usize::from(&node.borrow_mut().id), Rc::clone(&node));
                Rc::clone(&node)
            })
            .collect();
        let mut edge_index = 0; // 代表当前是第几个 edge
        node_struct_arr.iter().for_each(|node| {
            let mut node = node.borrow_mut();
            let node_id = usize::from(&node.id);
            let edge_count = usize::from(&node.edge_count);
            let edges = (0..edge_count)
                .map(|_| {
                    let edge_start = edge_index * EdgeFields.len();
                    let edge = Edge {
                        edge_type: get_edgs_property(edge_start, 0, &snapshot),
                        name_or_index: get_edgs_property(edge_start, 1, &snapshot),
                        to_node: get_edgs_property(edge_start, 2, &snapshot),
                        is_strong_retainer: true,
                    };

                    let to_node_id = usize::from(&edge.to_node);
                    let to_node = node_map.get(&to_node_id);

                    if to_node_id != node_id {
                        if to_node.is_some() {
                            let mut to_node = to_node.unwrap().borrow_mut();
                            to_node.parent_node.push(node_id);
                        }
                    }
                    edge_index += 1;
                    edge
                })
                .collect();
            node.edges = edges;
        });
        let mut has_marked_map: HashMap<usize, bool> = HashMap::new();
        traverse(4443, &node_map, &mut HashMap::new());
        get_child(3, &node_map, &mut has_marked_map); // 将一个节点的子节点插入到 has_marked_map 中，初始值为 false 代表还没到达
        mark_sweep(3, 22779, &node_map, &mut has_marked_map); // 把当前节点设置为不可到达后，标记从 gc roots 能到达的节点
        let mut retained_size = 0;
        for (node_id, val) in has_marked_map {
            if val == false {
                let node = node_map.get(&node_id).unwrap().borrow();
                println!("freeId: {:?} size: {:?}", node_id, &node.self_size);
                retained_size += usize::from(&node.self_size);
            }
        }
        println!("{:?}", retained_size);
        node_struct_arr
    }

    fn traverse(
        root_id: usize,
        node_map: &HashMap<usize, RcNode>,
        has_marked_map: &mut HashMap<usize, bool>,
    ) {
        if has_marked_map.get(&root_id).is_some() {
            return;
        }
        let mut root = node_map.get(&root_id).unwrap().borrow_mut();
        let root_id = usize::from(&root.id);
        has_marked_map.insert(root_id, false);
        root.edges.iter_mut().for_each(|edge| {
            if String::from(&edge.edge_type) == String::from("weak")
            // || (String::from(&edge.edge_type) == String::from("shortcut"))
            // || (String::from(&edge.edge_type) == String::from("hidden"))
            // || (String::from(&edge.edge_type) == String::from("invisible"))
            // || (String::from(&edge.edge_type) == String::from("internal"))
            {
                edge.is_strong_retainer = false
            }

            let to_node_id = usize::from(&edge.to_node);
            traverse(to_node_id, node_map, has_marked_map);
        });
    }
    fn get_child(
        root_id: usize,
        node_map: &HashMap<usize, RcNode>,
        has_marked_map: &mut HashMap<usize, bool>,
    ) {
        let root = node_map.get(&root_id).unwrap().borrow();
        let root_id = usize::from(&root.id);
        if has_marked_map.get(&root_id).is_some() {
            return;
        }
        has_marked_map.insert(root_id, false);
        root.edges.iter().for_each(|edge| {
            if edge.is_strong_retainer {
                let to_node_id = usize::from(&edge.to_node);
                get_child(to_node_id, node_map, has_marked_map);
            }
        });
    }

    fn mark_sweep(
        root_id: usize,
        free_node_id: usize,
        node_map: &HashMap<usize, RcNode>,
        has_marked_map: &mut HashMap<usize, bool>,
    ) {
        if root_id == free_node_id {
            // 当前节点被释放了,则不可访问
            return;
        }
        if has_marked_map.get(&root_id).unwrap() == &true {
            // 当前节点已经被访问过了
            return;
        }
        let root = node_map.get(&root_id).unwrap().borrow();

        has_marked_map.insert(root_id, true); // 代表该节点可以被访问

        root.edges.iter().for_each(|edge| {
            if edge.is_strong_retainer {
                let to_node_id = usize::from(&edge.to_node);
                mark_sweep(to_node_id, free_node_id, node_map, has_marked_map);
            }
        });
    }

    fn read_to_snapshot(path: &str) -> Heapsnapshot {
        let snapshot_string = read_to_string(path).expect("file not found");
        serde_json::from_str::<Heapsnapshot>(&snapshot_string).expect("type format error")
    }
    fn get_edgs_property(edge_start: usize, col: usize, snapshot: &Heapsnapshot) -> JsValueType {
        // edge_start 代表当前 edge 的起始索引, col 代表属性的偏移量
        let offset = edge_start + col;
        let edge_val = snapshot.edges[offset];
        let edge_property_type: EdgePropertyType = if col == 0 {
            EdgePropertyType::Arr(EdgeTypesProperty)
        } else {
            EdgePropertyType::Str(EdgeOthersProperty[col - 1].clone())
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
            NodePropertyType::Arr(NodeTypesProperty)
        } else {
            NodePropertyType::Str(NodeOthersProperty[col - 1].clone())
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
