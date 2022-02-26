// #![deny(clippy::all)]

// /// import the preludes
// use napi_derive::napi;
// // use v8::*;

// #[cfg(all(
//     any(windows, unix),
//     target_arch = "x86_64",
//     not(target_env = "musl"),
//     not(debug_assertions)
// ))]
// #[global_allocator]
// static ALLOC: mimalloc::MiMalloc = mimalloc::MiMalloc;
// use std::fs::File;
// use std::io::prelude::*;

// #[napi]
// pub fn initial() {
//     let platform = v8::new_default_platform(0, false).make_shared();
//     v8::V8::initialize_platform(platform);
//     v8::V8::initialize();
// }
// #[napi]
// pub fn takeHeapSnapShot(path: String) {
//     let isolate = unsafe { &mut v8::Isolate::get_current() };

//     let mut s = v8::HeapStatistics::default();
//     isolate.get_heap_statistics(&mut s);
//     // println!("{:?}", s);
//     #[derive(Debug)]
//     struct MemoryUsage {
//         rss: usize,
//         heap_total: usize,
//         heap_used: usize,
//         external: usize,
//     };
//     let foo = MemoryUsage {
//         rss: s.total_physical_size(),
//         heap_total: s.total_heap_size(),
//         heap_used: s.used_heap_size(),
//         external: s.external_memory(),
//     };

//     println!("{:?}", foo);
//     //   fn get_memory_usage(isolate: &mut v8::Isolate) -> MemoryUsage {
//     //     let mut s = v8::HeapStatistics::default();
//     //     isolate.get_heap_statistics(&mut s);

//     //     MemoryUsage {
//     //       rss: s.total_physical_size(),
//     //       heap_total: s.total_heap_size(),
//     //       heap_used: s.used_heap_size(),
//     //       external: s.external_memory(),
//     //     }
//     // {
//     //     let mut f = File::create(&path).unwrap();
//     //     let mut vec = Vec::<u8>::new();
//     //     isolate.take_heap_snapshot(|chunk| {
//     //         if chunk.len() != 0 {
//     //             vec.extend_from_slice(chunk);
//     //             true
//     //         } else {
//     //             false
//     //         }
//     //     });
//     //     f.write(&vec[..]).unwrap();
//     // }
// }
