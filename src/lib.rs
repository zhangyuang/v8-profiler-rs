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

#[napi]
pub fn parseSnapShot() -> String {
    let foo = parse_snapshot("heapdump.heapsnapshot");
    foo
}
