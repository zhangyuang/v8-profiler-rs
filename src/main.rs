mod variable;
use std::fs::{read_to_string, write};
use variable::variable::{
    Heapsnapshot, JsValueType, Node, NodeFields, NodePropertyType, NodeTypesBasic, NodeTypesRefer,
};
fn main() {
    let snapshot_string = read_to_string("test.json").expect("file not found");
    let snapshot: Heapsnapshot = serde_json::from_str(&snapshot_string).expect("type format error");
    let nodes = &snapshot.nodes;
    let node_struct_arr: Vec<Node> = nodes
        .iter()
        .enumerate()
        .map(|(index, _)| {
            let row = index % 6;
            Node {
                node_type: get_node_property(row, 0, &snapshot),
                name: get_node_property(row, 1, &snapshot),
                id: get_node_property(row, 2, &snapshot),
                self_size: get_node_property(row, 3, &snapshot),
                edge_count: get_node_property(row, 4, &snapshot),
                trace_node_id: get_node_property(row, 5, &snapshot),
            }
        })
        .collect();
    let foo = serde_json::to_string(&node_struct_arr).unwrap();
    write("bar.json", foo).unwrap();
}

fn get_node_property(row: usize, col: usize, snapshot: &Heapsnapshot) -> JsValueType {
    let offset = row * NodeFields.len() + col; // 当前 property 的 index
    let node_property_type: NodePropertyType = if col == 0 {
        NodePropertyType::Arr(NodeTypesRefer)
    } else {
        NodePropertyType::Str(NodeTypesBasic[col].clone())
    };
    let node_property_val: JsValueType = match node_property_type {
        NodePropertyType::Str(val) => {
            let nodes_val = snapshot.nodes[offset];
            if val == "string" {
                JsValueType::String(snapshot.strings[nodes_val].clone())
            } else {
                JsValueType::Number(nodes_val)
            }
        }
        NodePropertyType::Arr(val) => JsValueType::String(val[col].to_string()),
    };
    node_property_val
}
