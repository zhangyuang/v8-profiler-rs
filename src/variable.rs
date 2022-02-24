pub mod Variable {
    use serde::{Deserialize, Serialize};

    pub const NodeTypesRefer: [&str; 14] = [
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
    pub const NodeTypesBasic: [&str; 6] =
        ["string", "number", "number", "number", "number", "number"];

    pub const NodeFields: [&str; 6] = [
        "type",
        "name",
        "id",
        "self_size",
        "edge_count",
        "trace_node_id",
    ];
    #[derive(Serialize, Deserialize)]
    pub struct Meta {
        node_fields: [String; 6],
        edge_fields: [String; 3],
        trace_function_info_fields: [String; 6],
        trace_node_fields: [String; 5],
        sample_fields: [String; 2],
        location_fields: [String; 4],
    }
    #[derive(Serialize, Deserialize)]
    pub struct SnapShot {
        meta: Meta,
        node_count: usize,
        edge_count: usize,
        trace_function_count: usize,
    }
    #[derive(Serialize, Deserialize)]
    pub struct Heapsnapshot {
        pub snapshot: SnapShot,
        pub nodes: Vec<usize>,
        pub edges: Vec<usize>,
        pub locations: Vec<usize>,
        pub strings: Vec<String>,
        pub trace_function_infos: Vec<usize>,
        pub trace_tree: Vec<usize>,
        pub samples: Vec<usize>,
    }

    pub struct Node {
        node_type: String,
        name: String,
        id: usize,
        self_size: usize,
        edge_count: usize,
        trace_node_id: usize,
    }
    pub enum NodePropertyType {
        Arr([&'static str; 14]),
        Str(&'static str),
    }
    pub enum JsValueType {
        String(String),
        Number(usize),
    }
}
