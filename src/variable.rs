pub mod Variable {
    use serde::{Deserialize, Serialize};
    pub const node_types_refer: Vec<String> = vec![
        "hidden".to_string(),
        "array".to_string(),
        "string".to_string(),
        "object".to_string(),
        "code".to_string(),
        "closure".to_string(),
        "regexp".to_string(),
        "number".to_string(),
        "native".to_string(),
        "synthetic".to_string(),
        "concatenated string".to_string(),
        "sliced string".to_string(),
        "symbol".to_string(),
        "bigint".to_string(),
    ];
    pub const node_types_basic: Vec<String> = vec![
        "string".to_string(),
        "number".to_string(),
        "number".to_string(),
        "number".to_string(),
        "number".to_string(),
        "number".to_string(),
    ];
    pub const node_fields: Vec<String> = vec![
        "type".to_string(),
        "name".to_string(),
        "id".to_string(),
        "self_size".to_string(),
        "edge_count".to_string(),
        "trace_node_id".to_string(),
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
        Arr(Vec<String>),
        String(String),
    }
    pub enum NodeValue {
        String(String),
        Number(usize),
    }
}
