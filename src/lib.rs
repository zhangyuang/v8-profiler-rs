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
use snapshot::snapshot::parse_snapshot;
use std::collections::HashMap;

#[napi]
pub fn parseSnapShot(path: String) -> String {
    let node_struct_arr = parse_snapshot(&path);
    let mut hash_map = HashMap::new();
    node_struct_arr.iter().for_each(|node| {
        let node_type = String::from(&node.borrow().node_type);
        hash_map
            .entry(String::from(node_type))
            .or_insert(vec![])
            .push(node);
    });
    serde_json::to_string(&hash_map).unwrap()
}
