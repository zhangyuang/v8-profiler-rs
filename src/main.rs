mod define;
mod snapshot;
use snapshot::snapshot::parse_snapshot;
use std::fs::write;
fn main() {
    let str = parse_snapshot("heapdump.heapsnapshot");
    write("bar.json", str).unwrap();
}
