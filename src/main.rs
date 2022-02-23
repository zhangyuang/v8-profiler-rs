use serde::{Deserialize, Serialize};
use std::fs::read_to_string;

enum NodeFields {
    Type,
    Name,
    Id,
    SelfSize,
    EdgeCount,
    TraceNodeId,
}
#[derive(Serialize, Deserialize)]
struct Meta<'a> {
    #[serde(borrow)]
    node_fields: [&'a str; 6],
    edge_fields: [&'a str; 3],
    trace_function_info_fields: [&'a str; 6],
    trace_node_fields: [&'a str; 5],
    sample_fields: [&'a str; 2],
    location_fields: [&'a str; 4],
}
#[derive(Serialize, Deserialize)]
struct SnapShot<'a> {
    #[serde(borrow)]
    meta: Meta<'a>,
    node_count: usize,
    edge_count: usize,
    trace_function_count: usize,
}
#[derive(Serialize, Deserialize)]
struct Heapsnapshot<'a> {
    #[serde(borrow)]
    snapshot: SnapShot<'a>,
    nodes: Vec<usize>,
    edges: Vec<usize>,
    locations: Vec<usize>,
    strings: Vec<String>,
    trace_function_infos: Vec<usize>,
    trace_tree: Vec<usize>,
    samples: Vec<usize>,
}

struct Node {
    node_type: String,
    name: String,
    id: usize,
    self_size: usize,
    edge_count: usize,
    trace_node_id: usize,
}

static node_types_0: [&str; 14] = [
    "hidden",
    "array",
    "string",
    "object",
    "code",
    "closure",
    "regexp",
    "number",
    "native",
    "synthetic",
    "concatenated string",
    "sliced string",
    "symbol",
    "bigint",
];
static node_types_1: [&str; 6] = ["string", "number", "number", "number", "number", "number"];
static node_fields: [&str; 6] = [
    "type",
    "name",
    "id",
    "self_size",
    "edge_count",
    "trace_node_id",
];

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
        row_val.iter().enumerate().for_each(|(col, col_val)| {
            get_node(row, col, **col_val, &snapshot)
        });
    })
}

fn get_node(row: usize, col: usize, val: usize, snapshot: &Heapsnapshot) {
    
    let offset = index * node_fields.len() + val;
    let node_type = if col == 0 {
        node_types_0
    } else {
        node_types_1
    };
    let Type = node_type[]
    let val = if node_type == "string" {
        &snapshot.strings[offset]
    } else if node_type == "number" {
        node_type
    } else {
        node_type
    };
    print!("{:?}", val);
}
