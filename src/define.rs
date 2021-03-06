pub mod define {
    use serde::{Deserialize, Serialize};
    use std::cell::RefCell;
    use std::cmp::Ordering;
    use std::rc::Rc;
    pub const NodeTypesProperty: [&str; 14] = [
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
    pub const NodeOthersProperty: [&str; 6] =
        ["string", "number", "number", "number", "number", "number"];

    pub const NodeFields: [&str; 6] = [
        "type",
        "name",
        "id",
        "self_size",
        "edge_count",
        "trace_node_id",
    ];
    pub const EdgeFields: [&str; 3] = ["type", "name_or_index", "to_node"];
    pub const EdgeTypesProperty: [&str; 7] = [
        "context", "element", "property", "internal", "hidden", "shortcut", "weak",
    ];
    pub const EdgeOthersProperty: [&str; 2] = ["string_or_number", "node"];
    pub const forbidden_edge_type: [&str; 4] = ["weak", "internal", "invisible", "hidden"];
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
        pub meta: Meta,
        pub node_count: usize,
        pub edge_count: usize,
        pub trace_function_count: usize,
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

    #[derive(Debug, Serialize, Deserialize, Clone)]
    pub struct Node {
        pub node_type: JsValueType,
        pub name: JsValueType,
        pub id: JsValueType,
        pub self_size: JsValueType,
        pub edge_count: JsValueType,
        pub trace_node_id: JsValueType,
        pub retained_size: Option<usize>,
        pub parent_node: Vec<usize>,
        pub weak_parent_node: Vec<usize>,
        pub edges: Vec<Edge>,
    }
    pub type RcNode = Rc<RefCell<Node>>;

    impl PartialOrd for Node {
        fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
            if self.self_size > other.self_size {
                Some(Ordering::Greater)
            } else if self.self_size == other.self_size {
                Some(Ordering::Equal)
            } else {
                Some(Ordering::Less)
            }
        }
    }

    impl PartialEq for Node {
        fn eq(&self, other: &Self) -> bool {
            self.self_size == other.self_size
        }
    }

    #[derive(Debug, Serialize, Deserialize, Clone)]
    pub struct Edge {
        pub edge_type: JsValueType,
        pub to_node: JsValueType,
        pub name_or_index: JsValueType,
        pub is_strong_retainer: bool,
    }
    pub enum NodePropertyType {
        Arr([&'static str; 14]),
        Str(&'static str),
    }
    pub enum EdgePropertyType {
        Arr([&'static str; 7]),
        Str(&'static str),
    }
    #[derive(Debug, Serialize, Deserialize, Clone)]
    #[serde(untagged)]
    pub enum JsValueType {
        JsString(String),
        JsNumber(usize),
    }
    impl PartialEq for JsValueType {
        fn eq(&self, other: &Self) -> bool {
            use JsValueType::*;
            match (self, other) {
                (&JsString(ref a), &JsString(ref b)) => a == b,
                (&JsNumber(ref a), &JsNumber(ref b)) => a == b,
                _ => false,
            }
        }
    }
    impl PartialOrd for JsValueType {
        fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
            use JsValueType::*;
            match (self, other) {
                (&JsNumber(ref a), &JsNumber(ref b)) => {
                    if a - b > 0 {
                        Some(Ordering::Greater)
                    } else if a == b {
                        Some(Ordering::Equal)
                    } else {
                        Some(Ordering::Less)
                    }
                }
                _ => None,
            }
        }
    }
    impl From<&JsValueType> for usize {
        fn from(s: &JsValueType) -> usize {
            use JsValueType::*;
            match s {
                JsNumber(val) => *val,
                JsString(val) => panic!("JsString {:?} cannot convert to usize", val),
            }
        }
    }
    impl From<&JsValueType> for String {
        fn from(s: &JsValueType) -> String {
            use JsValueType::*;
            match s {
                JsNumber(val) => panic!("JsNumber {:?} cannot convert to String", val),
                JsString(val) => val.clone(),
            }
        }
    }
}
