
use std::fs::write;
use rs_parse_snapshot::snapshot_parallel::snapshot::parse_snapshot;
// use rs_parse_snapshot::snapshot::snapshot::parse_snapshot;

fn main() {
    let node_struct_arr = parse_snapshot("big.heapsnapshot");
    let str = serde_json::to_string(&node_struct_arr).unwrap();
    write("snapshot.json", str).unwrap();
}
