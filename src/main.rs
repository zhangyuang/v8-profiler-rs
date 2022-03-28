mod define;
mod snapshot;
use snapshot::snapshot::parse_snapshot;
use std::fs::write;
fn main() {
    let node_struct_arr = parse_snapshot("v8.heapsnapshot");
    // let str = serde_json::to_string(&node_struct_arr).unwrap();
    // write("snapshot.json", str).unwrap();
}
