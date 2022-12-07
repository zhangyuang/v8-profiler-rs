use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
use js_sys;

use rs_parse_snapshot::snapshot::snapshot::parse_snapshot;

#[wasm_bindgen]
pub fn parse_v8_snapshot(path: &str) -> js_sys::JsString {
    let node_struct_arr = parse_snapshot(path);
    let str = serde_json::to_string(&node_struct_arr).unwrap();
    return str.into();
}
