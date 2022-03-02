mod define;
mod snapshot;
use define::define::JsValueType;
use snapshot::snapshot::parse_snapshot;
use std::collections::HashMap;
use std::fs::write;

fn main() {
    let node_struct_arr = parse_snapshot("v8.heapsnapshot");
    let mut hash_map = HashMap::new();
    node_struct_arr.iter().for_each(|node| {
        if let JsValueType::JsString(node_type) = &node.node_type {
            if hash_map.get(node_type).is_none() {
                hash_map.insert(node_type, vec![]);
            } else {
                hash_map.get_mut(node_type).unwrap().push(node);
            }
        }
    });
    let str = serde_json::to_string(&hash_map).unwrap();

    write("snapshot.json", str).unwrap();
}
