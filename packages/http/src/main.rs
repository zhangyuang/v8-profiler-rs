use rs_parse_snapshot::snapshot::snapshot::parse_snapshot;
use serde::{Deserialize, Serialize};
use warp::Filter;

#[derive(Deserialize, Serialize)]
struct Body {
    source: String,
}

#[tokio::main]
async fn main() {
    let promote = warp::post()
        .and(warp::path("parsev8"))
        .and(warp::body::json())
        .map(|body: Body| {
            let source = &body.source;
            let node_struct_arr = parse_snapshot(source, true);
            warp::reply::json(&node_struct_arr)
        })
        .with(warp::compression::gzip());
   
    let routes = warp::any().and(promote);
    warp::serve(routes).run(([0, 0, 0, 0], 9000)).await;
}
