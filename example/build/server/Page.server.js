(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		"Page": 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// The chunk loading function for additional chunks
/******/ 	// Since all referenced chunks are already included
/******/ 	// in this file, this function is empty here.
/******/ 	__webpack_require__.e = function requireEnsure() {
/******/ 		return Promise.resolve();
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/ssr-declare-routes.js":
/*!*************************************!*\
  !*** ./build/ssr-declare-routes.js ***!
  \*************************************/
/*! exports provided: FeRoutes, Layout, App, store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeRoutes", function() { return FeRoutes; });
/* harmony import */ var _components_layout_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/layout/index */ "./web/components/layout/index.vue");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return _components_layout_index__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _components_layout_App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/layout/App */ "./web/components/layout/App.vue");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "App", function() { return _components_layout_App__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _store_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/store/index */ "./web/store/index.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "store", function() { return _store_index__WEBPACK_IMPORTED_MODULE_2__; });
// The file is provisional which will be overwritten when restart
var FeRoutes = [{
  "path": "/index/node/:node",
  "component": function dynamicComponent() {
    return Promise.resolve(/*! import() | index-node-node */).then(__webpack_require__.bind(null, /*! @/pages/index/node/render$node.vue */ "./web/pages/index/node/render$node.vue"));
  },
  "webpackChunkName": "index-node-node",
  "name": "index-node-node"
}, {
  "path": "/",
  "component": function dynamicComponent() {
    return Promise.resolve(/*! import() | index */).then(__webpack_require__.bind(null, /*! @/pages/index/render.vue */ "./web/pages/index/render.vue"));
  },
  "webpackChunkName": "index",
  "name": "index"
}];





/***/ }),

/***/ "./build/ssr-manual-routes.js":
/*!************************************!*\
  !*** ./build/ssr-manual-routes.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/dist/index.js?!./web/components/layout/App.vue?vue&type=script&lang=ts&setup=true":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/dist??ref--5-0!./web/components/layout/App.vue?vue&type=script&lang=ts&setup=true ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vant_lib_popover_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vant/lib/popover/style */ "./node_modules/vant/lib/popover/style/index.js");
/* harmony import */ var vant_lib_popover_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vant_lib_popover_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vant_lib_popover__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vant/lib/popover */ "vant/lib/popover");
/* harmony import */ var vant_lib_popover__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vant_lib_popover__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vant_lib_dropdown_item_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vant/lib/dropdown-item/style */ "./node_modules/vant/lib/dropdown-item/style/index.js");
/* harmony import */ var vant_lib_dropdown_item_style__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vant_lib_dropdown_item_style__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vant_lib_dropdown_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vant/lib/dropdown-item */ "vant/lib/dropdown-item");
/* harmony import */ var vant_lib_dropdown_item__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vant_lib_dropdown_item__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vant_lib_dropdown_menu_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vant/lib/dropdown-menu/style */ "./node_modules/vant/lib/dropdown-menu/style/index.js");
/* harmony import */ var vant_lib_dropdown_menu_style__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vant_lib_dropdown_menu_style__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vant_lib_dropdown_menu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vant/lib/dropdown-menu */ "vant/lib/dropdown-menu");
/* harmony import */ var vant_lib_dropdown_menu__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(vant_lib_dropdown_menu__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var vant_lib_loading_style__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vant/lib/loading/style */ "./node_modules/vant/lib/loading/style/index.js");
/* harmony import */ var vant_lib_loading_style__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(vant_lib_loading_style__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var vant_lib_loading__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vant/lib/loading */ "vant/lib/loading");
/* harmony import */ var vant_lib_loading__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(vant_lib_loading__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var vant_lib_field_style__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vant/lib/field/style */ "./node_modules/vant/lib/field/style/index.js");
/* harmony import */ var vant_lib_field_style__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(vant_lib_field_style__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var vant_lib_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vant/lib/field */ "vant/lib/field");
/* harmony import */ var vant_lib_field__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(vant_lib_field__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var vant_lib_button_style__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vant/lib/button/style */ "./node_modules/vant/lib/button/style/index.js");
/* harmony import */ var vant_lib_button_style__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(vant_lib_button_style__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var vant_lib_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vant/lib/button */ "vant/lib/button");
/* harmony import */ var vant_lib_button__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(vant_lib_button__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! vue-router */ "vue-router");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(vue_router__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @/store */ "./web/store/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @/utils */ "./web/utils.ts");
/* harmony import */ var _analyze__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @/analyze */ "./web/analyze.ts");






















/* harmony default export */ __webpack_exports__["default"] = (/*@__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_15__["defineComponent"])({
  __name: 'App',
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    __expose();
    var store = Object(_store__WEBPACK_IMPORTED_MODULE_18__["useSnapShotStore"])();
    var router = Object(vue_router__WEBPACK_IMPORTED_MODULE_16__["useRouter"])();
    var route = Object(vue_router__WEBPACK_IMPORTED_MODULE_16__["useRoute"])();
    var path = route.path;
    var query = route.query;
    var fileRef = Object(vue__WEBPACK_IMPORTED_MODULE_15__["ref"])();
    var children = Object(vue__WEBPACK_IMPORTED_MODULE_15__["ref"])();
    var pop = Object(vue__WEBPACK_IMPORTED_MODULE_15__["reactive"])({
      name: false,
      source: false,
      snapshot: false
    });
    var worker = null;
    Object(vue__WEBPACK_IMPORTED_MODULE_15__["onMounted"])(/*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_13___default()(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_14___default.a.mark(function _callee() {
      var heapsnapshot, res, uint8Array, parseResult;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_14___default.a.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            worker = new Worker('worker.js', {
              type: "module"
            });
            if (!query.heapsnapshot) {
              _context.next = 14;
              break;
            }
            heapsnapshot = query.heapsnapshot;
            store.setLoading('loading');
            _context.next = 6;
            return axios__WEBPACK_IMPORTED_MODULE_17___default.a.get(heapsnapshot, {
              responseType: 'arraybuffer'
            });
          case 6:
            res = _context.sent;
            uint8Array = new Uint8Array(res.data);
            _context.next = 10;
            return parse(uint8Array);
          case 10:
            parseResult = _context.sent;
            store.setData({
              data: parseResult
            });
            store.setLoading('finish');
            confirm();
          case 14:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));
    var renderOptions = Object(vue__WEBPACK_IMPORTED_MODULE_15__["reactive"])({
      isIndex: path === '/',
      maxNodes: 50,
      nodeSize: 10,
      edgeLength: 150,
      edgeCounts: 5,
      parentDepth: 2,
      childDepth: 2,
      weakOrStrong: '0',
      nodeName: '',
      nodeId: '',
      filterNative: 0,
      filterNode: 0,
      parseMethod: 'wasm',
      tooltip: {},
      force: {},
      label: {},
      compare: {
        is: false,
        mode: 'addtional',
        addtionalLen: -1
      },
      analyze: {
        show: false
      },
      nodeByConstructor: {},
      filterNodeByConstructor: 'all'
    });
    var _toRefs = Object(vue__WEBPACK_IMPORTED_MODULE_15__["toRefs"])(renderOptions),
      maxNodes = _toRefs.maxNodes,
      isIndex = _toRefs.isIndex,
      edgeCounts = _toRefs.edgeCounts,
      parentDepth = _toRefs.parentDepth,
      childDepth = _toRefs.childDepth,
      nodeName = _toRefs.nodeName,
      nodeId = _toRefs.nodeId,
      filterNative = _toRefs.filterNative,
      parseMethod = _toRefs.parseMethod,
      compare = _toRefs.compare,
      analyze = _toRefs.analyze,
      filterNode = _toRefs.filterNode;
    renderOptions.label = {
      show: true,
      position: 'right',
      formatter: function formatter(params) {
        var data = params.data;
        var id = data.id,
          name = data.name;
        return "".concat(name.length > 50 ? '' : name, "@").concat(id);
      }
    };
    var open = function open(url) {
      window.open(url);
    };
    Object(vue__WEBPACK_IMPORTED_MODULE_15__["watch"])(router.currentRoute, /*#__PURE__*/function () {
      var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_13___default()(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_14___default.a.mark(function _callee2(to) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_14___default.a.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              renderOptions.isIndex = to.path === '/';
              _context2.next = 3;
              return Object(vue__WEBPACK_IMPORTED_MODULE_15__["nextTick"])();
            case 3:
              _utils__WEBPACK_IMPORTED_MODULE_19__["renderNodeId"].value = to.params.node;
              children.value.render(store.data);
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());
    var defaultDemo = /*#__PURE__*/function () {
      var _ref4 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_13___default()(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_14___default.a.mark(function _callee3() {
        var res, uint8Array, parseResult;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_14___default.a.wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              store.setLoading('loading');
              _context3.next = 3;
              return axios__WEBPACK_IMPORTED_MODULE_17___default.a.get('https://res.wx.qq.com/shop/public/26d3bd44-ab36-4caf-8d87-6e97f489464c.heapsnapshot', {
                responseType: 'arraybuffer'
              });
            case 3:
              res = _context3.sent;
              uint8Array = new Uint8Array(res.data);
              _context3.next = 7;
              return parse(uint8Array);
            case 7:
              parseResult = _context3.sent;
              store.setData({
                data: parseResult
              });
              store.setLoading('finish');
              confirm();
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return function defaultDemo() {
        return _ref4.apply(this, arguments);
      };
    }();
    var analyzeFn = /*#__PURE__*/function () {
      var _ref5 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_13___default()(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_14___default.a.mark(function _callee4() {
        var data;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_14___default.a.wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              data = store.data;
              if (!compare.value.is) {
                _context4.next = 4;
                break;
              }
              _context4.next = 7;
              break;
            case 4:
              _context4.next = 6;
              return Object(_analyze__WEBPACK_IMPORTED_MODULE_20__["analyzeSingle"])({
                data: data,
                type: 'panel'
              });
            case 6:
              renderOptions.analyze = _context4.sent;
            case 7:
              renderOptions.analyze.show = true;
            case 8:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      return function analyzeFn() {
        return _ref5.apply(this, arguments);
      };
    }();
    var upload = /*#__PURE__*/function () {
      var _ref6 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_13___default()(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_14___default.a.mark(function _callee5(e) {
        var _e$target;
        var file, _yield$Promise$all, _yield$Promise$all2, small, big, smallRes, bigRes, _analyzeCompare, additionalStatistic, biggerStatistic, additionalNode, biggerNode, result, parseResult;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_14___default.a.wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              file = Array.from((_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.files);
              if (!(!file || file.length > 2)) {
                _context5.next = 4;
                break;
              }
              Object(_utils__WEBPACK_IMPORTED_MODULE_19__["tips"])('当前最大只支持选择两个文件', 'danger');
              return _context5.abrupt("return");
            case 4:
              if (!(file.length == 2)) {
                _context5.next = 27;
                break;
              }
              file.sort(function (a, b) {
                return a.size - b.size;
              });
              _context5.next = 8;
              return Promise.all([Object(_utils__WEBPACK_IMPORTED_MODULE_19__["read"])(file[0]), Object(_utils__WEBPACK_IMPORTED_MODULE_19__["read"])(file[1])]);
            case 8:
              _yield$Promise$all = _context5.sent;
              _yield$Promise$all2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_12___default()(_yield$Promise$all, 2);
              small = _yield$Promise$all2[0];
              big = _yield$Promise$all2[1];
              _context5.next = 14;
              return parse(small);
            case 14:
              smallRes = _context5.sent;
              _context5.next = 17;
              return parse(big);
            case 17:
              bigRes = _context5.sent;
              _analyzeCompare = Object(_analyze__WEBPACK_IMPORTED_MODULE_20__["analyzeCompare"])(smallRes, bigRes, 'panel'), additionalStatistic = _analyzeCompare.additionalStatistic, biggerStatistic = _analyzeCompare.biggerStatistic, additionalNode = _analyzeCompare.additionalNode, biggerNode = _analyzeCompare.biggerNode;
              compare.value.is = true;
              compare.value.addtionalLen = additionalNode.length;
              compare.value.biggerLen = biggerNode.length;
              renderOptions.analyze.additional = additionalStatistic;
              renderOptions.analyze.bigger = biggerStatistic;
              store.setData({
                data: bigRes,
                compareData: additionalNode.concat(biggerNode)
              });
              confirm();
              return _context5.abrupt("return");
            case 27:
              _context5.next = 29;
              return Object(_utils__WEBPACK_IMPORTED_MODULE_19__["read"])(file[0]);
            case 29:
              result = _context5.sent;
              _context5.next = 32;
              return parse(result);
            case 32:
              parseResult = _context5.sent;
              store.setData({
                data: parseResult
              });
              confirm();
            case 35:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      return function upload(_x2) {
        return _ref6.apply(this, arguments);
      };
    }();
    var parse = /*#__PURE__*/function () {
      var _ref7 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_13___default()(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_14___default.a.mark(function _callee6(result) {
        var _worker;
        var sharedBuffer, sharedArray;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_14___default.a.wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              console.time('parse');
              store.setLoading('loading');
              sharedBuffer = new SharedArrayBuffer(result.byteLength);
              sharedArray = new Uint8Array(sharedBuffer);
              sharedArray.set(result);
              (_worker = worker) === null || _worker === void 0 ? void 0 : _worker.postMessage(sharedArray);
              return _context6.abrupt("return", new Promise(function (resolve) {
                var _worker2;
                (_worker2 = worker) === null || _worker2 === void 0 ? void 0 : _worker2.addEventListener('message', function (e) {
                  var parseResultJSON = JSON.parse(new TextDecoder().decode(e.data));
                  console.timeEnd('parse');
                  store.setLoading('finish');
                  resolve(parseResultJSON);
                }, {
                  once: true
                });
              }));
            case 7:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      return function parse(_x3) {
        return _ref7.apply(this, arguments);
      };
    }();
    renderOptions.tooltip = {
      trigger: 'item',
      show: true,
      formatter: function formatter(params) {
        var data = params.data;
        if (!data.id) {
          if (!data.lineStyle) return;
          return "<div class=\"tooltipText\">\n        <div class=\"item\">\n        <div class=\"name\">\u8FB9\u7C7B\u578B:  </div>\n        <div class=\"code\">".concat(data.lineStyle.edge_type, "</div>\n      </div>\n      <div class=\"item\">\n        <div class=\"name\">\u540D\u79F0\u6216\u4E0B\u6807:  </div>\n        <div class=\"code\">").concat(data.lineStyle.name_or_index, "</div>\n      </div>\n      </div>");
        }
        var _ref8 = data.itemStyle,
          compare_type = _ref8.compare_type,
          bigger_number = _ref8.bigger_number,
          source = _ref8.source,
          constructor = _ref8.constructor,
          node_type = _ref8.node_type,
          size = _ref8.size,
          retained_size = _ref8.retained_size;
        return "<div class=\"tooltipText\">\n      ".concat(compare_type ? " <div class=\"item\">\n          <div class=\"name red\">\u6BD4\u8F83\u7C7B\u578B: ".concat(compare_type === 'addtional' ? '新增节点' : '可GC大小增大节点', " </div>\n      </div>") : '', "\n      ").concat(bigger_number ? " <div class=\"item\">\n        <div class=\"name red\">\u53EFGC\u5927\u5C0F\u589E\u957F: ".concat(Object(_analyze__WEBPACK_IMPORTED_MODULE_20__["unitConvert"])(bigger_number), " </div>\n      </div>") : '', "\n      <div class=\"item\">\n        <div class=\"name\">\u8282\u70B9ID:  </div>\n        <div class=\"code\">").concat(data.id || '', "</div>\n      </div>\n      <div class=\"item\">\n        <div class=\"name\">\u8282\u70B9\u7C7B\u578B:  </div>\n        <div class=\"code\">").concat(node_type, "</div>\n      </div>\n      ").concat(constructor ? " <div class=\"item\">\n        <div class=\"name\">\u6784\u9020\u51FD\u6570:  </div>\n        <div class=\"code\">".concat(constructor, "</div>\n      </div>") : '', "\n      <div class=\"item\">\n        <div class=\"name\">\u8282\u70B9\u540D\u79F0:  </div>\n        <div class=\"code\">").concat(data.name, "</div>\n      </div>\n      <div class=\"item\">\n        <div class=\"name\">\u81EA\u8EAB\u5927\u5C0F:  </div>\n        <div class=\"code\">").concat(Object(_analyze__WEBPACK_IMPORTED_MODULE_20__["unitConvert"])(size), "</div>\n      </div>\n      <div class=\"item\">\n        <div class=\"name\">\u53EFGC\u5927\u5C0F:  </div>\n        <div class=\"code\">").concat(Object(_analyze__WEBPACK_IMPORTED_MODULE_20__["unitConvert"])(retained_size), "</div>\n      </div>\n      ").concat(source ? " <div class=\"item\">\n        <div class=\"name\">\u6E90\u6587\u4EF6\u4F4D\u7F6E:  </div>\n        <div class=\"code\">".concat(source, "</div>\n      </div>") : '', "\n      </div>");
      },
      extraCssText: 'white-space:wrap',
      displayMode: 'multipleByCoordSys',
      position: 'right'
    };
    var confirm = function confirm() {
      console.log('renderOptions', renderOptions);
      var res = [];
      if (compare.value.is) {
        var _compare$value = compare.value,
          addtionalLen = _compare$value.addtionalLen,
          mode = _compare$value.mode;
        res = mode === 'addtional' ? store.compareData.slice(0, addtionalLen) : store.compareData.slice(addtionalLen);
      } else {
        res = store.data;
      }
      children.value.render(res.filter(function (item) {
        return item.constructor === renderOptions.filterNodeByConstructor || renderOptions.filterNodeByConstructor === 'all';
      }));
    };
    Object(vue__WEBPACK_IMPORTED_MODULE_15__["provide"])('renderOptions', renderOptions);
    var __returned__ = {
      store: store,
      router: router,
      route: route,
      path: path,
      query: query,
      fileRef: fileRef,
      children: children,
      pop: pop,
      get worker() {
        return worker;
      },
      set worker(v) {
        worker = v;
      },
      renderOptions: renderOptions,
      maxNodes: maxNodes,
      isIndex: isIndex,
      edgeCounts: edgeCounts,
      parentDepth: parentDepth,
      childDepth: childDepth,
      nodeName: nodeName,
      nodeId: nodeId,
      filterNative: filterNative,
      parseMethod: parseMethod,
      compare: compare,
      analyze: analyze,
      filterNode: filterNode,
      open: open,
      defaultDemo: defaultDemo,
      analyzeFn: analyzeFn,
      upload: upload,
      parse: parse,
      confirm: confirm,
      get Button() {
        return vant_lib_button__WEBPACK_IMPORTED_MODULE_11___default.a;
      },
      get Field() {
        return vant_lib_field__WEBPACK_IMPORTED_MODULE_9___default.a;
      },
      get Loading() {
        return vant_lib_loading__WEBPACK_IMPORTED_MODULE_7___default.a;
      },
      get DropdownMenu() {
        return vant_lib_dropdown_menu__WEBPACK_IMPORTED_MODULE_5___default.a;
      },
      get DropdownItem() {
        return vant_lib_dropdown_item__WEBPACK_IMPORTED_MODULE_3___default.a;
      },
      get Popover() {
        return vant_lib_popover__WEBPACK_IMPORTED_MODULE_1___default.a;
      },
      get compareOptions() {
        return _utils__WEBPACK_IMPORTED_MODULE_19__["compareOptions"];
      },
      get filterNodeOptions() {
        return _utils__WEBPACK_IMPORTED_MODULE_19__["filterNodeOptions"];
      },
      get filterConstructorOptions() {
        return _utils__WEBPACK_IMPORTED_MODULE_19__["filterConstructorOptions"];
      },
      get NODE_COLORS() {
        return _utils__WEBPACK_IMPORTED_MODULE_19__["NODE_COLORS"];
      },
      get EDGE_COLORS() {
        return _utils__WEBPACK_IMPORTED_MODULE_19__["EDGE_COLORS"];
      },
      get unitConvert() {
        return _analyze__WEBPACK_IMPORTED_MODULE_20__["unitConvert"];
      }
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/dist/index.js?!./web/pages/index/node/render$node.vue?vue&type=script&lang=ts&setup=true":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/dist??ref--5-0!./web/pages/index/node/render$node.vue?vue&type=script&lang=ts&setup=true ***!
  \**************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-router */ "vue-router");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var echarts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! echarts */ "echarts");
/* harmony import */ var echarts__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(echarts__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/utils */ "./web/utils.ts");
/* harmony import */ var _pages_index_index_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/pages/index/index.less */ "./web/pages/index/index.less");


function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var _n = 0,
        F = function F() {};
      return {
        s: F,
        n: function n() {
          return _n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[_n++]
          };
        },
        e: function e(r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function s() {
      t = t.call(r);
    },
    n: function n() {
      var r = t.next();
      return a = r.done, r;
    },
    e: function e(r) {
      u = !0, o = r;
    },
    f: function f() {
      try {
        a || null == t["return"] || t["return"]();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}






/* harmony default export */ __webpack_exports__["default"] = (/*@__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_2__["defineComponent"])({
  __name: 'render$node',
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    var renderOptions = Object(vue__WEBPACK_IMPORTED_MODULE_2__["inject"])('renderOptions');
    var _toRefs = Object(vue__WEBPACK_IMPORTED_MODULE_2__["toRefs"])(renderOptions),
      nodeSize = _toRefs.nodeSize,
      childDepth = _toRefs.childDepth,
      filterNative = _toRefs.filterNative,
      edgeCounts = _toRefs.edgeCounts,
      nodeName = _toRefs.nodeName,
      tooltip = _toRefs.tooltip,
      force = _toRefs.force,
      label = _toRefs.label;
    force.value = {
      repulsion: 1000,
      gravity: 0.1,
      edgeLength: 200,
      layoutAnimation: true
    };
    var router = Object(vue_router__WEBPACK_IMPORTED_MODULE_3__["useRouter"])();
    function generate(node, idToNode) {
      var links = [];
      var nodes = [];
      var queue = [node];
      var pathStore = {}; // 记录已经建立的指向关系
      var depth = 0;
      var arr = [];
      // 引用深度
      queue = [node];
      pathStore = {};
      depth = 0;
      while (queue.length) {
        if (depth === Number(childDepth.value)) break;
        depth++;
        var tempArr = queue;
        queue = [];
        tempArr.forEach(function (node) {
          var children = node.edges.slice(0, edgeCounts.value).map(function (item) {
            return item.to_node;
          });
          var _iterator = _createForOfIteratorHelper(children),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var childId = _step.value;
              var childNode = idToNode[childId];
              if (!childNode) {
                continue;
              }
              if (nodeName.value && !childNode.name.toLocaleLowerCase().includes(nodeName.value.toLocaleLowerCase())) {
                continue;
              }
              if (Number(filterNative.value) === 1 && _utils__WEBPACK_IMPORTED_MODULE_5__["nativeNode"].includes(childNode.node_type)) {
                continue;
              }
              if (!pathStore[node.id]) pathStore[node.id] = [];
              if (!pathStore[node.id].includes(childId)) {
                arr.push({
                  source: node.id,
                  target: childId
                });
                pathStore[node.id].push(childId);
                queue.push(childNode);
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        });
      }
      var nodeStore = {};
      console.log('边关系', arr);
      var nodeToIndex = {}; // 记录每一个节点在 nodes 里面的下标
      arr.forEach(function (relationship) {
        var source = relationship.source,
          target = relationship.target;
        [source, target].forEach(function (relationNodeId) {
          var node = idToNode[relationNodeId];
          if (node && !nodeStore[relationNodeId]) {
            nodes.push({
              id: String(node.id),
              // @ts-expect-error
              constructor: node.constructor,
              name: String(node.name),
              value: node.retained_size,
              symbolSize: Number(node.id) === Number(_utils__WEBPACK_IMPORTED_MODULE_5__["renderNodeId"].value) ? nodeSize.value * 8 : nodeSize.value * 2,
              itemStyle: _objectSpread(_objectSpread({}, node), {}, {
                color: node.id === Number(_utils__WEBPACK_IMPORTED_MODULE_5__["renderNodeId"].value) ? 'red' : _utils__WEBPACK_IMPORTED_MODULE_5__["NODE_COLORS"][node.node_type]
              })
            });
            nodeToIndex[node.id] = nodes.length - 1;
          }
          nodeStore[relationNodeId] = 1;
        });
      });
      arr.forEach(function (relationship) {
        var source = relationship.source,
          target = relationship.target;
        var sourceNode = idToNode[source];
        var edge = sourceNode.edges.find(function (item) {
          return Number(item.to_node) === Number(target);
        });
        edge && links.push({
          source: nodeToIndex[source],
          target: nodeToIndex[target],
          lineStyle: {
            // @ts-expect-error
            edge_type: edge.edge_type,
            name_or_index: edge.name_or_index,
            color: _utils__WEBPACK_IMPORTED_MODULE_5__["EDGE_COLORS"][edge.edge_type]
          }
        });
      });
      return [nodes, links];
    }
    var render = function render(nodes) {
      var idToNode = {};
      var _iterator2 = _createForOfIteratorHelper(nodes),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var item = _step2.value;
          idToNode[item.id] = item;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var node = idToNode[Number(_utils__WEBPACK_IMPORTED_MODULE_5__["renderNodeId"].value)];
      var _generate = generate(node, idToNode),
        _generate2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_generate, 2),
        data = _generate2[0],
        links = _generate2[1];
      renderOptions.nodeByConstructor = Object(_utils__WEBPACK_IMPORTED_MODULE_5__["calculateByConstructor"])(data);
      var option = {
        tooltip: tooltip.value,
        // @ts-expect-error
        series: [{
          type: 'graph',
          layout: 'force',
          data: data,
          edgeSymbol: ['none', 'arrow'],
          edgeLabel: {
            show: true,
            color: 'black',
            position: 'middle',
            formatter: function formatter(params) {
              var data = params.data;
              var name_or_index = data.lineStyle.name_or_index;
              return name_or_index;
            }
          },
          edges: links,
          label: label.value,
          force: force.value,
          roam: true,
          draggable: true
        }]
      };
      var chart = echarts__WEBPACK_IMPORTED_MODULE_4__["init"](document.getElementById('main'));
      chart.setOption(option);
      chart.on('click', 'series', function (e) {
        var id = e.data.id;
        if (id === _utils__WEBPACK_IMPORTED_MODULE_5__["renderNodeId"].value) return;
        router.push("/index/node/".concat(id));
      });
    };
    __expose({
      render: render
    });
    var __returned__ = {
      renderOptions: renderOptions,
      nodeSize: nodeSize,
      childDepth: childDepth,
      filterNative: filterNative,
      edgeCounts: edgeCounts,
      nodeName: nodeName,
      tooltip: tooltip,
      force: force,
      label: label,
      router: router,
      generate: generate,
      render: render
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/dist/index.js?!./web/pages/index/render.vue?vue&type=script&lang=ts&setup=true":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/babel-loader/lib??ref--2-0!./node_modules/vue-loader/dist??ref--5-0!./web/pages/index/render.vue?vue&type=script&lang=ts&setup=true ***!
  \****************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vant_lib_notify_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vant/lib/notify/style */ "./node_modules/vant/lib/notify/style/index.js");
/* harmony import */ var vant_lib_notify_style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vant_lib_notify_style__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vant_lib_notify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vant/lib/notify */ "vant/lib/notify");
/* harmony import */ var vant_lib_notify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vant_lib_notify__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-router */ "vue-router");
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vue_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var echarts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! echarts */ "echarts");
/* harmony import */ var echarts__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(echarts__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/store */ "./web/store/index.ts");
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./index.less */ "./web/pages/index/index.less");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/utils */ "./web/utils.ts");



function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}







/* harmony default export */ __webpack_exports__["default"] = (/*@__PURE__*/Object(vue__WEBPACK_IMPORTED_MODULE_3__["defineComponent"])({
  __name: 'render',
  setup: function setup(__props, _ref) {
    var __expose = _ref.expose;
    var store = Object(_store__WEBPACK_IMPORTED_MODULE_6__["useSnapShotStore"])();
    var router = Object(vue_router__WEBPACK_IMPORTED_MODULE_4__["useRouter"])();
    var renderOptions = Object(vue__WEBPACK_IMPORTED_MODULE_3__["inject"])('renderOptions');
    var _toRefs = Object(vue__WEBPACK_IMPORTED_MODULE_3__["toRefs"])(renderOptions),
      maxNodes = _toRefs.maxNodes,
      nodeSize = _toRefs.nodeSize,
      nodeName = _toRefs.nodeName,
      nodeId = _toRefs.nodeId,
      tooltip = _toRefs.tooltip,
      force = _toRefs.force,
      label = _toRefs.label;
    force.value = {
      repulsion: 200,
      gravity: 0.1,
      edgeLength: 200,
      layoutAnimation: true
    };
    var render = function render(snapshort) {
      renderOptions.nodeByConstructor = Object(_utils__WEBPACK_IMPORTED_MODULE_8__["calculateByConstructor"])(snapshort);
      var nodes = [];
      var sortNodes = snapshort.filter(function (node) {
        if (nodeName.value && !Object(_utils__WEBPACK_IMPORTED_MODULE_8__["compareName"])(node.name, nodeName.value)) {
          return false;
        }
        if (nodeId.value && Number(nodeId.value) !== Number(node.id)) {
          return false;
        }
        return true;
      }).slice(0, maxNodes.value).reverse();
      if (!(sortNodes !== null && sortNodes !== void 0 && sortNodes.length)) {
        vant_lib_notify__WEBPACK_IMPORTED_MODULE_2___default()({
          type: 'danger',
          duration: 5000,
          message: '过滤节点后没有剩余节点'
        });
        return;
      }
      sortNodes.forEach(function (node, index) {
        nodes.push({
          id: String(node.id),
          name: String(node.name),
          value: node.retained_size,
          symbolSize: Number(nodeSize.value) + index * 1,
          itemStyle: _objectSpread(_objectSpread({}, node), {}, {
            color: _utils__WEBPACK_IMPORTED_MODULE_8__["NODE_COLORS"][node.constructor || ''] || _utils__WEBPACK_IMPORTED_MODULE_8__["NODE_COLORS"]['unknown']
          })
        });
      });
      var chartDom = document.getElementById('main');
      var myChart = echarts__WEBPACK_IMPORTED_MODULE_5__["init"](chartDom);
      var option = {
        tooltip: tooltip.value,
        series: [{
          type: 'graph',
          layout: 'force',
          data: nodes,
          edgeSymbol: ['arrow', 'none'],
          label: label.value,
          force: force.value,
          roam: true,
          draggable: true
        }]
      };
      myChart.setOption(option);
      myChart.on('click', 'series', function (e) {
        var id = e.data.id;
        router.push("/index/node/".concat(id));
      });
    };
    __expose({
      render: render
    });
    var __returned__ = {
      store: store,
      router: router,
      renderOptions: renderOptions,
      maxNodes: maxNodes,
      nodeSize: nodeSize,
      nodeName: nodeName,
      nodeId: nodeId,
      tooltip: tooltip,
      force: force,
      label: label,
      render: render
    };
    Object.defineProperty(__returned__, '__isScriptSetup', {
      enumerable: false,
      value: true
    });
    return __returned__;
  }
}));

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/dist/templateLoader.js?!./node_modules/vue-loader/dist/index.js?!./web/components/layout/App.vue?vue&type=template&id=185cf71c&ts=true":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/dist/templateLoader.js??ref--5-0!./node_modules/vue-loader/dist??ref--5-0!./web/components/layout/App.vue?vue&type=template&id=185cf71c&ts=true ***!
  \***************************************************************************************************************************************************************************************************************************/
/*! exports provided: ssrRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ssrRender", function() { return ssrRender; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue/server-renderer */ "vue/server-renderer");
/* harmony import */ var vue_server_renderer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__);


function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _component_router_view = Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveComponent"])("router-view");
  _push("<div".concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderAttrs"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
    "class": "container"
  }, _attrs)), "><div class=\"board\"><div class=\"title\"> \u63A7\u5236\u9762\u677F </div><!-- <Field class=\"field\" v-model=\"nodeSize\" label=\"\u8282\u70B9\u5927\u5C0F\"></Field> -->"));
  _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["Popover"], {
    show: $setup.pop.name,
    "onUpdate:show": function onUpdateShow($event) {
      return $setup.pop.name = $event;
    },
    placement: "right-start",
    actions: [{
      text: '支持正则模式匹配，例如^start$'
    }]
  }, {
    reference: Object(vue__WEBPACK_IMPORTED_MODULE_0__["withCtx"])(function (_, _push, _parent, _scopeId) {
      if (_push) {
        _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["Field"], {
          "class": "field",
          modelValue: $setup.nodeName,
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            return $setup.nodeName = $event;
          },
          label: "节点名称"
        }, null, _parent, _scopeId));
      } else {
        return [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])($setup["Field"], {
          "class": "field",
          modelValue: $setup.nodeName,
          "onUpdate:modelValue": function onUpdateModelValue($event) {
            return $setup.nodeName = $event;
          },
          label: "节点名称"
        }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue"])];
      }
    }),
    _: 1 /* STABLE */
  }, _parent));
  if ($setup.isIndex) {
    _push("<!--[-->");
    _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["Field"], {
      "class": "field",
      modelValue: $setup.nodeId,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return $setup.nodeId = $event;
      },
      label: "节点id"
    }, null, _parent));
    _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["Field"], {
      "class": "field",
      modelValue: $setup.maxNodes,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return $setup.maxNodes = $event;
      },
      label: "节点数量"
    }, null, _parent));
    _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["DropdownMenu"], {
      "class": "field"
    }, {
      "default": Object(vue__WEBPACK_IMPORTED_MODULE_0__["withCtx"])(function (_, _push, _parent, _scopeId) {
        if (_push) {
          _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["DropdownItem"], {
            "class": "field",
            modelValue: $setup.renderOptions.filterNodeByConstructor,
            "onUpdate:modelValue": function onUpdateModelValue($event) {
              return $setup.renderOptions.filterNodeByConstructor = $event;
            },
            options: $setup.filterConstructorOptions
          }, null, _parent, _scopeId));
        } else {
          return [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])($setup["DropdownItem"], {
            "class": "field",
            modelValue: $setup.renderOptions.filterNodeByConstructor,
            "onUpdate:modelValue": function onUpdateModelValue($event) {
              return $setup.renderOptions.filterNodeByConstructor = $event;
            },
            options: $setup.filterConstructorOptions
          }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "options"])];
        }
      }),
      _: 1 /* STABLE */
    }, _parent));
    _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["DropdownMenu"], {
      "class": "field"
    }, {
      "default": Object(vue__WEBPACK_IMPORTED_MODULE_0__["withCtx"])(function (_, _push, _parent, _scopeId) {
        if (_push) {
          _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["DropdownItem"], {
            "class": "field",
            modelValue: $setup.filterNode,
            "onUpdate:modelValue": function onUpdateModelValue($event) {
              return $setup.filterNode = $event;
            },
            options: $setup.filterNodeOptions
          }, null, _parent, _scopeId));
        } else {
          return [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])($setup["DropdownItem"], {
            "class": "field",
            modelValue: $setup.filterNode,
            "onUpdate:modelValue": function onUpdateModelValue($event) {
              return $setup.filterNode = $event;
            },
            options: $setup.filterNodeOptions
          }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "options"])];
        }
      }),
      _: 1 /* STABLE */
    }, _parent));
    _push("<!--]-->");
  } else {
    _push("<!---->");
  }
  if (!$setup.isIndex) {
    _push("<!--[-->");
    _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["Field"], {
      "class": "field",
      modelValue: $setup.parentDepth,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return $setup.parentDepth = $event;
      },
      label: "被引用深度"
    }, null, _parent));
    _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["Field"], {
      "class": "field",
      modelValue: $setup.childDepth,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return $setup.childDepth = $event;
      },
      label: "引用深度"
    }, null, _parent));
    _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["Field"], {
      "class": "field",
      modelValue: $setup.edgeCounts,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return $setup.edgeCounts = $event;
      },
      label: "最大边数量"
    }, null, _parent));
    _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["Field"], {
      "class": "field",
      modelValue: $setup.filterNative,
      "onUpdate:modelValue": function onUpdateModelValue($event) {
        return $setup.filterNative = $event;
      },
      label: "过滤原生节点"
    }, null, _parent));
    _push("<!--]-->");
  } else {
    _push("<!---->");
  }
  if ($setup.compare.is) {
    _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["DropdownMenu"], {
      "class": "field"
    }, {
      "default": Object(vue__WEBPACK_IMPORTED_MODULE_0__["withCtx"])(function (_, _push, _parent, _scopeId) {
        if (_push) {
          _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["DropdownItem"], {
            "class": "field",
            modelValue: $setup.compare.mode,
            "onUpdate:modelValue": function onUpdateModelValue($event) {
              return $setup.compare.mode = $event;
            },
            options: $setup.compareOptions
          }, null, _parent, _scopeId));
        } else {
          return [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])($setup["DropdownItem"], {
            "class": "field",
            modelValue: $setup.compare.mode,
            "onUpdate:modelValue": function onUpdateModelValue($event) {
              return $setup.compare.mode = $event;
            },
            options: $setup.compareOptions
          }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "options"])];
        }
      }),
      _: 1 /* STABLE */
    }, _parent));
  } else {
    _push("<!---->");
  }
  _push("<input type=\"file\" accept=\".heapsnapshot\" class=\"inputFile\" multiple=\"true\">");
  _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["Popover"], {
    show: $setup.pop.snapshot,
    "onUpdate:show": function onUpdateShow($event) {
      return $setup.pop.snapshot = $event;
    },
    placement: "right-start",
    actions: [{
      text: '支持同时上传两个快照文件进行比较'
    }]
  }, {
    reference: Object(vue__WEBPACK_IMPORTED_MODULE_0__["withCtx"])(function (_, _push, _parent, _scopeId) {
      if (_push) {
        if ($setup.store.loaded !== 'finish') {
          _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["Button"], {
            type: "primary",
            "class": "btn",
            onClick: function onClick($event) {
              return $setup.fileRef.click();
            },
            onMouseenter: function onMouseenter($event) {
              return $setup.pop.snapshot = true;
            },
            onMouseout: function onMouseout($event) {
              return $setup.pop.snapshot = false;
            }
          }, {
            "default": Object(vue__WEBPACK_IMPORTED_MODULE_0__["withCtx"])(function (_, _push, _parent, _scopeId) {
              if (_push) {
                _push("\u4E0A\u4F20\u5185\u5B58\u5FEB\u7167\u6587\u4EF6");
              } else {
                return [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createTextVNode"])("上传内存快照文件")];
              }
            }),
            _: 1 /* STABLE */
          }, _parent, _scopeId));
        } else {
          _push("<!---->");
        }
      } else {
        return [$setup.store.loaded !== 'finish' ? (Object(vue__WEBPACK_IMPORTED_MODULE_0__["openBlock"])(), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createBlock"])($setup["Button"], {
          key: 0,
          type: "primary",
          "class": "btn",
          onClick: function onClick($event) {
            return $setup.fileRef.click();
          },
          onMouseenter: function onMouseenter($event) {
            return $setup.pop.snapshot = true;
          },
          onMouseout: function onMouseout($event) {
            return $setup.pop.snapshot = false;
          }
        }, {
          "default": Object(vue__WEBPACK_IMPORTED_MODULE_0__["withCtx"])(function () {
            return [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createTextVNode"])("上传内存快照文件")];
          }),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["onClick", "onMouseenter", "onMouseout"])) : Object(vue__WEBPACK_IMPORTED_MODULE_0__["createCommentVNode"])("v-if", true)];
      }
    }),
    _: 1 /* STABLE */
  }, _parent));
  if ($setup.store.loaded === 'finish') {
    _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["Button"], {
      type: "primary",
      "class": "btn",
      onClick: $setup.confirm
    }, {
      "default": Object(vue__WEBPACK_IMPORTED_MODULE_0__["withCtx"])(function (_, _push, _parent, _scopeId) {
        if (_push) {
          _push("\u91CD\u65B0\u7ED8\u5236");
        } else {
          return [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createTextVNode"])("重新绘制")];
        }
      }),
      _: 1 /* STABLE */
    }, _parent));
  } else {
    _push("<!---->");
  }
  if ($setup.store.loaded === 'null') {
    _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["Button"], {
      type: "primary",
      "class": "btn",
      onClick: $setup.defaultDemo
    }, {
      "default": Object(vue__WEBPACK_IMPORTED_MODULE_0__["withCtx"])(function (_, _push, _parent, _scopeId) {
        if (_push) {
          _push("\u67E5\u770B\u9ED8\u8BA4\u793A\u4F8B");
        } else {
          return [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createTextVNode"])("查看默认示例")];
        }
      }),
      _: 1 /* STABLE */
    }, _parent));
  } else {
    _push("<!---->");
  }
  _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["Button"], {
    type: "primary",
    "class": "btn",
    onClick: function onClick($event) {
      return $setup.open('http://doc.ssr-fc.com/docs/features$memory');
    }
  }, {
    "default": Object(vue__WEBPACK_IMPORTED_MODULE_0__["withCtx"])(function (_, _push, _parent, _scopeId) {
      if (_push) {
        _push("\u4F7F\u7528\u624B\u518C");
      } else {
        return [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createTextVNode"])("使用手册")];
      }
    }),
    _: 1 /* STABLE */
  }, _parent));
  if ($setup.store.loaded === 'null') {
    _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["Button"], {
      type: "primary",
      "class": "btn",
      onClick: function onClick($event) {
        return $setup.open('https://github.com/zhangyuang/v8-profiler-rs#%E6%9B%B4%E6%96%B0%E8%AE%B0%E5%BD%95');
      }
    }, {
      "default": Object(vue__WEBPACK_IMPORTED_MODULE_0__["withCtx"])(function (_, _push, _parent, _scopeId) {
        if (_push) {
          _push("\u66F4\u65B0\u65E5\u5FD7");
        } else {
          return [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createTextVNode"])("更新日志")];
        }
      }),
      _: 1 /* STABLE */
    }, _parent));
  } else {
    _push("<!---->");
  }
  if ($setup.store.loaded === 'finish') {
    _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["Button"], {
      type: "primary",
      "class": "btn",
      onClick: $setup.analyzeFn
    }, {
      "default": Object(vue__WEBPACK_IMPORTED_MODULE_0__["withCtx"])(function (_, _push, _parent, _scopeId) {
        if (_push) {
          _push("\u751F\u6210\u5206\u6790\u62A5\u544A");
        } else {
          return [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createTextVNode"])("生成分析报告")];
        }
      }),
      _: 1 /* STABLE */
    }, _parent));
  } else {
    _push("<!---->");
  }
  if ($setup.store.loaded === 'null') {
    _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["Button"], {
      type: "primary",
      "class": "btn",
      onClick: function onClick($event) {
        return $setup.open('https://github.com/zhangyuang/v8-profiler-rs');
      }
    }, {
      "default": Object(vue__WEBPACK_IMPORTED_MODULE_0__["withCtx"])(function (_, _push, _parent, _scopeId) {
        if (_push) {
          _push("\u4EE3\u7801\u4ED3\u5E93(\u6B22\u8FCE Star\u2728)");
        } else {
          return [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createTextVNode"])("代码仓库(欢迎 Star✨)")];
        }
      }),
      _: 1 /* STABLE */
    }, _parent));
  } else {
    _push("<!---->");
  }
  if ($setup.store.loaded === 'null') {
    _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["Button"], {
      type: "primary",
      "class": "btn",
      onClick: function onClick($event) {
        return $setup.open('https://github.com/zhangyuang/v8-profiler-rs#%E7%AD%94%E7%96%91%E7%BE%A4');
      }
    }, {
      "default": Object(vue__WEBPACK_IMPORTED_MODULE_0__["withCtx"])(function (_, _push, _parent, _scopeId) {
        if (_push) {
          _push("\u8054\u7CFB\u4F5C\u8005");
        } else {
          return [Object(vue__WEBPACK_IMPORTED_MODULE_0__["createTextVNode"])("联系作者")];
        }
      }),
      _: 1 /* STABLE */
    }, _parent));
  } else {
    _push("<!---->");
  }
  _push("</div><div class=\"chartContainer\">");
  if ($setup.store.loaded === 'loading') {
    _push("<div class=\"loadingContainer\">");
    _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])($setup["Loading"], {
      color: "#5b92f8",
      size: "50"
    }, null, _parent));
    if ($setup.parseMethod == 'wasm') {
      _push("<div class=\"text\"> \u4F7F\u7528 WASM \u89E3\u6790\u6587\u4EF6\u4E2D\uFF0C\u6839\u636E\u6587\u4EF6\u5927\u5C0F\u8FD9\u5927\u6982\u9700\u8981 3-20s \u5DE6\u53F3\u7684\u65F6\u95F4\uFF0C\u5EFA\u8BAE\u4F7F\u7528 firefox \u6D4F\u89C8\u5668\uFF0C\u8BF7\u7A0D\u540E... </div>");
    } else {
      _push("<!---->");
    }
    _push("</div>");
  } else {
    _push("<!---->");
  }
  _push(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderComponent"])(_component_router_view, null, {
    "default": Object(vue__WEBPACK_IMPORTED_MODULE_0__["withCtx"])(function (_ref, _push, _parent, _scopeId) {
      var Component = _ref.Component;
      if (_push) {
        Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderVNode"])(_push, Object(vue__WEBPACK_IMPORTED_MODULE_0__["createVNode"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveDynamicComponent"])(Component), {
          ref: "children"
        }, null), _parent, _scopeId);
      } else {
        return [(Object(vue__WEBPACK_IMPORTED_MODULE_0__["openBlock"])(), Object(vue__WEBPACK_IMPORTED_MODULE_0__["createBlock"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["resolveDynamicComponent"])(Component), {
          ref: "children"
        }, null, 512 /* NEED_PATCH */))];
      }
    }),
    _: 1 /* STABLE */
  }, _parent));
  if ($setup.store.loaded === 'null') {
    _push("<div class=\"tips\"> \u8BF7\u9009\u62E9 V8 \u5185\u5B58\u5806\u5FEB\u7167\u6587\u4EF6\u4E0A\u4F20 </div>");
  } else {
    _push("<!---->");
  }
  _push("</div><div class=\"".concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderClass"])("fixed ".concat($setup.renderOptions.isIndex ? 'right-[20px]' : 'right-[200px]', " top-[20px]")), "\"><div class=\"flex items-center\"><div class=\"text-black text-opacity-50\">\u4E0D\u540C\u7C7B\u578B\u8282\u70B9\u6570\u91CF</div></div><!--[-->"));
  Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderList"])($setup.renderOptions.nodeByConstructor, function (value, key) {
    _push("<div><div class=\"flex items-center\"><div class=\"rounded-[50%] w-[10px] h-[10px]\" style=\"".concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderStyle"])({
      backgroundColor: $setup.NODE_COLORS[key] || $setup.NODE_COLORS['unknown']
    }), "\"></div><div class=\"ml-[10px] text-black text-opacity-50\">").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])(key), " \u6570\u91CF: ").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])(value), "</div></div></div>"));
  });
  _push("<!--]--></div>");
  if (!$setup.renderOptions.isIndex) {
    _push("<div class=\"fixed right-[20px] top-[20px]\"><div class=\"flex items-center\"><div class=\"text-black text-opacity-50\">edge_type</div></div><!--[-->");
    Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderList"])($setup.EDGE_COLORS, function (value, key) {
      _push("<div><div class=\"flex items-center\"><div class=\"rounded-[50%] w-[10px] h-[10px]\" style=\"".concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderStyle"])({
        backgroundColor: value
      }), "\"></div><div class=\"ml-[10px] text-black text-opacity-50\">").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])(key), "</div></div></div>"));
    });
    _push("<!--]--></div>");
  } else {
    _push("<!---->");
  }
  if ($setup.analyze.show) {
    _push("<div class=\"fixed right-[0px] top-[0px] analyze px-[20px] pt-[40px] pb-[20px] flex flex-col min-w-[300px] max-w-[500px] overflow-scroll box-border z-10\"><div class=\"flex items-center text-[20px] fixed top-0 bg-white py-[10px] z-20 w-full\"><img class=\"w-[20px] h-[20px]\" src=\"/close.svg\" alt=\"\"> \u5206\u6790\u62A5\u544A </div><div class=\"mb-[20px]\"></div>");
    if ($setup.compare.is) {
      var _$setup$analyze$addit, _$setup$analyze$addit2, _$setup$analyze$addit3, _$setup$analyze$addit4, _$setup$analyze$bigge, _$setup$analyze$bigge2;
      _push("<!--[--><div class=\"flex items-center\"><div class=\"bg-[#DB7093] rounded-[50%] w-[10px] h-[10px]\"></div><div class=\"ml-[10px] text-black text-opacity-50\">\u65B0\u589E\u8282\u70B9\u6570\u91CF</div><div class=\"ml-[10px] font-mono\">".concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])($setup.compare.addtionalLen), "</div></div><div class=\"flex items-center mb-[10px]\"><div class=\"bg-[#800080] rounded-[50%] w-[10px] h-[10px]\"></div><div class=\"ml-[10px] text-black text-opacity-50\">\u589E\u5927\u8282\u70B9\u6570\u91CF</div><div class=\"ml-[10px] font-mono\">").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])($setup.compare.biggerLen), "</div></div>"));
      if ((_$setup$analyze$addit = $setup.analyze.additional) !== null && _$setup$analyze$addit !== void 0 && (_$setup$analyze$addit2 = _$setup$analyze$addit.sortByCount) !== null && _$setup$analyze$addit2 !== void 0 && _$setup$analyze$addit2.length) {
        _push("<div><div class=\"mb-[10px]\"> \u65B0\u589E\u8282\u70B9\u4E2DJS\u5C42\u91CD\u590D\u8282\u70B9\uFF1A </div><!--[-->");
        Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderList"])($setup.analyze.additional.sortByCount, function (item) {
          _push("<div class=\"text-black text-opacity-50 mb-[10px]\"> \u65B0\u589E\u8282\u70B9\u540D\u79F0: <span class=\"font-bold\">".concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])(item.name), "</span>\uFF0C \u65B0\u589E\u6B21\u6570\u8FBE\u5230 <span class=\"font-bold\">").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])(item.count), "</span>\uFF0C\u5171\u5360\u7528\u5185\u5B58 <span class=\"font-bold\">").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])($setup.unitConvert(item.shallowSize)), "</span>"));
          if (item.sourceString.includes('<br />')) {
            var _item$sourceString;
            _push("<!--[--> \u4F4D\u4E8E\u591A\u4E2A\u6587\u4EF6 <div class=\"\">".concat((_item$sourceString = item.sourceString) !== null && _item$sourceString !== void 0 ? _item$sourceString : '', "</div><!--]-->"));
          } else {
            var _item$sourceString2;
            _push("<!--[--> \u4EC5\u5B58\u5728\u4E8E\u6587\u4EF6 <div class=\"\">".concat((_item$sourceString2 = item.sourceString) !== null && _item$sourceString2 !== void 0 ? _item$sourceString2 : '', "</div> <span class=\"text-red-500\">\u7591\u4F3C\u5B58\u5728\u5185\u5B58\u6CC4\u6F0F</span><!--]-->"));
          }
          _push("</div>");
        });
        _push("<!--]--></div>");
      } else {
        _push("<!---->");
      }
      if ((_$setup$analyze$addit3 = $setup.analyze.additional) !== null && _$setup$analyze$addit3 !== void 0 && (_$setup$analyze$addit4 = _$setup$analyze$addit3.sortRetainedSize) !== null && _$setup$analyze$addit4 !== void 0 && _$setup$analyze$addit4.length) {
        var _$setup$analyze$addit5;
        _push("<div><div class=\"mb-[10px]\"> \u65B0\u589E\u8282\u70B9\u4E2DJS\u5C42\u5360\u7528\u5185\u5B58\u6700\u5927\u8282\u70B9\uFF1A </div><!--[-->");
        Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderList"])((_$setup$analyze$addit5 = $setup.analyze.additional) === null || _$setup$analyze$addit5 === void 0 ? void 0 : _$setup$analyze$addit5.sortRetainedSize, function (item) {
          _push("<div class=\"text-black text-opacity-50 mb-[10px]\"> \u65B0\u589E\u8282\u70B9: <span class=\"font-bold\">".concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])(item.name), "@").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])(item.id), "</span> \u53EF\u91CA\u653E\u5927\u5C0F <span class=\"font-bold\">").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])($setup.unitConvert(item.retained_size)), "</span>\uFF0C \u5360\u603B\u5185\u5B58<span class=\"font-bold\">").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])(item.percent), "</span> \u4F4D\u4E8E\u6587\u4EF6 ").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])(item.source), "</div>"));
        });
        _push("<!--]--></div>");
      } else {
        _push("<!---->");
      }
      if ((_$setup$analyze$bigge = $setup.analyze.bigger) !== null && _$setup$analyze$bigge !== void 0 && (_$setup$analyze$bigge2 = _$setup$analyze$bigge.sortRetainedSize) !== null && _$setup$analyze$bigge2 !== void 0 && _$setup$analyze$bigge2.length) {
        var _$setup$analyze$bigge3;
        _push("<div><div class=\"mb-[10px]\"> \u589E\u5927\u8282\u70B9\u4E2DJS\u5C42\u5360\u7528\u5185\u5B58\u6700\u5927\u8282\u70B9\uFF1A </div><!--[-->");
        Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderList"])((_$setup$analyze$bigge3 = $setup.analyze.bigger) === null || _$setup$analyze$bigge3 === void 0 ? void 0 : _$setup$analyze$bigge3.sortRetainedSize, function (item) {
          var _item$bigger_number;
          _push("<div class=\"text-black text-opacity-50 mb-[10px]\"> \u589E\u5927\u8282\u70B9: <span class=\"font-bold\">".concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])(item.name), "@").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])(item.id), "</span> \u589E\u957F\u5927\u5C0F <span class=\"font-bold\">").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])($setup.unitConvert((_item$bigger_number = item.bigger_number) !== null && _item$bigger_number !== void 0 ? _item$bigger_number : 0)), "</span>\uFF0C \u53EF\u91CA\u653E\u5927\u5C0F\u5360\u603B\u5185\u5B58<span class=\"font-bold\">").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])(item.percent), "</span> \u4F4D\u4E8E\u6587\u4EF6 ").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])(item.source), "</div>"));
        });
        _push("<!--]--></div>");
      } else {
        _push("<!---->");
      }
      _push("<!--]-->");
    } else {
      var _$setup$analyze$sortB, _$setup$analyze$sortR;
      _push("<!--[--><!-- single heapsnapshot analyze -->");
      if ((_$setup$analyze$sortB = $setup.analyze.sortByCount) !== null && _$setup$analyze$sortB !== void 0 && _$setup$analyze$sortB.length) {
        _push("<div><div class=\"mb-[10px]\"> JS\u5C42\u91CD\u590D\u8282\u70B9\uFF1A </div><!--[-->");
        Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderList"])($setup.analyze.sortByCount, function (item) {
          _push("<div class=\"text-black text-opacity-50 mb-[10px]\"> \u8282\u70B9\u540D\u79F0: <span class=\"font-bold\">".concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])(item.name), "</span>\uFF0C \u91CD\u590D\u6B21\u6570\u8FBE\u5230 <span class=\"font-bold\">").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])(item.count), "</span>\uFF0C\u5171\u5360\u7528\u5185\u5B58 <span class=\"font-bold\">").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])($setup.unitConvert(item.shallowSize)), "</span>"));
          if (item.sourceString.includes('<br />')) {
            var _item$sourceString3;
            _push("<!--[--> \u4F4D\u4E8E\u591A\u4E2A\u6587\u4EF6 <div class=\"\">".concat((_item$sourceString3 = item.sourceString) !== null && _item$sourceString3 !== void 0 ? _item$sourceString3 : '', "</div><!--]-->"));
          } else {
            var _item$sourceString4;
            _push("<!--[--> \u4EC5\u5B58\u5728\u4E8E\u6587\u4EF6 <div class=\"\">".concat((_item$sourceString4 = item.sourceString) !== null && _item$sourceString4 !== void 0 ? _item$sourceString4 : '', "</div> <span class=\"text-red-500\">\u7591\u4F3C\u5B58\u5728\u5185\u5B58\u6CC4\u6F0F</span><!--]-->"));
          }
          _push("</div>");
        });
        _push("<!--]--></div>");
      } else {
        _push("<!---->");
      }
      if ((_$setup$analyze$sortR = $setup.analyze.sortRetainedSize) !== null && _$setup$analyze$sortR !== void 0 && _$setup$analyze$sortR.length) {
        _push("<div><div class=\"mb-[10px]\"> JS\u5C42\u81EA\u8EAB\u5185\u5B58\u6BD4\u53EFGC\u5185\u5B58\u6BD4\u4F8B\u6700\u5927\u8282\u70B9\uFF1A </div><!--[-->");
        Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderList"])($setup.analyze.sortRetainedSize, function (item) {
          _push("<div class=\"text-black text-opacity-50 mb-[10px]\"> \u8282\u70B9: <span class=\"font-bold\">".concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])(item.name), "@").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])(item.id), "</span> \u53EFGC\u5185\u5B58\u500D\u6570<span class=\"font-bold\">").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])(item.pt), "\u500D </span> GC\u540E\u53EF\u91CA\u653E\u5927\u5C0F <span class=\"font-bold\">").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])($setup.unitConvert(item.retained_size)), "</span>\uFF0C \u5360\u603B\u5185\u5B58<span class=\"font-bold\">").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])(item.percent), "</span> \u4F4D\u4E8E\u6587\u4EF6 ").concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrInterpolate"])(item.source), "</div>"));
        });
        _push("<!--]--></div>");
      } else {
        _push("<!---->");
      }
      _push("<!--]-->");
    }
    _push("</div>");
  } else {
    _push("<!---->");
  }
  _push("</div>");
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/dist/templateLoader.js?!./node_modules/vue-loader/dist/index.js?!./web/components/layout/index.vue?vue&type=template&id=9a12cea6":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/dist/templateLoader.js??ref--5-0!./node_modules/vue-loader/dist??ref--5-0!./web/components/layout/index.vue?vue&type=template&id=9a12cea6 ***!
  \*********************************************************************************************************************************************************************************************************************/
/*! exports provided: ssrRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ssrRender", function() { return ssrRender; });
/* harmony import */ var vue_server_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue/server-renderer */ "vue/server-renderer");
/* harmony import */ var vue_server_renderer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_server_renderer__WEBPACK_IMPORTED_MODULE_0__);

function ssrRender(_ctx, _push, _parent, _attrs) {
  _push("<!--[--><!-- \u6CE8\uFF1ALayout \u53EA\u4F1A\u5728\u670D\u52A1\u7AEF\u88AB\u6E32\u67D3\uFF0C\u4E0D\u8981\u5728\u6B64\u8FD0\u884C\u5BA2\u6237\u7AEF\u6709\u5173\u903B\u8F91 --><!-- \u9875\u9762\u521D\u59CB\u5316\u6570\u636E\u6CE8\u5165\u5185\u5BB9\u5DF2\u7ECF\u8FC7 serialize-javascript \u8F6C\u4E49 \u9632\u6B62 xss --><html".concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_0__["ssrRenderAttrs"])(_attrs), "><head><meta charSet=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\"><meta name=\"theme-color\" content=\"#000000\"><meta name=\"description\" content=\"v8, heapsnapshot, memory, memory leak, node.js memory\"><link rel=\"icon\" href=\"/logo.jpeg\"><meta name=\"keywords\" itemprop=\"keywords\" content=\"v8, heapsnapshot, memory, memory leak, node.js memory\"><meta property=\"og:title\" content=\"v8, heapsnapshot, memory, memory leak, node.js memory\"><meta property=\"og:description\" content=\"v8, heapsnapshot, memory, memory leak, node.js memory\"><title>v8 heapsnapshot analyze</title>"));
  Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_0__["ssrRenderSlot"])(_ctx.$slots, "viteClient", {}, null, _push, _parent);
  _push("<!-- \u7528\u4E8E\u901A\u8FC7\u914D\u7F6E\u63D2\u5165\u81EA\u5B9A\u4E49\u7684 script \u4E3A\u4E86\u907F\u514D\u5F71\u54CD\u671F\u671B\u529F\u80FD\u8FD9\u5757\u5185\u5BB9\u4E0D\u505A escape\uFF0C\u4E3A\u4E86\u907F\u514D xss \u9700\u8981\u4FDD\u8BC1\u63D2\u5165\u811A\u672C\u4EE3\u7801\u7684\u5B89\u5168\u6027  -->");
  Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_0__["ssrRenderSlot"])(_ctx.$slots, "customeHeadScript", {}, null, _push, _parent);
  Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_0__["ssrRenderSlot"])(_ctx.$slots, "cssInject", {}, null, _push, _parent);
  _push("</head><body><div id=\"app\">");
  Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_0__["ssrRenderSlot"])(_ctx.$slots, "children", {}, null, _push, _parent);
  _push("</div>");
  Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_0__["ssrRenderSlot"])(_ctx.$slots, "initialData", {}, null, _push, _parent);
  Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_0__["ssrRenderSlot"])(_ctx.$slots, "customeFooterScript", {}, null, _push, _parent);
  Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_0__["ssrRenderSlot"])(_ctx.$slots, "jsInject", {}, null, _push, _parent);
  _push("</body></html><!--]-->");
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/dist/templateLoader.js?!./node_modules/vue-loader/dist/index.js?!./web/pages/index/node/render$node.vue?vue&type=template&id=303ac118&ts=true":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/dist/templateLoader.js??ref--5-0!./node_modules/vue-loader/dist??ref--5-0!./web/pages/index/node/render$node.vue?vue&type=template&id=303ac118&ts=true ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! exports provided: ssrRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ssrRender", function() { return ssrRender; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue/server-renderer */ "vue/server-renderer");
/* harmony import */ var vue_server_renderer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__);


function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push("<div".concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderAttrs"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
    id: "main"
  }, _attrs)), "></div>"));
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/dist/templateLoader.js?!./node_modules/vue-loader/dist/index.js?!./web/pages/index/render.vue?vue&type=template&id=6781c9f2&ts=true":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--0-0!./node_modules/vue-loader/dist/templateLoader.js??ref--5-0!./node_modules/vue-loader/dist??ref--5-0!./web/pages/index/render.vue?vue&type=template&id=6781c9f2&ts=true ***!
  \************************************************************************************************************************************************************************************************************************/
/*! exports provided: ssrRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ssrRender", function() { return ssrRender; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue/server-renderer */ "vue/server-renderer");
/* harmony import */ var vue_server_renderer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__);


function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push("<div".concat(Object(vue_server_renderer__WEBPACK_IMPORTED_MODULE_1__["ssrRenderAttrs"])(Object(vue__WEBPACK_IMPORTED_MODULE_0__["mergeProps"])({
    id: "main"
  }, _attrs)), "></div>"));
}

/***/ }),

/***/ "./node_modules/ssr-mini-css-extract-plugin/dist/loader.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js?!./node_modules/less-loader/dist/cjs.js?!./node_modules/vue-loader/dist/index.js?!./web/components/layout/App.vue?vue&type=style&index=0&id=185cf71c&lang=less":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/ssr-mini-css-extract-plugin/dist/loader.js??ref--7-0!./node_modules/css-loader/dist/cjs.js??ref--7-1!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??ref--7-2!./node_modules/less-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/dist??ref--5-0!./web/components/layout/App.vue?vue&type=style&index=0&id=185cf71c&lang=less ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/ssr-plugin-vue3/cjs/entry/combine-router.js":
/*!******************************************************************!*\
  !*** ./node_modules/ssr-plugin-vue3/cjs/entry/combine-router.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Routes = void 0;
var declareRoutes = __webpack_require__(/*! _build/ssr-declare-routes */ "./build/ssr-declare-routes.js");
var ManualRoutes = __webpack_require__(/*! _build/ssr-manual-routes */ "./build/ssr-manual-routes.js");
var ssr_common_utils_1 = __webpack_require__(/*! ssr-common-utils */ "ssr-common-utils");
var Routes = (0, ssr_common_utils_1.combineRoutes)(declareRoutes, ManualRoutes);
exports.Routes = Routes;

/***/ }),

/***/ "./node_modules/ssr-plugin-vue3/cjs/entry/create.js":
/*!**********************************************************!*\
  !*** ./node_modules/ssr-plugin-vue3/cjs/entry/create.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVNode = exports.getInlineVNode = exports.createStore = exports.createRouter = void 0;
var ssr_deepclone_1 = __webpack_require__(/*! ssr-deepclone */ "ssr-deepclone");
var vue_1 = __webpack_require__(/*! vue */ "vue");
var vue_router_1 = __webpack_require__(/*! vue-router */ "vue-router");
var vuex_1 = __webpack_require__(/*! vuex */ "vuex");
var combine_router_1 = __webpack_require__(/*! ./combine-router */ "./node_modules/ssr-plugin-vue3/cjs/entry/combine-router.js");
var _combine_router_1$Rou = combine_router_1.Routes,
  store = _combine_router_1$Rou.store,
  FeRoutes = _combine_router_1$Rou.FeRoutes;
function createRouter() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _a;
  var base = (_a = options.base) !== null && _a !== void 0 ? _a : '/';
  var hashRouter = options.hashRouter;
  return (0, vue_router_1.createRouter)({
    history:  false ? undefined : (0, vue_router_1.createMemoryHistory)(),
    routes: FeRoutes
  });
}
exports.createRouter = createRouter;
function createStore() {
  return (0, vuex_1.createStore)((0, ssr_deepclone_1.deepClone)(store));
}
exports.createStore = createStore;
var getInlineVNode = function getInlineVNode(arr, type, isVite) {
  return arr.map(function (item) {
    return (0, vue_1.h)(type, {
      innerHTML: item,
      type: isVite ? 'module' : undefined
    });
  });
};
exports.getInlineVNode = getInlineVNode;
var getVNode = function getVNode(arr) {
  return arr.map(function (item) {
    var _a;
    return (0, vue_1.h)((_a = item.tagName) !== null && _a !== void 0 ? _a : 'script', Object.assign({}, item.describe, {
      innerHTML: item.content
    }));
  });
};
exports.getVNode = getVNode;

/***/ }),

/***/ "./node_modules/ssr-plugin-vue3/cjs/entry/server-entry.js":
/*!****************************************************************!*\
  !*** ./node_modules/ssr-plugin-vue3/cjs/entry/server-entry.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regeneratorRuntime = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
var _slicedToArray = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
var _asyncToGenerator = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Routes = exports.serverRender = void 0;
var server_renderer_1 = __webpack_require__(/*! @vue/server-renderer */ "@vue/server-renderer");
var pinia_1 = __webpack_require__(/*! pinia */ "pinia");
var ssr_common_utils_1 = __webpack_require__(/*! ssr-common-utils */ "ssr-common-utils");
var ssr_serialize_javascript_1 = __webpack_require__(/*! ssr-serialize-javascript */ "ssr-serialize-javascript");
var vue_1 = __webpack_require__(/*! vue */ "vue");
var combine_router_1 = __webpack_require__(/*! ./combine-router */ "./node_modules/ssr-plugin-vue3/cjs/entry/combine-router.js");
Object.defineProperty(exports, "Routes", {
  enumerable: true,
  get: function get() {
    return combine_router_1.Routes;
  }
});
var create_1 = __webpack_require__(/*! ./create */ "./node_modules/ssr-plugin-vue3/cjs/entry/create.js");
var _combine_router_1$Rou = combine_router_1.Routes,
  FeRoutes = _combine_router_1$Rou.FeRoutes,
  App = _combine_router_1$Rou.App,
  layoutFetch = _combine_router_1$Rou.layoutFetch,
  Layout = _combine_router_1$Rou.Layout;
var staticConfig = (0, ssr_common_utils_1.getStaticConfig)();
var serverRender = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee3(ctx, config) {
    var _a, mode, customeHeadScript, customeFooterScript, parallelFetch, prefix, isVite, isDev, fePort, https, clientPrefix, stream, rootId, bigpipe, hashRouter, clientHistoryRouterMode, asyncGlobalData, store, router, pinia, rawPath, _ref2, path, url, routeItem, getApp, fn, res;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          mode = config.mode, customeHeadScript = config.customeHeadScript, customeFooterScript = config.customeFooterScript, parallelFetch = config.parallelFetch, prefix = config.prefix, isVite = config.isVite, isDev = config.isDev, fePort = config.fePort, https = config.https, clientPrefix = config.clientPrefix, stream = config.stream, rootId = config.rootId, bigpipe = config.bigpipe, hashRouter = config.hashRouter, clientHistoryRouterMode = config.clientHistoryRouterMode, asyncGlobalData = config.asyncGlobalData;
          store = (0, create_1.createStore)();
          router = (0, create_1.createRouter)();
          pinia = (0, pinia_1.createPinia)();
          rawPath = (_a = ctx.request.path) !== null && _a !== void 0 ? _a : ctx.request.url;
          _ref2 = [(0, ssr_common_utils_1.normalizePath)(rawPath, prefix), (0, ssr_common_utils_1.normalizePath)(ctx.request.url, prefix)], path = _ref2[0], url = _ref2[1];
          routeItem = (0, ssr_common_utils_1.findRoute)(FeRoutes, path);
          (0, ssr_common_utils_1.checkRoute)({
            routeItem: routeItem,
            path: path
          });
          getApp = function getApp(_ref3) {
            var combineAysncData = _ref3.combineAysncData,
              state = _ref3.state,
              layoutFetchData = _ref3.layoutFetchData,
              asyncData = _ref3.asyncData,
              manifest = _ref3.manifest,
              isCsr = _ref3.isCsr,
              _jsInject = _ref3.jsInject,
              _cssInject = _ref3.cssInject,
              inlineCssOrder = _ref3.inlineCssOrder,
              rootId = _ref3.rootId,
              inlineJsOrder = _ref3.inlineJsOrder;
            var app = (0, vue_1.createSSRApp)({
              render: function render() {
                var _this = this;
                var ssrDevInfo = {
                  manifest: isDev ? manifest : '',
                  rootId: rootId,
                  fePort: isDev ? fePort : '',
                  https: isDev ? https : ''
                };
                var innerHTML = (0, ssr_common_utils_1.splitPageInfo)({
                  'window.__USE_SSR__': !isCsr,
                  'window.__INITIAL_DATA__': isCsr ? {} : (0, ssr_serialize_javascript_1.serialize)(state),
                  'window.__INITIAL_PINIA_DATA__': isCsr ? {} : (0, ssr_serialize_javascript_1.serialize)(pinia.state.value),
                  'window.__USE_VITE__': isVite,
                  'window.prefix': "\"".concat(prefix, "\""),
                  'window.clientHistoryRouterMode': "\"".concat(clientHistoryRouterMode, "\""),
                  'window.clientPrefix': "\"".concat(clientPrefix !== null && clientPrefix !== void 0 ? clientPrefix : '', "\""),
                  'window.ssrDevInfo': JSON.stringify(ssrDevInfo),
                  'window.hashRouter': Boolean(hashRouter)
                });
                var _initialData = (0, vue_1.h)('script', {
                  innerHTML: innerHTML
                });
                var _children = bigpipe ? '' : (0, vue_1.h)(App, {
                  ctx: ctx,
                  config: config,
                  asyncData: asyncData,
                  fetchData: combineAysncData,
                  reactiveFetchData: {
                    value: combineAysncData
                  },
                  ssrApp: app
                });
                var customeHeadScriptArr = (0, create_1.getVNode)((0, ssr_common_utils_1.getUserScriptVue)({
                  script: customeHeadScript,
                  ctx: ctx,
                  position: 'header',
                  staticConfig: staticConfig
                })).concat((0, create_1.getInlineVNode)(inlineCssOrder, 'style', isVite));
                var customeFooterScriptArr = (0, create_1.getVNode)((0, ssr_common_utils_1.getUserScriptVue)({
                  script: customeFooterScript,
                  ctx: ctx,
                  position: 'footer',
                  staticConfig: staticConfig
                })).concat((0, create_1.getInlineVNode)(inlineJsOrder, 'script', isVite));
                return (0, vue_1.h)(Layout, {
                  ctx: ctx,
                  config: config,
                  asyncData: asyncData,
                  fetchData: layoutFetchData,
                  reactiveFetchData: {
                    value: layoutFetchData
                  }
                }, {
                  remInitial: function remInitial() {
                    return (0, vue_1.h)('script', {
                      innerHTML: ssr_common_utils_1.remInitial
                    });
                  },
                  customeHeadScript: function customeHeadScript() {
                    return customeHeadScriptArr;
                  },
                  customeFooterScript: function customeFooterScript() {
                    return customeFooterScriptArr;
                  },
                  children: function children() {
                    return _children;
                  },
                  initialData: function initialData() {
                    return _initialData;
                  },
                  cssInject: function cssInject() {
                    return _cssInject;
                  },
                  jsInject: function jsInject() {
                    return _jsInject;
                  },
                  injectHeader: function injectHeader() {
                    return [customeHeadScriptArr, _cssInject];
                  },
                  content: function content() {
                    return [(0, vue_1.h)('div', {
                      id: rootId.replace('#', '')
                    }, (0, vue_1.renderSlot)(_this.$slots, 'default', {}, function () {
                      return [_children];
                    })), _initialData, customeFooterScriptArr, _jsInject];
                  }
                });
              }
            });
            return app;
          };
          fn = /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
              var _a, _b, _c, fetch, webpackChunkName, dynamicCssOrder, dynamicJsOrder, manifest, _yield, inlineCssOrder, extraCssOrder, inlineJsOrder, extraJsOrder, isCsr, cssInject, jsInject, layoutFetchData, fetchData, currentFetch, value, lF, CF, _ref5, _ref6, combineAysncData, asyncData, state, app, res;
              return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    fetch = routeItem.fetch, webpackChunkName = routeItem.webpackChunkName;
                    _context2.next = 3;
                    return (0, ssr_common_utils_1.getAsyncCssChunk)(ctx, webpackChunkName, config);
                  case 3:
                    dynamicCssOrder = _context2.sent;
                    _context2.next = 6;
                    return (0, ssr_common_utils_1.getAsyncJsChunk)(ctx, webpackChunkName, config);
                  case 6:
                    dynamicJsOrder = _context2.sent;
                    _context2.next = 9;
                    return (0, ssr_common_utils_1.getManifest)(config);
                  case 9:
                    manifest = _context2.sent;
                    _context2.next = 12;
                    return (0, ssr_common_utils_1.getInlineOrder)({
                      dynamicCssOrder: dynamicCssOrder,
                      dynamicJsOrder: dynamicJsOrder,
                      manifest: manifest,
                      config: config,
                      type: 'vue3'
                    });
                  case 12:
                    _yield = _context2.sent;
                    inlineCssOrder = _yield.inlineCssOrder;
                    extraCssOrder = _yield.extraCssOrder;
                    inlineJsOrder = _yield.inlineJsOrder;
                    extraJsOrder = _yield.extraJsOrder;
                    isCsr = !!(mode === 'csr' || ((_a = ctx.request.query) === null || _a === void 0 ? void 0 : _a.csr));
                    cssInject = isVite && isDev ? [(0, vue_1.h)('script', {
                      type: 'module',
                      src: '/@vite/client'
                    })] : extraCssOrder.map(function (css) {
                      return manifest[css];
                    }).filter(Boolean).map(function (css) {
                      return (0, vue_1.h)('link', {
                        rel: 'stylesheet',
                        href: css
                      });
                    });
                    if (!clientPrefix) {
                      cssInject = cssInject.concat(isVite && isDev ? [] : extraJsOrder.map(function (js) {
                        return manifest[js];
                      }).filter(Boolean).map(function (js) {
                        return (0, vue_1.h)('link', {
                          href: js,
                          as: 'script',
                          rel: isVite ? 'modulepreload' : 'preload'
                        });
                      }));
                    }
                    jsInject = isVite && isDev ? [(0, vue_1.h)('script', {
                      type: 'module',
                      src: '/node_modules/ssr-plugin-vue3/esm/entry/client-entry.js'
                    })] : extraJsOrder.map(function (js) {
                      return manifest[js];
                    }).filter(Boolean).map(function (js) {
                      return (0, vue_1.h)('script', {
                        src: js,
                        type: isVite ? 'module' : 'text/javascript'
                      });
                    });
                    layoutFetchData = {}, fetchData = {};
                    if (!(!isCsr && !bigpipe)) {
                      _context2.next = 56;
                      break;
                    }
                    // not fetch when generate <head>
                    router.push(url);
                    _context2.next = 26;
                    return router.isReady();
                  case 26:
                    if (!fetch) {
                      _context2.next = 32;
                      break;
                    }
                    _context2.next = 29;
                    return fetch();
                  case 29:
                    _context2.t0 = _context2.sent["default"];
                    _context2.next = 33;
                    break;
                  case 32:
                    _context2.t0 = null;
                  case 33:
                    currentFetch = _context2.t0;
                    value = router.currentRoute.value;
                    lF = layoutFetch ? layoutFetch({
                      store: store,
                      router: value,
                      ctx: ctx,
                      pinia: pinia
                    }, ctx) : Promise.resolve({});
                    CF = currentFetch ? currentFetch({
                      store: store,
                      router: value,
                      ctx: ctx,
                      pinia: pinia
                    }, ctx) : Promise.resolve({});
                    if (!parallelFetch) {
                      _context2.next = 43;
                      break;
                    }
                    _context2.next = 40;
                    return Promise.all([lF, CF]);
                  case 40:
                    _context2.t1 = _context2.sent;
                    _context2.next = 50;
                    break;
                  case 43:
                    _context2.next = 45;
                    return lF;
                  case 45:
                    _context2.t2 = _context2.sent;
                    _context2.next = 48;
                    return CF;
                  case 48:
                    _context2.t3 = _context2.sent;
                    _context2.t1 = [_context2.t2, _context2.t3];
                  case 50:
                    _ref5 = _context2.t1;
                    _ref6 = _slicedToArray(_ref5, 2);
                    layoutFetchData = _ref6[0];
                    fetchData = _ref6[1];
                    _context2.next = 57;
                    break;
                  case 56:
                    (0, ssr_common_utils_1.logGreen)("Current path ".concat(path, " use csr render mode"));
                  case 57:
                    combineAysncData = Object.assign({}, layoutFetchData !== null && layoutFetchData !== void 0 ? layoutFetchData : {}, fetchData !== null && fetchData !== void 0 ? fetchData : {});
                    asyncData = {
                      value: combineAysncData
                    };
                    state = Object.assign({}, (_b = store.state) !== null && _b !== void 0 ? _b : {}, asyncData.value);
                    app = getApp({
                      state: state,
                      asyncData: asyncData,
                      layoutFetchData: layoutFetchData,
                      combineAysncData: combineAysncData,
                      manifest: manifest,
                      jsInject: jsInject,
                      cssInject: cssInject,
                      isCsr: isCsr,
                      inlineCssOrder: inlineCssOrder,
                      inlineJsOrder: inlineJsOrder,
                      rootId: rootId
                    });
                    app.config.errorHandler = (_c = app.config.errorHandler) !== null && _c !== void 0 ? _c : function (e) {
                      throw e;
                    };
                    app.use(router);
                    app.use(store);
                    app.use(pinia);
                    _context2.next = 67;
                    return ssr_common_utils_1.appLocalStoreageWrapper.run({
                      app: app
                    }, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                      var teleportsContext, html;
                      return _regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) switch (_context.prev = _context.next) {
                          case 0:
                            if (!stream) {
                              _context.next = 4;
                              break;
                            }
                            return _context.abrupt("return", (0, server_renderer_1.renderToNodeStream)(app));
                          case 4:
                            teleportsContext = {};
                            _context.next = 7;
                            return (0, server_renderer_1.renderToString)(app, teleportsContext);
                          case 7:
                            html = _context.sent;
                            return _context.abrupt("return", {
                              html: html,
                              teleportsContext: teleportsContext
                            });
                          case 9:
                          case "end":
                            return _context.stop();
                        }
                      }, _callee);
                    })));
                  case 67:
                    res = _context2.sent;
                    return _context2.abrupt("return", res);
                  case 69:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function fn() {
              return _ref4.apply(this, arguments);
            };
          }();
          store.state.asyncGlobalData = asyncGlobalData;
          _context3.next = 13;
          return ssr_common_utils_1.localStorageWrapper.run({
            pinia: pinia,
            store: store,
            ctx: ctx
          }, fn);
        case 13:
          res = _context3.sent;
          return _context3.abrupt("return", res);
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function serverRender(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.serverRender = serverRender;

/***/ }),

/***/ "./node_modules/vant/lib/badge/index.css":
/*!***********************************************!*\
  !*** ./node_modules/vant/lib/badge/index.css ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/vant/lib/button/index.css":
/*!************************************************!*\
  !*** ./node_modules/vant/lib/button/index.css ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/vant/lib/button/style/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/vant/lib/button/style/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../style/base.css */ "./node_modules/vant/lib/style/base.css");
__webpack_require__(/*! ../../badge/index.css */ "./node_modules/vant/lib/badge/index.css");
__webpack_require__(/*! ../../icon/index.css */ "./node_modules/vant/lib/icon/index.css");
__webpack_require__(/*! ../../loading/index.css */ "./node_modules/vant/lib/loading/index.css");
__webpack_require__(/*! ../index.css */ "./node_modules/vant/lib/button/index.css");


/***/ }),

/***/ "./node_modules/vant/lib/cell/index.css":
/*!**********************************************!*\
  !*** ./node_modules/vant/lib/cell/index.css ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/vant/lib/dropdown-item/index.css":
/*!*******************************************************!*\
  !*** ./node_modules/vant/lib/dropdown-item/index.css ***!
  \*******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/vant/lib/dropdown-item/style/index.js":
/*!************************************************************!*\
  !*** ./node_modules/vant/lib/dropdown-item/style/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../style/base.css */ "./node_modules/vant/lib/style/base.css");
__webpack_require__(/*! ../../badge/index.css */ "./node_modules/vant/lib/badge/index.css");
__webpack_require__(/*! ../../icon/index.css */ "./node_modules/vant/lib/icon/index.css");
__webpack_require__(/*! ../../cell/index.css */ "./node_modules/vant/lib/cell/index.css");
__webpack_require__(/*! ../../overlay/index.css */ "./node_modules/vant/lib/overlay/index.css");
__webpack_require__(/*! ../../popup/index.css */ "./node_modules/vant/lib/popup/index.css");
__webpack_require__(/*! ../../dropdown-menu/index.css */ "./node_modules/vant/lib/dropdown-menu/index.css");
__webpack_require__(/*! ../index.css */ "./node_modules/vant/lib/dropdown-item/index.css");


/***/ }),

/***/ "./node_modules/vant/lib/dropdown-menu/index.css":
/*!*******************************************************!*\
  !*** ./node_modules/vant/lib/dropdown-menu/index.css ***!
  \*******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/vant/lib/dropdown-menu/style/index.js":
/*!************************************************************!*\
  !*** ./node_modules/vant/lib/dropdown-menu/style/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../style/base.css */ "./node_modules/vant/lib/style/base.css");
__webpack_require__(/*! ../index.css */ "./node_modules/vant/lib/dropdown-menu/index.css");


/***/ }),

/***/ "./node_modules/vant/lib/field/index.css":
/*!***********************************************!*\
  !*** ./node_modules/vant/lib/field/index.css ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/vant/lib/field/style/index.js":
/*!****************************************************!*\
  !*** ./node_modules/vant/lib/field/style/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../style/base.css */ "./node_modules/vant/lib/style/base.css");
__webpack_require__(/*! ../../badge/index.css */ "./node_modules/vant/lib/badge/index.css");
__webpack_require__(/*! ../../icon/index.css */ "./node_modules/vant/lib/icon/index.css");
__webpack_require__(/*! ../../cell/index.css */ "./node_modules/vant/lib/cell/index.css");
__webpack_require__(/*! ../index.css */ "./node_modules/vant/lib/field/index.css");


/***/ }),

/***/ "./node_modules/vant/lib/icon/index.css":
/*!**********************************************!*\
  !*** ./node_modules/vant/lib/icon/index.css ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/vant/lib/loading/index.css":
/*!*************************************************!*\
  !*** ./node_modules/vant/lib/loading/index.css ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/vant/lib/loading/style/index.js":
/*!******************************************************!*\
  !*** ./node_modules/vant/lib/loading/style/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../style/base.css */ "./node_modules/vant/lib/style/base.css");
__webpack_require__(/*! ../index.css */ "./node_modules/vant/lib/loading/index.css");


/***/ }),

/***/ "./node_modules/vant/lib/notify/index.css":
/*!************************************************!*\
  !*** ./node_modules/vant/lib/notify/index.css ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/vant/lib/notify/style/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/vant/lib/notify/style/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../style/base.css */ "./node_modules/vant/lib/style/base.css");
__webpack_require__(/*! ../../badge/index.css */ "./node_modules/vant/lib/badge/index.css");
__webpack_require__(/*! ../../icon/index.css */ "./node_modules/vant/lib/icon/index.css");
__webpack_require__(/*! ../../overlay/index.css */ "./node_modules/vant/lib/overlay/index.css");
__webpack_require__(/*! ../../popup/index.css */ "./node_modules/vant/lib/popup/index.css");
__webpack_require__(/*! ../index.css */ "./node_modules/vant/lib/notify/index.css");


/***/ }),

/***/ "./node_modules/vant/lib/overlay/index.css":
/*!*************************************************!*\
  !*** ./node_modules/vant/lib/overlay/index.css ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/vant/lib/popover/index.css":
/*!*************************************************!*\
  !*** ./node_modules/vant/lib/popover/index.css ***!
  \*************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/vant/lib/popover/style/index.js":
/*!******************************************************!*\
  !*** ./node_modules/vant/lib/popover/style/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../style/base.css */ "./node_modules/vant/lib/style/base.css");
__webpack_require__(/*! ../../badge/index.css */ "./node_modules/vant/lib/badge/index.css");
__webpack_require__(/*! ../../icon/index.css */ "./node_modules/vant/lib/icon/index.css");
__webpack_require__(/*! ../../overlay/index.css */ "./node_modules/vant/lib/overlay/index.css");
__webpack_require__(/*! ../../popup/index.css */ "./node_modules/vant/lib/popup/index.css");
__webpack_require__(/*! ../index.css */ "./node_modules/vant/lib/popover/index.css");


/***/ }),

/***/ "./node_modules/vant/lib/popup/index.css":
/*!***********************************************!*\
  !*** ./node_modules/vant/lib/popup/index.css ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/vant/lib/style/base.css":
/*!**********************************************!*\
  !*** ./node_modules/vant/lib/style/base.css ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/vue-loader/dist/exportHelper.js":
/*!******************************************************!*\
  !*** ./node_modules/vue-loader/dist/exportHelper.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
Object.defineProperty(exports, "__esModule", {
  value: true
});
// runtime helper for setting properties on components
// in a tree-shakable way
exports["default"] = function (sfc, props) {
  var target = sfc.__vccOpts || sfc;
  var _iterator = _createForOfIteratorHelper(props),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
        key = _step$value[0],
        val = _step$value[1];
      target[key] = val;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return target;
};

/***/ }),

/***/ "./web/analyze.ts":
/*!************************!*\
  !*** ./web/analyze.ts ***!
  \************************/
/*! exports provided: NAME_PROPERTY, analyzeSingle, unitConvert, analyzeCompare, isNativeSource, memoryPercent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NAME_PROPERTY", function() { return NAME_PROPERTY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "analyzeSingle", function() { return analyzeSingle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unitConvert", function() { return unitConvert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "analyzeCompare", function() { return analyzeCompare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNativeSource", function() { return isNativeSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "memoryPercent", function() { return memoryPercent; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var NAME_PROPERTY = ["system / Map", "Array", "Object", "symbol"];
var analyzeSingle = function analyzeSingle(params) {
  var type = params.type,
    data = params.data;
  if (type === 'panel') {
    return analyzeStatistic(data);
  } else {
    var _analyzeStatistic = analyzeStatistic(data),
      sortByCount = _analyzeStatistic.sortByCount,
      sortRetainedSize = _analyzeStatistic.sortRetainedSize;
    var text = "\n              JS \u5C42\u91CD\u590D\u8282\u70B9\n      ".concat(sortByCount.map(function (item) {
      return "\u8282\u70B9\u540D\u79F0: ".concat(item.name, ", \u91CD\u590D\u6B21\u6570: ").concat(item.count, ",\u5171\u5360\u7528\u5185\u5B58 ").concat(unitConvert(item.shallowSize), "\n              ").concat(getSource(item.sourceString), "\n              ");
    }).join("\n      "), "\n              JS\u5C42\u81EA\u8EAB\u5185\u5B58\u6BD4\u53EFGC\u5185\u5B58\u6BD4\u4F8B\u6700\u5927\u8282\u70B9\uFF1A\n      ").concat(sortRetainedSize.map(function (item) {
      return "\u8282\u70B9\u540D\u79F0: ".concat(item.name, "@").concat(item.id, ",GC\u540E\u53EF\u91CA\u653E ").concat(unitConvert(item.retained_size), "\uFF0C\u5360\u7528\u5185\u5B58").concat(item.percent, ", \u53EFGC\u5185\u5B58\u500D\u6570").concat(item.pt, "\u500D\n              \u5B58\u5728\u4E8E\u6587\u4EF6 ").concat(item.source, "\n              ");
    }).join("\n      "), "\n      ");
    return text;
  }
};
var getSource = function getSource(sourceString) {
  if (sourceString.includes('<br />')) {
    return "\n            \u5B58\u5728\u4E8E\u591A\u4E2A\u6587\u4EF6 ".concat(sourceString.split('<br />').join("\n    ").replace('<br/>', ''), "\n    ");
  } else {
    return "\n            \u4EC5\u5B58\u5728\u4E8E\u6587\u4EF6 ".concat(sourceString, "\uFF0C\u7591\u4F3C\u5B58\u5728\u5185\u5B58\u6CC4\u6F0F\n    ");
  }
};
var oneKb = 1024;
var oneMb = 1024 * 1024;
var unitConvert = function unitConvert(_byte) {
  var val = Number(_byte);
  if (val > 5 * oneMb) {
    return byteToMb(_byte);
  }
  if (val > oneKb) {
    return (val / oneKb).toFixed(2) + 'kb';
  } else {
    return val + 'byte';
  }
};
var byteToMb = function byteToMb(_byte2) {
  var val = Number(_byte2);
  return (val / oneMb).toFixed(2) + 'mb';
};
var analyzeCompare = function analyzeCompare(before, now, type) {
  var _parseMultiply = parseMultiply([before, now]),
    _parseMultiply2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_parseMultiply, 2),
    additionalNode = _parseMultiply2[0],
    biggerNode = _parseMultiply2[1];
  var additionalStatistic = analyzeStatistic(additionalNode);
  var biggerStatistic = analyzeStatistic(biggerNode);
  if (type === 'panel') {
    return {
      additionalNode: additionalNode,
      biggerNode: biggerNode,
      additionalStatistic: additionalStatistic,
      biggerStatistic: biggerStatistic
    };
  } else {
    var sortByCount = additionalStatistic.sortByCount,
      sortRetainedSize = additionalStatistic.sortRetainedSize;
    var biggerSortRetainedSize = biggerStatistic.sortRetainedSize;
    var text = "\n              \u65B0\u589E\u8282\u70B9\u4E2DJS\u5C42\u91CD\u590D\u8282\u70B9\n      ".concat(sortByCount.map(function (item) {
      return "\n              \u8282\u70B9\u540D\u79F0: ".concat(item.name, ", \u65B0\u589E\u6B21\u6570 ").concat(item.count, "\uFF0C\u5171\u5360\u7528\u5185\u5B58 ").concat(unitConvert(item.shallowSize), "\n              ").concat(getSource(item.sourceString), "\n              ");
    }).join("\n      "), "\n              \u65B0\u589E\u8282\u70B9\u4E2DJS\u5C42\u5360\u7528\u5185\u5B58\u6700\u5927\u8282\u70B9\n      ").concat(sortRetainedSize.map(function (item) {
      return "\n              \u8282\u70B9\u540D\u79F0: ".concat(item.name, "@").concat(item.id, ",\u53EF\u91CA\u653E\u5927\u5C0F\u5927\u5C0F").concat(unitConvert(item.retained_size), ", \u53EF\u91CA\u653E\u5927\u5C0F\u5360\u603B\u5185\u5B58").concat(item.percent, "\n              \u4F4D\u4E8E\u6587\u4EF6 ").concat(item.source, "\n              ");
    }).join("\n      "), "\n              \u589E\u5927\u8282\u70B9\u4E2DJS\u5C42\u5360\u7528\u5185\u5B58\u6700\u5927\u8282\u70B9\n      ").concat(biggerSortRetainedSize.map(function (item) {
      var _item$bigger_number;
      return "\n              \u8282\u70B9\u540D\u79F0: ".concat(item.name, "@").concat(item.id, ",\u589E\u957F\u5927\u5C0F").concat(unitConvert((_item$bigger_number = item.bigger_number) !== null && _item$bigger_number !== void 0 ? _item$bigger_number : 0), ", \u53EF\u91CA\u653E\u5927\u5C0F\u5360\u603B\u5185\u5B58").concat(item.percent, "\n              \u4F4D\u4E8E\u6587\u4EF6 ").concat(item.source, "\n              ");
    }).join("\n      "), "\n      ");
    console.log(text);
    return text;
  }
};
var parseMultiply = function parseMultiply(arr) {
  var additionalNode = [];
  var biggerNode = [];
  var _ref = [arr[0], arr[1]],
    smallRes = _ref[0],
    bigRes = _ref[1];
  var smallNodeMap = {};
  smallRes.forEach(function (smallNode) {
    smallNodeMap[smallNode.id] = smallNode.retained_size;
  });
  var _iterator = _createForOfIteratorHelper(bigRes),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var bigNode = _step.value;
      var bigNodeId = bigNode.id;
      if (!smallNodeMap[bigNodeId]) {
        // 新增节点
        bigNode.compare_type = 'addtional';
        additionalNode.push(bigNode);
      } else {
        // 相同 id 的节点 retained_size 发生变化的
        if (bigNode.retained_size > smallNodeMap[bigNodeId]) {
          bigNode.compare_type = 'bigger';
          bigNode.bigger_number = bigNode.retained_size - smallNodeMap[bigNodeId];
          biggerNode.push(bigNode);
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return [additionalNode, biggerNode];
};
var isNativeSource = function isNativeSource(source) {
  return source.startsWith('node:') || source.startsWith('internal/');
};
var pushDetail = function pushDetail(obj, node, type) {
  var _obj$key$source;
  var key = node[type];
  var source = (_obj$key$source = obj[key].source) !== null && _obj$key$source !== void 0 ? _obj$key$source : [];
  if (!source.includes(node.source)) {
    var _obj$key$source2;
    (_obj$key$source2 = obj[key].source) === null || _obj$key$source2 === void 0 ? void 0 : _obj$key$source2.push(node.source);
  }
  obj[key].count = obj[key].count + 1;
  obj[key].shallowSize = obj[key].shallowSize + node.size;
  obj[key].retainedSize = obj[key].retainedSize + node.retained_size;
};
var memoryPercent = function memoryPercent(node, root) {
  return (node.retained_size / root.retained_size * 100).toFixed(2) + '%';
};
var analyzeStatistic = function analyzeStatistic(data) {
  var countObj = {};
  data.forEach(function (node) {
    if (node.source && node.name && !isNativeSource(node.source)) {
      if (!countObj[node.name]) {
        countObj[node.name] = {
          name: node.name,
          source: [node.source],
          sourceString: '',
          count: 1,
          shallowSize: node.size,
          retainedSize: node.retained_size
        };
      } else {
        pushDetail(countObj, node, 'name');
      }
    }
  });
  var arr = [];
  Object.values(countObj).forEach(function (item) {
    if (item.source && item.source.length > 5) {
      item.source = item.source.slice(0, 5);
      item.sourceString = item.source.join('<br />') + '<br/>...';
    } else {
      var _item$source$join, _item$source;
      item.sourceString = (_item$source$join = (_item$source = item.source) === null || _item$source === void 0 ? void 0 : _item$source.join('<br />')) !== null && _item$source$join !== void 0 ? _item$source$join : '';
    }
    delete item.source;
    arr.push(item);
  });
  return {
    is: true,
    sortByCount: arr.sort(function (a, b) {
      return b.count - a.count;
    }).slice(0, 5),
    sortRetainedSize: data.filter(function (item) {
      var _item$source2;
      return ((_item$source2 = item.source) === null || _item$source2 === void 0 ? void 0 : _item$source2.length) && !isNativeSource(item.source);
    }).slice(0, 5).map(function (item) {
      item.percent = memoryPercent(item, data[0]);
      return item;
    })
  };
};

/***/ }),

/***/ "./web/components/layout/App.vue":
/*!***************************************!*\
  !*** ./web/components/layout/App.vue ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_template_id_185cf71c_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=185cf71c&ts=true */ "./web/components/layout/App.vue?vue&type=template&id=185cf71c&ts=true");
/* harmony import */ var _App_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=ts&setup=true */ "./web/components/layout/App.vue?vue&type=script&lang=ts&setup=true");
/* empty/unused harmony star reexport *//* harmony import */ var _App_vue_vue_type_style_index_0_id_185cf71c_lang_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&id=185cf71c&lang=less */ "./web/components/layout/App.vue?vue&type=style&index=0&id=185cf71c&lang=less");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__);







const __exports__ = /*#__PURE__*/_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3___default()(_App_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_1__["default"], [['ssrRender',_App_vue_vue_type_template_id_185cf71c_ts_true__WEBPACK_IMPORTED_MODULE_0__["ssrRender"]],['__file',"web/components/layout/App.vue"]])

/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./web/components/layout/App.vue?vue&type=script&lang=ts&setup=true":
/*!**************************************************************************!*\
  !*** ./web/components/layout/App.vue?vue&type=script&lang=ts&setup=true ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_babel_loader_lib_index_js_ref_2_0_node_modules_vue_loader_dist_index_js_ref_5_0_App_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--0-0!../../../node_modules/babel-loader/lib??ref--2-0!../../../node_modules/vue-loader/dist??ref--5-0!./App.vue?vue&type=script&lang=ts&setup=true */ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/dist/index.js?!./web/components/layout/App.vue?vue&type=script&lang=ts&setup=true");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_babel_loader_lib_index_js_ref_2_0_node_modules_vue_loader_dist_index_js_ref_5_0_App_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* empty/unused harmony star reexport */ 

/***/ }),

/***/ "./web/components/layout/App.vue?vue&type=style&index=0&id=185cf71c&lang=less":
/*!************************************************************************************!*\
  !*** ./web/components/layout/App.vue?vue&type=style&index=0&id=185cf71c&lang=less ***!
  \************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ssr_mini_css_extract_plugin_dist_loader_js_ref_7_0_node_modules_css_loader_dist_cjs_js_ref_7_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_ref_7_2_node_modules_less_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_dist_index_js_ref_5_0_App_vue_vue_type_style_index_0_id_185cf71c_lang_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ssr-mini-css-extract-plugin/dist/loader.js??ref--7-0!../../../node_modules/css-loader/dist/cjs.js??ref--7-1!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??ref--7-2!../../../node_modules/less-loader/dist/cjs.js??ref--7-3!../../../node_modules/vue-loader/dist??ref--5-0!./App.vue?vue&type=style&index=0&id=185cf71c&lang=less */ "./node_modules/ssr-mini-css-extract-plugin/dist/loader.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js?!./node_modules/less-loader/dist/cjs.js?!./node_modules/vue-loader/dist/index.js?!./web/components/layout/App.vue?vue&type=style&index=0&id=185cf71c&lang=less");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./web/components/layout/App.vue?vue&type=template&id=185cf71c&ts=true":
/*!*****************************************************************************!*\
  !*** ./web/components/layout/App.vue?vue&type=template&id=185cf71c&ts=true ***!
  \*****************************************************************************/
/*! exports provided: ssrRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_dist_templateLoader_js_ref_5_0_node_modules_vue_loader_dist_index_js_ref_5_0_App_vue_vue_type_template_id_185cf71c_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--0-0!../../../node_modules/vue-loader/dist/templateLoader.js??ref--5-0!../../../node_modules/vue-loader/dist??ref--5-0!./App.vue?vue&type=template&id=185cf71c&ts=true */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/dist/templateLoader.js?!./node_modules/vue-loader/dist/index.js?!./web/components/layout/App.vue?vue&type=template&id=185cf71c&ts=true");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ssrRender", function() { return _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_dist_templateLoader_js_ref_5_0_node_modules_vue_loader_dist_index_js_ref_5_0_App_vue_vue_type_template_id_185cf71c_ts_true__WEBPACK_IMPORTED_MODULE_0__["ssrRender"]; });



/***/ }),

/***/ "./web/components/layout/index.vue":
/*!*****************************************!*\
  !*** ./web/components/layout/index.vue ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_9a12cea6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=9a12cea6 */ "./web/components/layout/index.vue?vue&type=template&id=9a12cea6");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1__);

const script = {}


const __exports__ = /*#__PURE__*/_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_1___default()(script, [['ssrRender',_index_vue_vue_type_template_id_9a12cea6__WEBPACK_IMPORTED_MODULE_0__["ssrRender"]],['__file',"web/components/layout/index.vue"]])

/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./web/components/layout/index.vue?vue&type=template&id=9a12cea6":
/*!***********************************************************************!*\
  !*** ./web/components/layout/index.vue?vue&type=template&id=9a12cea6 ***!
  \***********************************************************************/
/*! exports provided: ssrRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_dist_templateLoader_js_ref_5_0_node_modules_vue_loader_dist_index_js_ref_5_0_index_vue_vue_type_template_id_9a12cea6__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--0-0!../../../node_modules/vue-loader/dist/templateLoader.js??ref--5-0!../../../node_modules/vue-loader/dist??ref--5-0!./index.vue?vue&type=template&id=9a12cea6 */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/dist/templateLoader.js?!./node_modules/vue-loader/dist/index.js?!./web/components/layout/index.vue?vue&type=template&id=9a12cea6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ssrRender", function() { return _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_dist_templateLoader_js_ref_5_0_node_modules_vue_loader_dist_index_js_ref_5_0_index_vue_vue_type_template_id_9a12cea6__WEBPACK_IMPORTED_MODULE_0__["ssrRender"]; });



/***/ }),

/***/ "./web/pages/index/index.less":
/*!************************************!*\
  !*** ./web/pages/index/index.less ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./web/pages/index/node/render$node.vue":
/*!**********************************************!*\
  !*** ./web/pages/index/node/render$node.vue ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render$node_vue_vue_type_template_id_303ac118_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render$node.vue?vue&type=template&id=303ac118&ts=true */ "./web/pages/index/node/render$node.vue?vue&type=template&id=303ac118&ts=true");
/* harmony import */ var _render$node_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render$node.vue?vue&type=script&lang=ts&setup=true */ "./web/pages/index/node/render$node.vue?vue&type=script&lang=ts&setup=true");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__);





const __exports__ = /*#__PURE__*/_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2___default()(_render$node_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_1__["default"], [['ssrRender',_render$node_vue_vue_type_template_id_303ac118_ts_true__WEBPACK_IMPORTED_MODULE_0__["ssrRender"]],['__file',"web/pages/index/node/render$node.vue"]])

/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./web/pages/index/node/render$node.vue?vue&type=script&lang=ts&setup=true":
/*!*********************************************************************************!*\
  !*** ./web/pages/index/node/render$node.vue?vue&type=script&lang=ts&setup=true ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_babel_loader_lib_index_js_ref_2_0_node_modules_vue_loader_dist_index_js_ref_5_0_render$node_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--0-0!../../../../node_modules/babel-loader/lib??ref--2-0!../../../../node_modules/vue-loader/dist??ref--5-0!./render$node.vue?vue&type=script&lang=ts&setup=true */ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/dist/index.js?!./web/pages/index/node/render$node.vue?vue&type=script&lang=ts&setup=true");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_babel_loader_lib_index_js_ref_2_0_node_modules_vue_loader_dist_index_js_ref_5_0_render$node_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* empty/unused harmony star reexport */ 

/***/ }),

/***/ "./web/pages/index/node/render$node.vue?vue&type=template&id=303ac118&ts=true":
/*!************************************************************************************!*\
  !*** ./web/pages/index/node/render$node.vue?vue&type=template&id=303ac118&ts=true ***!
  \************************************************************************************/
/*! exports provided: ssrRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_dist_templateLoader_js_ref_5_0_node_modules_vue_loader_dist_index_js_ref_5_0_render$node_vue_vue_type_template_id_303ac118_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--0-0!../../../../node_modules/vue-loader/dist/templateLoader.js??ref--5-0!../../../../node_modules/vue-loader/dist??ref--5-0!./render$node.vue?vue&type=template&id=303ac118&ts=true */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/dist/templateLoader.js?!./node_modules/vue-loader/dist/index.js?!./web/pages/index/node/render$node.vue?vue&type=template&id=303ac118&ts=true");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ssrRender", function() { return _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_dist_templateLoader_js_ref_5_0_node_modules_vue_loader_dist_index_js_ref_5_0_render$node_vue_vue_type_template_id_303ac118_ts_true__WEBPACK_IMPORTED_MODULE_0__["ssrRender"]; });



/***/ }),

/***/ "./web/pages/index/render.vue":
/*!************************************!*\
  !*** ./web/pages/index/render.vue ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _render_vue_vue_type_template_id_6781c9f2_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render.vue?vue&type=template&id=6781c9f2&ts=true */ "./web/pages/index/render.vue?vue&type=template&id=6781c9f2&ts=true");
/* harmony import */ var _render_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.vue?vue&type=script&lang=ts&setup=true */ "./web/pages/index/render.vue?vue&type=script&lang=ts&setup=true");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__);





const __exports__ = /*#__PURE__*/_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2___default()(_render_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_1__["default"], [['ssrRender',_render_vue_vue_type_template_id_6781c9f2_ts_true__WEBPACK_IMPORTED_MODULE_0__["ssrRender"]],['__file',"web/pages/index/render.vue"]])

/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./web/pages/index/render.vue?vue&type=script&lang=ts&setup=true":
/*!***********************************************************************!*\
  !*** ./web/pages/index/render.vue?vue&type=script&lang=ts&setup=true ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_babel_loader_lib_index_js_ref_2_0_node_modules_vue_loader_dist_index_js_ref_5_0_render_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--0-0!../../../node_modules/babel-loader/lib??ref--2-0!../../../node_modules/vue-loader/dist??ref--5-0!./render.vue?vue&type=script&lang=ts&setup=true */ "./node_modules/babel-loader/lib/index.js?!./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/dist/index.js?!./web/pages/index/render.vue?vue&type=script&lang=ts&setup=true");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_babel_loader_lib_index_js_ref_2_0_node_modules_vue_loader_dist_index_js_ref_5_0_render_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* empty/unused harmony star reexport */ 

/***/ }),

/***/ "./web/pages/index/render.vue?vue&type=template&id=6781c9f2&ts=true":
/*!**************************************************************************!*\
  !*** ./web/pages/index/render.vue?vue&type=template&id=6781c9f2&ts=true ***!
  \**************************************************************************/
/*! exports provided: ssrRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_dist_templateLoader_js_ref_5_0_node_modules_vue_loader_dist_index_js_ref_5_0_render_vue_vue_type_template_id_6781c9f2_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--0-0!../../../node_modules/vue-loader/dist/templateLoader.js??ref--5-0!../../../node_modules/vue-loader/dist??ref--5-0!./render.vue?vue&type=template&id=6781c9f2&ts=true */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/dist/templateLoader.js?!./node_modules/vue-loader/dist/index.js?!./web/pages/index/render.vue?vue&type=template&id=6781c9f2&ts=true");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ssrRender", function() { return _node_modules_babel_loader_lib_index_js_ref_0_0_node_modules_vue_loader_dist_templateLoader_js_ref_5_0_node_modules_vue_loader_dist_index_js_ref_5_0_render_vue_vue_type_template_id_6781c9f2_ts_true__WEBPACK_IMPORTED_MODULE_0__["ssrRender"]; });



/***/ }),

/***/ "./web/store/index.ts":
/*!****************************!*\
  !*** ./web/store/index.ts ***!
  \****************************/
/*! exports provided: useSnapShotStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSnapShotStore", function() { return useSnapShotStore; });
/* harmony import */ var pinia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pinia */ "pinia");
/* harmony import */ var pinia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pinia__WEBPACK_IMPORTED_MODULE_0__);

var useSnapShotStore = Object(pinia__WEBPACK_IMPORTED_MODULE_0__["defineStore"])('snapShotStore', {
  state: function state() {
    return {
      data: [],
      loaded: 'null',
      idOrdinal: {},
      compareData: []
    };
  },
  actions: {
    setData: function setData(payload) {
      var _payload$data = payload.data,
        data = _payload$data === void 0 ? [] : _payload$data,
        _payload$compareData = payload.compareData,
        compareData = _payload$compareData === void 0 ? [] : _payload$compareData;
      this.compareData = compareData;
      this.data = data;
      this.loaded = 'finish';
    },
    setLoading: function setLoading(text) {
      this.loaded = text;
    }
  }
});

/***/ }),

/***/ "./web/utils.ts":
/*!**********************!*\
  !*** ./web/utils.ts ***!
  \**********************/
/*! exports provided: noRepeat, NodeType, NODE_COLORS, EDGE_COLORS, EDGE_TYPES_PROPERTY, NODE_TYPES_PROPERTY, CONSTRUCTOR_PROPERTY, tips, Colors, renderNodeId, compareName, nativeNode, read, readAsStr, parseOptions, compareOptions, filterNodeOptions, filterConstructorOptions, getNodeById, MAXNODESCOUNT, memoryPercent, calculateByConstructor, sleep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noRepeat", function() { return noRepeat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NodeType", function() { return NodeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NODE_COLORS", function() { return NODE_COLORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDGE_COLORS", function() { return EDGE_COLORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDGE_TYPES_PROPERTY", function() { return EDGE_TYPES_PROPERTY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NODE_TYPES_PROPERTY", function() { return NODE_TYPES_PROPERTY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONSTRUCTOR_PROPERTY", function() { return CONSTRUCTOR_PROPERTY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tips", function() { return tips; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Colors", function() { return Colors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderNodeId", function() { return renderNodeId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compareName", function() { return compareName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nativeNode", function() { return nativeNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "read", function() { return read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "readAsStr", function() { return readAsStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseOptions", function() { return parseOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compareOptions", function() { return compareOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterNodeOptions", function() { return filterNodeOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterConstructorOptions", function() { return filterConstructorOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNodeById", function() { return getNodeById; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAXNODESCOUNT", function() { return MAXNODESCOUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "memoryPercent", function() { return memoryPercent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateByConstructor", function() { return calculateByConstructor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sleep", function() { return sleep; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vant_lib_notify_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vant/lib/notify/style */ "./node_modules/vant/lib/notify/style/index.js");
/* harmony import */ var vant_lib_notify_style__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(vant_lib_notify_style__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var vant_lib_notify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vant/lib/notify */ "vant/lib/notify");
/* harmony import */ var vant_lib_notify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vant_lib_notify__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_6__);





function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }


var noRepeat = function noRepeat(arr) {
  return Array.from(new Set(arr));
};
var NodeType = /*#__PURE__*/function (NodeType) {
  NodeType["kHidden"] = "hidden";
  // Hidden node, may be filtered when shown to user.
  NodeType["kArray"] = "array";
  // An array of elements.
  NodeType["kString"] = "string";
  // A string.
  NodeType["kObject"] = "object";
  // A JS object (except for arrays and strings).
  NodeType["kCode"] = "code";
  // Compiled code.
  NodeType["kClosure"] = "closure";
  // Function closure.
  NodeType["kRegExp"] = "regexp";
  // RegExp.
  NodeType["kHeapNumber"] = "number";
  // Number stored in the heap.
  NodeType["kNative"] = "native";
  // Native object (not from V8 heap).
  NodeType["kSynthetic"] = "synthetic";
  // Synthetic object, usually used for grouping
  // snapshot items together.
  NodeType["kConsString"] = "concatenated string";
  // Concatenated string. A pair of pointers to strings.
  NodeType["kSlicedString"] = "sliced string";
  // Sliced string. A fragment of another string.
  NodeType["kSymbol"] = "symbol";
  // A Symbol (ES6).
  NodeType["kBigInt"] = "bigint";
  // BigInt.
  NodeType[NodeType["kObjectShape"] = 14] = "kObjectShape"; // Internal data used for tracking the shapes (or
  // "hidden classes") of JS objects.
  return NodeType;
}({});
var NODE_COLORS = {
  '(system)': '#D32F2F',
  // bright red for system
  'array': '#1976D2',
  // bright blue for arrays
  'string': '#388E3C',
  // bright green for strings
  'object': '#E65100',
  '(compiled code)': '#7B1FA2',
  // bright purple for compiled code
  'closure': '#FF4081',
  // bright pink for closures
  'regexp': '#F57F17',
  // bright goldenrod for regexps
  'number': '#2E7D32',
  // bright green for numbers
  'native': '#795548',
  // brown for native
  'synthetic': '#303F9F',
  // bright slate blue for synthetic
  'concatenated string': '#388E3C',
  // same as string
  'sliced string': '#388E3C',
  // same as string
  'symbol': '#A1887F',
  // lighter brown for symbols
  'bigint': '#2E7D32',
  // same as number
  'hidden': '#757575',
  // medium gray for hidden
  'unknown': '#212121' // dark gray for unknown
};
var EDGE_COLORS = {
  'context': '#D32F2F',
  // bright red
  'element': '#1976D2',
  // bright blue 
  'property': '#388E3C',
  // bright green
  'internal': '#E65100',
  // bright orange
  'shortcut': '#7B1FA2' // bright purple
  // 'hidden': '#757575',     // medium gray
  // 'weak': '#FF4081',       // bright pink
};
var EDGE_TYPES_PROPERTY = Object.keys(EDGE_COLORS);
var NODE_TYPES_PROPERTY = ["hidden", "array", "string", "object", "code", "closure", "regexp", "number", "native", "synthetic", "concatenated string", "sliced string", "symbol", "bigint"];
var CONSTRUCTOR_PROPERTY = ["(system)", "array", "string", "object", "(compiled code)", "closure", "regexp", "number", "native", "synthetic", "concatenated string", "sliced string", "symbol", "bigint"];
var tips = function tips(text, type) {
  vant_lib_notify__WEBPACK_IMPORTED_MODULE_4___default()({
    type: type || 'warning',
    duration: 5000,
    message: text
  });
};
var Colors = /*#__PURE__*/function (Colors) {
  Colors["jsNative"] = "#800080";
  Colors["jsNotNative"] = "#DA70D6";
  Colors["cNative"] = "#000";
  Colors["normal"] = "#4187f2";
  Colors["current"] = "red";
  return Colors;
}({});
var renderNodeId = Object(vue__WEBPACK_IMPORTED_MODULE_6__["ref"])('');
var compareName = function compareName(name, target) {
  return new RegExp(target).test(name);
};
var nativeNode = [NodeType.kNative, NodeType.kHidden, NodeType.kSynthetic];
var read = /*#__PURE__*/function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default.a.mark(function _callee(file) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default.a.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve) {
            var reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = function (e) {
              var _e$target;
              var bytes = new Uint8Array((_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.result);
              resolve(bytes);
            };
          }));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function read(_x) {
    return _ref.apply(this, arguments);
  };
}();
var readAsStr = /*#__PURE__*/function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default.a.mark(function _callee2(file) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default.a.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise(function (resolve) {
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function (e) {
              resolve(e.target.result);
            };
          }));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function readAsStr(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var parseOptions = [{
  text: '解析方式',
  value: 'wasm'
}, {
  text: 'Wasm + WebWorker',
  value: 'webworker'
}];
var compareOptions = [{
  text: '比较方式',
  value: 'addtional'
}, {
  text: '新增节点',
  value: 'addtional'
}, {
  text: '增长节点',
  value: 'bigger'
}];
var filterNodeOptions = [{
  text: '是否过滤非JS层节点',
  value: 0
}, {
  text: '只展示JS层非原生节点(业务节点)',
  value: 1
}, {
  text: '展示JS层所有节点',
  value: 2
}];
var filterConstructorOptions = Object(vue__WEBPACK_IMPORTED_MODULE_6__["ref"])([{
  text: '展示所有类型节点',
  value: 'all'
}]);
var getNodeById = function getNodeById(data, idOrdinal, nodeId) {
  return data[idOrdinal[nodeId]];
};
var MAXNODESCOUNT = 50 * 1024 * 1024; // 50 mb 默认开启过滤

var memoryPercent = function memoryPercent(node, root) {
  return (node.retained_size / root.retained_size * 100).toFixed(2) + '%';
};
var calculateByConstructor = function calculateByConstructor(nodes) {
  var constructorCounts = {};

  // Count nodes by constructor
  nodes.forEach(function (node) {
    var constructor = node.constructor || 'unknown';
    constructorCounts[constructor] = (constructorCounts[constructor] || 0) + 1;
  });

  // Sort constructors by count and get top 10
  var sortedConstructors = Object.entries(constructorCounts).sort(function (_ref3, _ref4) {
    var _ref5 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_ref3, 2),
      a = _ref5[1];
    var _ref6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_ref4, 2),
      b = _ref6[1];
    return b - a;
  }).slice(0, 10).reduce(function (obj, _ref7) {
    var _ref8 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_ref7, 2),
      key = _ref8[0],
      value = _ref8[1];
    return _objectSpread(_objectSpread({}, obj), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, key, value));
  }, {});
  filterConstructorOptions.value = [{
    text: '展示所有类型节点',
    value: 'all'
  }].concat(Object.keys(sortedConstructors).map(function (item) {
    return {
      text: item,
      value: item
    };
  }));
  return sortedConstructors;
};
function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

/***/ }),

/***/ 0:
/*!**********************************************************************!*\
  !*** multi ./node_modules/ssr-plugin-vue3/cjs/entry/server-entry.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/yuuang/Desktop/github/v8-profile-rs/example/node_modules/ssr-plugin-vue3/cjs/entry/server-entry.js */"./node_modules/ssr-plugin-vue3/cjs/entry/server-entry.js");


/***/ }),

/***/ "@babel/runtime/helpers/asyncToGenerator":
/*!**********************************************************!*\
  !*** external "@babel/runtime/helpers/asyncToGenerator" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "@babel/runtime/helpers/defineProperty":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/defineProperty" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),

/***/ "@babel/runtime/helpers/slicedToArray":
/*!*******************************************************!*\
  !*** external "@babel/runtime/helpers/slicedToArray" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/slicedToArray");

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "@vue/server-renderer":
/*!***************************************!*\
  !*** external "@vue/server-renderer" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@vue/server-renderer");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "echarts":
/*!**************************!*\
  !*** external "echarts" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("echarts");

/***/ }),

/***/ "pinia":
/*!************************!*\
  !*** external "pinia" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pinia");

/***/ }),

/***/ "ssr-common-utils":
/*!***********************************!*\
  !*** external "ssr-common-utils" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ssr-common-utils");

/***/ }),

/***/ "ssr-deepclone":
/*!********************************!*\
  !*** external "ssr-deepclone" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ssr-deepclone");

/***/ }),

/***/ "ssr-serialize-javascript":
/*!*******************************************!*\
  !*** external "ssr-serialize-javascript" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ssr-serialize-javascript");

/***/ }),

/***/ "vant/lib/button":
/*!**********************************!*\
  !*** external "vant/lib/button" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vant/lib/button");

/***/ }),

/***/ "vant/lib/dropdown-item":
/*!*****************************************!*\
  !*** external "vant/lib/dropdown-item" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vant/lib/dropdown-item");

/***/ }),

/***/ "vant/lib/dropdown-menu":
/*!*****************************************!*\
  !*** external "vant/lib/dropdown-menu" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vant/lib/dropdown-menu");

/***/ }),

/***/ "vant/lib/field":
/*!*********************************!*\
  !*** external "vant/lib/field" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vant/lib/field");

/***/ }),

/***/ "vant/lib/loading":
/*!***********************************!*\
  !*** external "vant/lib/loading" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vant/lib/loading");

/***/ }),

/***/ "vant/lib/notify":
/*!**********************************!*\
  !*** external "vant/lib/notify" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vant/lib/notify");

/***/ }),

/***/ "vant/lib/popover":
/*!***********************************!*\
  !*** external "vant/lib/popover" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vant/lib/popover");

/***/ }),

/***/ "vue":
/*!**********************!*\
  !*** external "vue" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "vue-router":
/*!*****************************!*\
  !*** external "vue-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vue-router");

/***/ }),

/***/ "vue/server-renderer":
/*!**************************************!*\
  !*** external "vue/server-renderer" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vue/server-renderer");

/***/ }),

/***/ "vuex":
/*!***********************!*\
  !*** external "vuex" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("vuex");

/***/ })

/******/ })));
//# sourceMappingURL=Page.server.js.map