mod variable;
use std::fs::read_to_string;
use variable::Variable::{
    Heapsnapshot, JsValueType, Node, NodeFields, NodePropertyType, NodeTypesBasic, NodeTypesRefer,
};
fn main() {
    let snapshot_string = read_to_string("test.json").expect("file not found");
    let snapshot: Heapsnapshot = serde_json::from_str(&snapshot_string).expect("type format error");
    let nodes = &snapshot.nodes;
    let mut nodes_arr = vec![];
    let mut node_item = vec![];
    nodes.iter().enumerate().for_each(|(index, val)| {
        // 每一行六个属性作为一个节点
        node_item.push(val);
        if (index + 1) % NodeFields.len() == 0 {
            nodes_arr.push(node_item.clone());
            node_item = vec![]
        }
    });
    let node_struct_arr: Vec<Node> = nodes_arr
        .iter()
        .enumerate()
        .map(|(row, _)| Node {
            node_type: get_node_property(row, 0, &snapshot),
            name: get_node_property(row, 1, &snapshot),
            id: get_node_property(row, 2, &snapshot),
            self_size: get_node_property(row, 3, &snapshot),
            edge_count: get_node_property(row, 4, &snapshot),
            trace_node_id: get_node_property(row, 5, &snapshot),
        })
        .collect();
}

// // val 代表当前 node property 的 value
fn get_node_property(row: usize, col: usize, snapshot: &Heapsnapshot) -> JsValueType {
    let offset = row * NodeFields.len() + col; // 当前 property 的 index
    let node_property_type: NodePropertyType = if col == 0 {
        NodePropertyType::Arr(NodeTypesRefer)
    } else {
        NodePropertyType::Str(NodeTypesBasic[col].clone())
    };
    let node_property_val: JsValueType = match node_property_type {
        NodePropertyType::Str(val) => {
            if val == "string" {
                JsValueType::String(snapshot.strings[offset].clone())
            } else {
                JsValueType::Number(*&snapshot.nodes[offset])
            }
        }
        NodePropertyType::Arr(val) => JsValueType::String(val[col].to_string()),
    };
    node_property_val
}
