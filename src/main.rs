mod variable;
use std::fs::read_to_string;
use variable::Variable::{
    node_fields, node_types_basic, node_types_refer, Heapsnapshot, NodePropertyType, NodeValue,
};

fn main() {
    let f = read_to_string("test.json").expect("file not found");
    let snapshot = serde_json::from_str::<Heapsnapshot>(&f).expect("type format error");
    let nodes = &snapshot.nodes;
    let mut nodes_arr = vec![];
    let mut node_item = vec![];
    nodes.iter().enumerate().for_each(|(index, val)| {
        // 每一行六个属性作为一个节点
        node_item.push(val);
        if (index + 1) % node_fields.len() == 0 {
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

// val 代表当前 node property 的 value
fn get_node_property(row: usize, col: usize, val: usize, snapshot: &Heapsnapshot) {
    let node_start = row * node_fields.len();
    let offset = node_start + val; // 当前 property 的 index
    let node_property_type: NodePropertyType = if col == 0 {
        NodePropertyType::Arr(node_types_refer)
    } else {
        NodePropertyType::String(node_types_basic[col].clone())
    };
    let node_property_val: NodeValue = match node_property_type {
        NodePropertyType::String(val) => {
            if val == "string".to_string() {
                NodeValue::String(snapshot.strings[offset].clone())
            } else {
                NodeValue::Number(val)
            }
        }
        NodePropertyType::Arr(val) => val[col],
    };
    // let node_property_val = if node_property_type == NodePropertyType::String {
    //     snapshot.strings[offset]
    // } else if node_property_type == "number" {
    //     String(val)
    // } else {
    //     node_property_type[col]
    // };
    // print!("{:?}", node_property_val);
}
