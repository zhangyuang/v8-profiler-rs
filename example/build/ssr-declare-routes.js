
      // The file is provisional which will be overwritten when restart
      export const FeRoutes = [{"path":"/index/node/:node","component": function dynamicComponent () {
          return import(/* webpackChunkName: "index-node-node" */ '@/pages/index/node/render$node.vue')
        }
        ,"webpackChunkName":"index-node-node","name":"index-node-node"},{"path":"/","component": function dynamicComponent () {
          return import(/* webpackChunkName: "index" */ '@/pages/index/render.vue')
        }
        ,"webpackChunkName":"index","name":"index"}] 
      export { default as Layout } from "@/components/layout/index"
      export { default as App } from "@/components/layout/App"
      
      export * as store from "@/store/index"
      
      