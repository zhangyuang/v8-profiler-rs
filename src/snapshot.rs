pub mod snapshot {

    use crate::define::define::{
        Edge, EdgeFields, EdgeOthersProperty, EdgePropertyType, EdgeTypesProperty, Heapsnapshot,
        JsValueType, Node, NodeFields, NodeOthersProperty, NodePropertyType, NodeTypesProperty,
    };
    use std::cell::RefCell;
    use std::collections::HashMap;
    use std::fs::read_to_string;
    use std::rc::Rc;

    pub fn parse_snapshot(path: &str) -> Vec<Rc<RefCell<Node>>> {
        let mut map = HashMap::new();
        let snapshot = read_to_snapshot(path);
        let nodes = snapshot.snapshot.node_count;
        let node_struct_arr: Vec<Rc<RefCell<Node>>> = (0..nodes)
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
                    edges: None,
                    retained_size: None,
                }));
                map.insert(usize::from(&node.borrow_mut().id), Rc::clone(&node));
                Rc::clone(&node)
            })
            .collect();
        let mut edge_index = 0; // 代表当前是第几个 edge
        node_struct_arr.iter().for_each(|node| {
            let mut node_borrow_mut = node.borrow_mut();
            let edge_count = usize::from(&node_borrow_mut.edge_count);
            let mut retained_size = usize::from(&node_borrow_mut.self_size);
            let edges = (0..edge_count)
                .map(|_| {
                    let edge_start = edge_index * EdgeFields.len();
                    let edge = Edge {
                        edge_type: get_edgs_property(edge_start, 0, &snapshot),
                        name_or_index: get_edgs_property(edge_start, 1, &snapshot),
                        to_node: get_edgs_property(edge_start, 2, &snapshot),
                    };
                    let to_node = map.get(&usize::from(&edge.to_node)).unwrap();
                    if to_node.as_ptr() != node.as_ptr() {
                        if to_node.borrow().retained_size.is_some() {
                            retained_size += *&to_node.borrow().retained_size.unwrap();
                        }
                    };
                    edge_index += 1;
                    edge
                })
                .collect();
            node_borrow_mut.edges = Some(edges);
            node_borrow_mut.retained_size = Some(retained_size)
        });
        // node_struct_arr.iter().for_each(|node| {});
        // let mut retained_size = usize::from(&node_borrow_mut.self_size);
        // let to_node = map.get(&usize::from(&edge.to_node)).unwrap();
        // if to_node.as_ptr() != node.as_ptr() {
        //     retained_size += usize::from(&to_node.borrow().self_size);
        // }
        node_struct_arr
    }
    // fn calculate_retained_size(
    //     node: &Rc<RefCell<Node>>,
    //     map: &HashMap<usize, Rc<RefCell<Node>>>,
    // ) -> usize {
    //     let node_borrow_mut = node.borrow_mut();
    //     let mut retained_size = usize::from(&node_borrow_mut.self_size);
    //     let edges = &node_borrow_mut.edges;
    //     if let Some(edges) = edges {
    //         edges.iter().for_each(|edge| {
    //             let to_node = map.get(&usize::from(&edge.to_node)).unwrap();
    //             if to_node.as_ptr() != node.as_ptr() {
    //                 retained_size += usize::from(&to_node.borrow().retained_size);
    //             }
    //         })
    //     };
    //     retained_size
    // }

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
                    if edge_val > snapshot.strings.len() {
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
                    JsValueType::JsString(snapshot.strings[node_val].to_string())
                } else if property_type == "number" {
                    JsValueType::JsNumber(node_val)
                } else {
                    panic!("unknkow property_type {} ", property_type)
                }
            }
            NodePropertyType::Arr(property_type_arr) => {
                JsValueType::JsString(property_type_arr[node_val].to_string())
            }
        };
        node_property_val
    }
}
