"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/search/page",{

/***/ "(app-pages-browser)/./src/app/components/search/SearchArea.tsx":
/*!**************************************************!*\
  !*** ./src/app/components/search/SearchArea.tsx ***!
  \**************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_textarea_autosize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-textarea-autosize */ \"(app-pages-browser)/./node_modules/react-textarea-autosize/dist/react-textarea-autosize.browser.development.esm.js\");\n\n\n\nconst SearchArea = ()=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex justify-center h-screen w-full flex-col\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"mb-28\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_textarea_autosize__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                    className: \"w-7/12 resize-none rounded-lg\",\n                    maxRows: 4,\n                    placeholder: \"enter anything\",\n                    autoFocus: true,\n                    id: \"usermsg\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\sandbox - local\\\\proto 1\\\\acee-proto-one\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n                    lineNumber: 8,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\sandbox - local\\\\proto 1\\\\acee-proto-one\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n                lineNumber: 7,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: \"results\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\sandbox - local\\\\proto 1\\\\acee-proto-one\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n                lineNumber: 16,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\sandbox - local\\\\proto 1\\\\acee-proto-one\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n        lineNumber: 6,\n        columnNumber: 5\n    }, undefined);\n};\n_c = SearchArea;\n/* harmony default export */ __webpack_exports__[\"default\"] = (SearchArea);\nvar _c;\n$RefreshReg$(_c, \"SearchArea\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvY29tcG9uZW50cy9zZWFyY2gvU2VhcmNoQXJlYS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTBCO0FBQzZCO0FBRXZELE1BQU1FLGFBQWE7SUFDakIscUJBQ0UsOERBQUNDO1FBQUlDLFdBQVU7OzBCQUNiLDhEQUFDRDtnQkFBSUMsV0FBVTswQkFDYiw0RUFBQ0gsK0RBQWdCQTtvQkFDZkcsV0FBVTtvQkFDVkMsU0FBUztvQkFDVEMsYUFBWTtvQkFDWkMsU0FBUztvQkFDVEMsSUFBRzs7Ozs7Ozs7Ozs7MEJBR1AsOERBQUNMOzBCQUFJOzs7Ozs7Ozs7Ozs7QUFHWDtLQWZNRDtBQWlCTiwrREFBZUEsVUFBVUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL2NvbXBvbmVudHMvc2VhcmNoL1NlYXJjaEFyZWEudHN4P2MyZDciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgVGV4dGFyZWFBdXRvc2l6ZSBmcm9tIFwicmVhY3QtdGV4dGFyZWEtYXV0b3NpemVcIjtcclxuXHJcbmNvbnN0IFNlYXJjaEFyZWEgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlciBoLXNjcmVlbiB3LWZ1bGwgZmxleC1jb2xcIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi0yOFwiPlxyXG4gICAgICAgIDxUZXh0YXJlYUF1dG9zaXplXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJ3LTcvMTIgcmVzaXplLW5vbmUgcm91bmRlZC1sZ1wiXHJcbiAgICAgICAgICBtYXhSb3dzPXs0fVxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJlbnRlciBhbnl0aGluZ1wiXHJcbiAgICAgICAgICBhdXRvRm9jdXNcclxuICAgICAgICAgIGlkPVwidXNlcm1zZ1wiXHJcbiAgICAgICAgPjwvVGV4dGFyZWFBdXRvc2l6ZT5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXY+cmVzdWx0czwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlYXJjaEFyZWE7XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsIlRleHRhcmVhQXV0b3NpemUiLCJTZWFyY2hBcmVhIiwiZGl2IiwiY2xhc3NOYW1lIiwibWF4Um93cyIsInBsYWNlaG9sZGVyIiwiYXV0b0ZvY3VzIiwiaWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/components/search/SearchArea.tsx\n"));

/***/ })

});