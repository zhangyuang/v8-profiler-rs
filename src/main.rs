mod define;
mod snapshot;
use snapshot::snapshot::parse_snapshot;
use std::fs::write;
fn main() {
    write("snapshot.json", parse_snapshot("v8.heapsnapshot")).unwrap();
}
