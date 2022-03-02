#![deny(clippy::all)]

/// import the preludes
use napi_derive::napi;

#[cfg(all(
    any(windows, unix),
    target_arch = "x86_64",
    not(target_env = "musl"),
    not(debug_assertions)
))]
#[global_allocator]
static ALLOC: mimalloc::MiMalloc = mimalloc::MiMalloc;
mod define;
mod snapshot;
use define::define::JsValueType;
use snapshot::snapshot::parse_snapshot;
use std::collections::HashMap;
#[napi]
pub fn parseSnapShot(path: String) -> String {
    serde_json::to_string(&parse_snapshot(&path)).unwrap()
}
#[napi]
pub fn parseSnapShotWithMap(path: String) -> String {
    let node_struct_arr = parse_snapshot(&path);
    let mut hash_map = HashMap::new();
    node_struct_arr.iter().for_each(|node| {
        if let JsValueType::JsString(name) = &node.name {
            if hash_map.get(name).is_none() {
                hash_map.insert(name, vec![]);
            } else {
                hash_map.get_mut(name).unwrap().push(node);
            }
        }
    });
    serde_json::to_string(&hash_map).unwrap()
}
