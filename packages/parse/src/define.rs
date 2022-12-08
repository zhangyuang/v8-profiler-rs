pub mod define {
    use serde::{Deserialize, Serialize};
    use std::cell::RefCell;
    use std::cmp::Ordering;
    use std::collections::HashMap;
    use std::rc::Rc;
    use std::sync::{Arc, Mutex};
    pub const NODE_TYPES_PROPERTY: [&str; 14] = [
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
    pub const NODE_OTHERS_PROPERTY: [&str; 6] =
        ["string", "number", "number", "number", "number", "number"];

    pub const NODE_FIELDS: [&str; 6] = [
        "type",
        "name",
        "id",
        "self_size",
        "edge_count",
        "trace_node_id",
    ];
    pub const NODE_FIELDS_NODE16: [&str; 7] = [
        "type",
        "name",
        "id",
        "self_size",
        "edge_count",
        "trace_node_id",
        "detachedness"
    ];
    pub const EDGE_FIELDS: [&str; 3] = ["type", "name_or_index", "to_node"];
    pub const EDGE_TYPES_PROPERTY: [&str; 7] = [
        "context", "element", "property", "internal", "hidden", "shortcut", "weak",
    ];
    pub const EDGE_OTHERS_PROPERTY: [&str; 2] = ["string_or_number", "node"];
    pub const FORBIDDEN_EDGE_TYPE: [&str; 4] = ["weak", "internal", "invisible", "hidden"];
    pub type ID_ORDINAL = Arc<Mutex<HashMap<usize, usize>>>;
    #[derive(Serialize, Deserialize, Debug)]
    pub struct Meta {
      pub node_fields: Vec<String>,
      pub edge_fields: [String; 3],
      pub trace_function_info_fields: [String; 6],
      pub trace_node_fields: [String; 5],
      pub sample_fields: [String; 2],
      pub location_fields: [String; 4],
    }
    #[derive(Serialize, Deserialize, Debug)]
    pub struct SnapShot {
        pub meta: Meta,
        pub node_count: usize,
        pub edge_count: usize,
        pub trace_function_count: usize,
    }
    #[derive(Serialize, Deserialize, Debug)]
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
        pub nt: JsValueType, // node_type
        pub name: JsValueType, // name
        pub id: JsValueType, // id
        pub size: JsValueType, // self_size
        pub ec: JsValueType, // edge_count
        // pub trace_node_id: JsValueType,
        pub rs: usize, // retained_size
        pub edges: Vec<Edge>,
        pub parents: Vec<usize>,
    }
    pub type RcNode = Rc<RefCell<Node>>;
    pub type ArcNode = Arc<Mutex<Node>>;

    impl PartialOrd for Node {
        fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
            if self.size > other.size {
                Some(Ordering::Greater)
            } else if self.size == other.size {
                Some(Ordering::Equal)
            } else {
                Some(Ordering::Less)
            }
        }
    }

    impl PartialEq for Node {
        fn eq(&self, other: &Self) -> bool {
            self.size == other.size
        }
    }

    #[derive(Debug, Serialize, Deserialize, Clone)]
    pub struct Edge {
        pub et: JsValueType, // edge_type
        pub tn: JsValueType, // to_node
        pub ni: JsValueType, // name_or_index
        pub isw: usize, // is_weak_retainer 0 false 1 true
        pub isr: usize, // is_retainer 0 false 1 true
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
