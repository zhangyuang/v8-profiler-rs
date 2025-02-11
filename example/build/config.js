var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var config_exports = {};
__export(config_exports, {
  userConfig: () => userConfig
});
module.exports = __toCommonJS(config_exports);
const userConfig = {
  mode: "csr",
  css: () => {
    const tailwindcss = require("tailwindcss");
    const autoprefixer = require("autoprefixer");
    return {
      loaderOptions: {
        postcss: {
          plugins: [
            tailwindcss,
            autoprefixer
          ]
        }
      }
    };
  },
  webpackDevServerConfig: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin"
    }
  },
  customeFooterScript: [
    {
      tagName: "script",
      describe: {
        type: "module"
      },
      content: `
        import * as v8_profiler_rs  from '/v8_profiler_rs.js'
        window.v8_profiler_rs = v8_profiler_rs
        window.v8_profiler_rs.default()
      `
    }
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userConfig
});
