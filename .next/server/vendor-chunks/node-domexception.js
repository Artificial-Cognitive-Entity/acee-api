/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/node-domexception";
exports.ids = ["vendor-chunks/node-domexception"];
exports.modules = {

/***/ "(rsc)/./node_modules/node-domexception/index.js":
/*!*************************************************!*\
  !*** ./node_modules/node-domexception/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */ if (!globalThis.DOMException) {\n    try {\n        const { MessageChannel } = __webpack_require__(/*! worker_threads */ \"worker_threads\"), port = new MessageChannel().port1, ab = new ArrayBuffer();\n        port.postMessage(ab, [\n            ab,\n            ab\n        ]);\n    } catch (err) {\n        err.constructor.name === \"DOMException\" && (globalThis.DOMException = err.constructor);\n    }\n}\nmodule.exports = globalThis.DOMException;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbm9kZS1kb21leGNlcHRpb24vaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUEsd0ZBQXdGLEdBRXhGLElBQUksQ0FBQ0EsV0FBV0MsWUFBWSxFQUFFO0lBQzVCLElBQUk7UUFDRixNQUFNLEVBQUVDLGNBQWMsRUFBRSxHQUFHQyxtQkFBT0EsQ0FBQyx5Q0FDbkNDLE9BQU8sSUFBSUYsaUJBQWlCRyxLQUFLLEVBQ2pDQyxLQUFLLElBQUlDO1FBQ1RILEtBQUtJLFdBQVcsQ0FBQ0YsSUFBSTtZQUFDQTtZQUFJQTtTQUFHO0lBQy9CLEVBQUUsT0FBT0csS0FBSztRQUNaQSxJQUFJQyxXQUFXLENBQUNDLElBQUksS0FBSyxrQkFDdkJYLENBQUFBLFdBQVdDLFlBQVksR0FBR1EsSUFBSUMsV0FBVztJQUU3QztBQUNGO0FBRUFFLE9BQU9DLE9BQU8sR0FBR2IsV0FBV0MsWUFBWSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZWUtcHJvdG8tb25lLy4vbm9kZV9tb2R1bGVzL25vZGUtZG9tZXhjZXB0aW9uL2luZGV4LmpzP2FlMGEiXSwic291cmNlc0NvbnRlbnQiOlsiLyohIG5vZGUtZG9tZXhjZXB0aW9uLiBNSVQgTGljZW5zZS4gSmltbXkgV8OkcnRpbmcgPGh0dHBzOi8vamltbXkud2FydGluZy5zZS9vcGVuc291cmNlPiAqL1xuXG5pZiAoIWdsb2JhbFRoaXMuRE9NRXhjZXB0aW9uKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBNZXNzYWdlQ2hhbm5lbCB9ID0gcmVxdWlyZSgnd29ya2VyX3RocmVhZHMnKSxcbiAgICBwb3J0ID0gbmV3IE1lc3NhZ2VDaGFubmVsKCkucG9ydDEsXG4gICAgYWIgPSBuZXcgQXJyYXlCdWZmZXIoKVxuICAgIHBvcnQucG9zdE1lc3NhZ2UoYWIsIFthYiwgYWJdKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBlcnIuY29uc3RydWN0b3IubmFtZSA9PT0gJ0RPTUV4Y2VwdGlvbicgJiYgKFxuICAgICAgZ2xvYmFsVGhpcy5ET01FeGNlcHRpb24gPSBlcnIuY29uc3RydWN0b3JcbiAgICApXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxUaGlzLkRPTUV4Y2VwdGlvblxuIl0sIm5hbWVzIjpbImdsb2JhbFRoaXMiLCJET01FeGNlcHRpb24iLCJNZXNzYWdlQ2hhbm5lbCIsInJlcXVpcmUiLCJwb3J0IiwicG9ydDEiLCJhYiIsIkFycmF5QnVmZmVyIiwicG9zdE1lc3NhZ2UiLCJlcnIiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/node-domexception/index.js\n");

/***/ })

};
;