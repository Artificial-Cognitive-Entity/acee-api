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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_textarea_autosize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-textarea-autosize */ \"(app-pages-browser)/./node_modules/react-textarea-autosize/dist/react-textarea-autosize.browser.development.esm.js\");\n\n\n\nconst SearchArea = ()=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex  h-screen w-full flex-col\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \" mt-12 flex justify-center flex-col\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_textarea_autosize__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                    className: \"w-7/12 resize-none rounded-lg\",\n                    maxRows: 4,\n                    placeholder: \"enter anything\",\n                    autoFocus: true,\n                    id: \"usermsg\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\sandbox - local\\\\proto 1\\\\acee-proto-one\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n                    lineNumber: 8,\n                    columnNumber: 9\n                }, undefined),\n                \"reuslts\"\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\sandbox - local\\\\proto 1\\\\acee-proto-one\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n            lineNumber: 7,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\sandbox - local\\\\proto 1\\\\acee-proto-one\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n        lineNumber: 6,\n        columnNumber: 5\n    }, undefined);\n};\n_c = SearchArea;\n/* harmony default export */ __webpack_exports__[\"default\"] = (SearchArea);\nvar _c;\n$RefreshReg$(_c, \"SearchArea\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvY29tcG9uZW50cy9zZWFyY2gvU2VhcmNoQXJlYS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTBCO0FBQzZCO0FBRXZELE1BQU1FLGFBQWE7SUFDakIscUJBQ0UsOERBQUNDO1FBQUlDLFdBQVU7a0JBQ2IsNEVBQUNEO1lBQUlDLFdBQVU7OzhCQUNiLDhEQUFDSCwrREFBZ0JBO29CQUNmRyxXQUFVO29CQUNWQyxTQUFTO29CQUNUQyxhQUFZO29CQUNaQyxTQUFTO29CQUNUQyxJQUFHOzs7Ozs7Z0JBQ2U7Ozs7Ozs7Ozs7OztBQU81QjtLQWpCTU47QUFtQk4sK0RBQWVBLFVBQVVBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9jb21wb25lbnRzL3NlYXJjaC9TZWFyY2hBcmVhLnRzeD9jMmQ3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFRleHRhcmVhQXV0b3NpemUgZnJvbSBcInJlYWN0LXRleHRhcmVhLWF1dG9zaXplXCI7XHJcblxyXG5jb25zdCBTZWFyY2hBcmVhID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggIGgtc2NyZWVuIHctZnVsbCBmbGV4LWNvbFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIiBtdC0xMiBmbGV4IGp1c3RpZnktY2VudGVyIGZsZXgtY29sXCI+XHJcbiAgICAgICAgPFRleHRhcmVhQXV0b3NpemVcclxuICAgICAgICAgIGNsYXNzTmFtZT1cInctNy8xMiByZXNpemUtbm9uZSByb3VuZGVkLWxnXCJcclxuICAgICAgICAgIG1heFJvd3M9ezR9XHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cImVudGVyIGFueXRoaW5nXCJcclxuICAgICAgICAgIGF1dG9Gb2N1c1xyXG4gICAgICAgICAgaWQ9XCJ1c2VybXNnXCJcclxuICAgICAgICA+PC9UZXh0YXJlYUF1dG9zaXplPlxyXG5cclxuICAgICAgICByZXVzbHRzXHJcbiAgICAgIDwvZGl2PlxyXG4gICBcclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hBcmVhO1xyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJUZXh0YXJlYUF1dG9zaXplIiwiU2VhcmNoQXJlYSIsImRpdiIsImNsYXNzTmFtZSIsIm1heFJvd3MiLCJwbGFjZWhvbGRlciIsImF1dG9Gb2N1cyIsImlkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/components/search/SearchArea.tsx\n"));

/***/ })

});