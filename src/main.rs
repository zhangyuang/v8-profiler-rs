mod define;
mod snapshot;
use snapshot::snapshot::parse_snapshot;
use std::time::{SystemTime, UNIX_EPOCH};
fn main() {
    let now = SystemTime::now();
    parse_snapshot("v8.heapsnapshot");
    println!(
        "{:?}",
        SystemTime::now().duration_since(UNIX_EPOCH).unwrap()
            - now.duration_since(UNIX_EPOCH).unwrap()
    );
}
