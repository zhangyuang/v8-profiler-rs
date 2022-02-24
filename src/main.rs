mod variable;
use std::fs::read_to_string;
use variable::Variable::{
    Heapsnapshot, JsValueType, NodeFields, NodePropertyType, NodeTypesBasic, NodeTypesRefer,
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
    nodes_arr.iter().enumerate().for_each(|(row, row_val)| {
        // 遍历每一个节点的每一个属性
        row_val
            .iter()
            .enumerate()
            .for_each(|(col, col_val)| get_node_property(row, col, **col_val, &snapshot));
    })
}

// // val 代表当前 node property 的 value
fn get_node_property(row: usize, col: usize, val: usize, snapshot: &Heapsnapshot) {
    let offset = row * NodeFields.len() + val; // 当前 property 的 index
    let node_property_type: NodePropertyType = if col == 0 {
        NodePropertyType::Arr(NodeTypesRefer)
    } else {
        NodePropertyType::Str(NodeTypesBasic[col].clone())
    };
    let node_property_val: JsValueType = match node_property_type {
        NodePropertyType::Str(val) => {
            if val == "string".to_string() {
                JsValueType::String(snapshot.strings[offset].clone())
            } else {
                JsValueType::Number(*&snapshot.nodes[offset])
            }
        }
        NodePropertyType::Arr(val) => JsValueType::String(val[col].to_string()),
    };
}
