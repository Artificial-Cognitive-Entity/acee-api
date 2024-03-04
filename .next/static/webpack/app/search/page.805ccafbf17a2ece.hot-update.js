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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_textarea_autosize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-textarea-autosize */ \"(app-pages-browser)/./node_modules/react-textarea-autosize/dist/react-textarea-autosize.browser.development.esm.js\");\n/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../button */ \"(app-pages-browser)/./src/app/components/button.tsx\");\n/* harmony import */ var _SearchResult__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SearchResult */ \"(app-pages-browser)/./src/app/components/search/SearchResult.tsx\");\n/* harmony import */ var _app_lib_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/app/lib/loader */ \"(app-pages-browser)/./src/app/lib/loader.tsx\");\n/* harmony import */ var _NotFound__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NotFound */ \"(app-pages-browser)/./src/app/components/search/NotFound.tsx\");\n/* harmony import */ var _barrel_optimize_names_Transition_headlessui_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! __barrel_optimize__?names=Transition!=!@headlessui/react */ \"(app-pages-browser)/./node_modules/@headlessui/react/dist/components/transitions/transition.js\");\n/* harmony import */ var _SearchGreeting__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SearchGreeting */ \"(app-pages-browser)/./src/app/components/search/SearchGreeting.tsx\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n// TODO: FORMAT SEARCH RESULTS SO IT LOOKS PRETTY\n// TODO: RIGHT CLICK SEARCH RESULT -> CHATBOT QUERY\n\n\n\n\n\n\n\n\nconst SearchArea = ()=>{\n    _s();\n    const [searchTerm, setSearchTerm] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [results, setResult] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [asked, setAsked] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [isLoading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const handleChange = (value)=>{\n        setSearchTerm(value);\n    };\n    const onEnterPress = (e)=>{\n        if (e.keyCode == 13 && e.shiftKey == false) {\n            e.preventDefault();\n            handleAsked();\n            handleSubmit(e);\n        }\n    };\n    const handleAsked = ()=>{\n        setAsked(true);\n    };\n    const handleSubmit = async (e)=>{\n        e.preventDefault();\n        setLoading(true);\n        if (searchTerm.trim() === \"\") {\n            console.log(\"empty search term!\");\n        } else {\n            const semanticSearch = await fetch(\"/api/search\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify({\n                    searchTerm: searchTerm\n                })\n            });\n            const response = await semanticSearch.json();\n            setResult(response.result);\n            setLoading(false);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex h-screen w-full flex-col overscroll-none\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                className: \"w-full inline-flex items-center justify-center gap-8 mt-12 mb-5\",\n                onSubmit: handleSubmit,\n                onKeyDown: onEnterPress,\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_textarea_autosize__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                        className: \"w-9/12 resize-none rounded-lg text-black\",\n                        maxRows: 4,\n                        placeholder: \"enter anything\",\n                        autoFocus: true,\n                        value: searchTerm,\n                        onChange: (e)=>handleChange(e.target.value)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\the_cannon\\\\acee-api\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n                        lineNumber: 66,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_button__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        type: \"submit\",\n                        className: \"w-1/12 rounded-lg\",\n                        onClick: handleAsked,\n                        children: \"enter\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\the_cannon\\\\acee-api\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n                        lineNumber: 74,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\the_cannon\\\\acee-api\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n                lineNumber: 61,\n                columnNumber: 7\n            }, undefined),\n            !asked && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_SearchGreeting__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\the_cannon\\\\acee-api\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n                lineNumber: 82,\n                columnNumber: 18\n            }, undefined),\n            isLoading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex h-full justify-center items-center\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Transition_headlessui_react__WEBPACK_IMPORTED_MODULE_8__.Transition, {\n                    appear: true,\n                    show: isLoading,\n                    enter: \"transition-all ease-in-out duration-500 delay-[200ms]\",\n                    enterFrom: \"opacity-0\",\n                    enterTo: \"opacity-100\",\n                    leave: \"transition-all ease-in-out duration-500\",\n                    leaveFrom: \"opacity-100\",\n                    leaveTo: \"opacity-0\",\n                    className: \"inline-flex justify-center items-center flex-col\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_app_lib_loader__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\the_cannon\\\\acee-api\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n                        lineNumber: 96,\n                        columnNumber: 13\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\the_cannon\\\\acee-api\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n                    lineNumber: 85,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\the_cannon\\\\acee-api\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n                lineNumber: 84,\n                columnNumber: 9\n            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \" mt-12 mb-12 flex justify-center self-center overflow-y-auto w-9/12 h-screen\",\n                children: results.length > 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex flex-col content-center text-base rounded-lg w-full\",\n                    children: results.map((project, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_SearchResult__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                            project: project\n                        }, index, false, {\n                            fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\the_cannon\\\\acee-api\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n                            lineNumber: 104,\n                            columnNumber: 17\n                        }, undefined))\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\the_cannon\\\\acee-api\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n                    lineNumber: 102,\n                    columnNumber: 13\n                }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: asked ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Transition_headlessui_react__WEBPACK_IMPORTED_MODULE_8__.Transition, {\n                            appear: true,\n                            show: !isLoading,\n                            enter: \"transition-all ease-in-out duration-500 delay-[200ms]\",\n                            enterFrom: \"opacity-0 translate-y-9\",\n                            enterTo: \"opacity-100 translate-y-0\",\n                            leave: \"transition-all ease-in-out duration-500\",\n                            leaveFrom: \"opacity-100\",\n                            leaveTo: \"opacity-0\",\n                            className: \"inline-flex justify-center items-center flex-col\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_NotFound__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {}, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\the_cannon\\\\acee-api\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n                                    lineNumber: 122,\n                                    columnNumber: 21\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"text-3xl\",\n                                    children: \"Sorry, we could not find anything.\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\the_cannon\\\\acee-api\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n                                    lineNumber: 123,\n                                    columnNumber: 21\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\the_cannon\\\\acee-api\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n                            lineNumber: 111,\n                            columnNumber: 19\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\the_cannon\\\\acee-api\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n                        lineNumber: 110,\n                        columnNumber: 17\n                    }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\the_cannon\\\\acee-api\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n                        lineNumber: 129,\n                        columnNumber: 17\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\the_cannon\\\\acee-api\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n                    lineNumber: 108,\n                    columnNumber: 13\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\the_cannon\\\\acee-api\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n                lineNumber: 100,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\calze\\\\Desktop\\\\UCF\\\\SPR24\\\\COP4935\\\\the_cannon\\\\acee-api\\\\src\\\\app\\\\components\\\\search\\\\SearchArea.tsx\",\n        lineNumber: 60,\n        columnNumber: 5\n    }, undefined);\n};\n_s(SearchArea, \"VTP+iUjDqNf+x4nk+QKvmXeT51k=\");\n_c = SearchArea;\n/* harmony default export */ __webpack_exports__[\"default\"] = (SearchArea);\nvar _c;\n$RefreshReg$(_c, \"SearchArea\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvY29tcG9uZW50cy9zZWFyY2gvU2VhcmNoQXJlYS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBLGlEQUFpRDtBQUNqRCxtREFBbUQ7QUFDQTtBQUNJO0FBQ3hCO0FBQ1c7QUFDSjtBQUNKO0FBQ2E7QUFDRDtBQUU5QyxNQUFNUyxhQUFhOztJQUNqQixNQUFNLENBQUNDLFlBQVlDLGNBQWMsR0FBR1YsK0NBQVFBLENBQUM7SUFDN0MsTUFBTSxDQUFDVyxTQUFTQyxVQUFVLEdBQUdaLCtDQUFRQSxDQUFRLEVBQUU7SUFDL0MsTUFBTSxDQUFDYSxPQUFPQyxTQUFTLEdBQUdkLCtDQUFRQSxDQUFDO0lBQ25DLE1BQU0sQ0FBQ2UsV0FBV0MsV0FBVyxHQUFHaEIsK0NBQVFBLENBQUM7SUFFekMsTUFBTWlCLGVBQWUsQ0FBQ0M7UUFDcEJSLGNBQWNRO0lBQ2hCO0lBRUEsTUFBTUMsZUFBZSxDQUFDQztRQUNwQixJQUFJQSxFQUFFQyxPQUFPLElBQUksTUFBTUQsRUFBRUUsUUFBUSxJQUFJLE9BQU87WUFDMUNGLEVBQUVHLGNBQWM7WUFDaEJDO1lBQ0FDLGFBQWFMO1FBQ2Y7SUFDRjtJQUVBLE1BQU1JLGNBQWM7UUFDbEJWLFNBQVM7SUFDWDtJQUNBLE1BQU1XLGVBQWUsT0FBT0w7UUFDMUJBLEVBQUVHLGNBQWM7UUFFaEJQLFdBQVc7UUFFWCxJQUFJUCxXQUFXaUIsSUFBSSxPQUFPLElBQUk7WUFDNUJDLFFBQVFDLEdBQUcsQ0FBQztRQUNkLE9BQU87WUFDTCxNQUFNQyxpQkFBaUIsTUFBTUMsTUFBTSxlQUFlO2dCQUNoREMsUUFBUTtnQkFDUkMsU0FBUztvQkFDUCxnQkFBZ0I7Z0JBQ2xCO2dCQUVBQyxNQUFNQyxLQUFLQyxTQUFTLENBQUM7b0JBQ25CMUIsWUFBWUE7Z0JBQ2Q7WUFDRjtZQUVBLE1BQU0yQixXQUFXLE1BQU1QLGVBQWVRLElBQUk7WUFDMUN6QixVQUFVd0IsU0FBU0UsTUFBTTtZQUN6QnRCLFdBQVc7UUFDYjtJQUNGO0lBRUEscUJBQ0UsOERBQUN1QjtRQUFJQyxXQUFVOzswQkFDYiw4REFBQ0M7Z0JBQ0NELFdBQVU7Z0JBQ1ZFLFVBQVVqQjtnQkFDVmtCLFdBQVd4Qjs7a0NBRVgsOERBQUNsQiwrREFBZ0JBO3dCQUNmdUMsV0FBVTt3QkFDVkksU0FBUzt3QkFDVEMsYUFBWTt3QkFDWkMsU0FBUzt3QkFDVDVCLE9BQU9UO3dCQUNQc0MsVUFBVSxDQUFDM0IsSUFBTUgsYUFBYUcsRUFBRTRCLE1BQU0sQ0FBQzlCLEtBQUs7Ozs7OztrQ0FFOUMsOERBQUNoQiwrQ0FBTUE7d0JBQ0wrQyxNQUFLO3dCQUNMVCxXQUFVO3dCQUNWVSxTQUFTMUI7a0NBQ1Y7Ozs7Ozs7Ozs7OztZQUlGLENBQUNYLHVCQUFTLDhEQUFDTix1REFBY0E7Ozs7O1lBQ3pCUSwwQkFDQyw4REFBQ3dCO2dCQUFJQyxXQUFVOzBCQUNiLDRFQUFDbEMsMEZBQVVBO29CQUNUNkMsUUFBUTtvQkFDUkMsTUFBTXJDO29CQUNOc0MsT0FBTTtvQkFDTkMsV0FBVTtvQkFDVkMsU0FBUTtvQkFDUkMsT0FBTTtvQkFDTkMsV0FBVTtvQkFDVkMsU0FBUTtvQkFDUmxCLFdBQVU7OEJBRVYsNEVBQUNwQyx1REFBTUE7Ozs7Ozs7Ozs7Ozs7OzBDQUlYLDhEQUFDbUM7Z0JBQUlDLFdBQVU7MEJBQ1o3QixRQUFRZ0QsTUFBTSxHQUFHLGtCQUNoQiw4REFBQ3BCO29CQUFJQyxXQUFVOzhCQUNaN0IsUUFBUWlELEdBQUcsQ0FBQyxDQUFDQyxTQUFTQyxzQkFDckIsOERBQUMzRCxxREFBWUE7NEJBQUMwRCxTQUFTQTsyQkFBY0M7Ozs7Ozs7Ozs4Q0FJekMsOERBQUN2Qjs4QkFDRTFCLHNCQUNDLDhEQUFDMEI7a0NBQ0MsNEVBQUNqQywwRkFBVUE7NEJBQ1Q2QyxRQUFROzRCQUNSQyxNQUFNLENBQUNyQzs0QkFDUHNDLE9BQU07NEJBQ05DLFdBQVU7NEJBQ1ZDLFNBQVE7NEJBQ1JDLE9BQU07NEJBQ05DLFdBQVU7NEJBQ1ZDLFNBQVE7NEJBQ1JsQixXQUFVOzs4Q0FFViw4REFBQ25DLGlEQUFRQTs7Ozs7OENBQ1QsOERBQUNrQztvQ0FBSUMsV0FBVTs4Q0FBVzs7Ozs7Ozs7Ozs7Ozs7OztrREFNOUIsOERBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRakI7R0E1SE0vQjtLQUFBQTtBQThITiwrREFBZUEsVUFBVUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL2NvbXBvbmVudHMvc2VhcmNoL1NlYXJjaEFyZWEudHN4P2MyZDciXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XHJcbi8vIFRPRE86IEZPUk1BVCBTRUFSQ0ggUkVTVUxUUyBTTyBJVCBMT09LUyBQUkVUVFlcclxuLy8gVE9ETzogUklHSFQgQ0xJQ0sgU0VBUkNIIFJFU1VMVCAtPiBDSEFUQk9UIFFVRVJZXHJcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBUZXh0YXJlYUF1dG9zaXplIGZyb20gXCJyZWFjdC10ZXh0YXJlYS1hdXRvc2l6ZVwiO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gXCIuLi9idXR0b25cIjtcclxuaW1wb3J0IFNlYXJjaFJlc3VsdCBmcm9tIFwiLi9TZWFyY2hSZXN1bHRcIjtcclxuaW1wb3J0IExvYWRlciBmcm9tIFwiQC9hcHAvbGliL2xvYWRlclwiO1xyXG5pbXBvcnQgTm90Rm91bmQgZnJvbSBcIi4vTm90Rm91bmRcIjtcclxuaW1wb3J0IHsgVHJhbnNpdGlvbiB9IGZyb20gXCJAaGVhZGxlc3N1aS9yZWFjdFwiO1xyXG5pbXBvcnQgU2VhcmNoR3JlZXRpbmcgZnJvbSBcIi4vU2VhcmNoR3JlZXRpbmdcIjtcclxuXHJcbmNvbnN0IFNlYXJjaEFyZWEgPSAoKSA9PiB7XHJcbiAgY29uc3QgW3NlYXJjaFRlcm0sIHNldFNlYXJjaFRlcm1dID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3Jlc3VsdHMsIHNldFJlc3VsdF0gPSB1c2VTdGF0ZTxhbnlbXT4oW10pO1xyXG4gIGNvbnN0IFthc2tlZCwgc2V0QXNrZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgc2V0U2VhcmNoVGVybSh2YWx1ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgb25FbnRlclByZXNzID0gKGU6IGFueSkgPT4ge1xyXG4gICAgaWYgKGUua2V5Q29kZSA9PSAxMyAmJiBlLnNoaWZ0S2V5ID09IGZhbHNlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgaGFuZGxlQXNrZWQoKTtcclxuICAgICAgaGFuZGxlU3VibWl0KGUpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFza2VkID0gKCkgPT4ge1xyXG4gICAgc2V0QXNrZWQodHJ1ZSk7XHJcbiAgfTtcclxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZTogYW55KSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgc2V0TG9hZGluZyh0cnVlKTtcclxuXHJcbiAgICBpZiAoc2VhcmNoVGVybS50cmltKCkgPT09IFwiXCIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJlbXB0eSBzZWFyY2ggdGVybSFcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBzZW1hbnRpY1NlYXJjaCA9IGF3YWl0IGZldGNoKFwiL2FwaS9zZWFyY2hcIiwge1xyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgc2VhcmNoVGVybTogc2VhcmNoVGVybSxcclxuICAgICAgICB9KSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNlbWFudGljU2VhcmNoLmpzb24oKTtcclxuICAgICAgc2V0UmVzdWx0KHJlc3BvbnNlLnJlc3VsdCk7XHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaC1zY3JlZW4gdy1mdWxsIGZsZXgtY29sIG92ZXJzY3JvbGwtbm9uZVwiPlxyXG4gICAgICA8Zm9ybVxyXG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTggbXQtMTIgbWItNVwiXHJcbiAgICAgICAgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH1cclxuICAgICAgICBvbktleURvd249e29uRW50ZXJQcmVzc31cclxuICAgICAgPlxyXG4gICAgICAgIDxUZXh0YXJlYUF1dG9zaXplXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJ3LTkvMTIgcmVzaXplLW5vbmUgcm91bmRlZC1sZyB0ZXh0LWJsYWNrXCJcclxuICAgICAgICAgIG1heFJvd3M9ezR9XHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cImVudGVyIGFueXRoaW5nXCJcclxuICAgICAgICAgIGF1dG9Gb2N1c1xyXG4gICAgICAgICAgdmFsdWU9e3NlYXJjaFRlcm19XHJcbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUNoYW5nZShlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgPjwvVGV4dGFyZWFBdXRvc2l6ZT5cclxuICAgICAgICA8QnV0dG9uXHJcbiAgICAgICAgICB0eXBlPVwic3VibWl0XCJcclxuICAgICAgICAgIGNsYXNzTmFtZT1cInctMS8xMiByb3VuZGVkLWxnXCJcclxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUFza2VkfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIGVudGVyXHJcbiAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgICAgeyFhc2tlZCAmJiA8U2VhcmNoR3JlZXRpbmc+PC9TZWFyY2hHcmVldGluZz59XHJcbiAgICAgIHtpc0xvYWRpbmcgPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGgtZnVsbCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXJcIj5cclxuICAgICAgICAgIDxUcmFuc2l0aW9uXHJcbiAgICAgICAgICAgIGFwcGVhcj17dHJ1ZX1cclxuICAgICAgICAgICAgc2hvdz17aXNMb2FkaW5nfVxyXG4gICAgICAgICAgICBlbnRlcj1cInRyYW5zaXRpb24tYWxsIGVhc2UtaW4tb3V0IGR1cmF0aW9uLTUwMCBkZWxheS1bMjAwbXNdXCJcclxuICAgICAgICAgICAgZW50ZXJGcm9tPVwib3BhY2l0eS0wXCJcclxuICAgICAgICAgICAgZW50ZXJUbz1cIm9wYWNpdHktMTAwXCJcclxuICAgICAgICAgICAgbGVhdmU9XCJ0cmFuc2l0aW9uLWFsbCBlYXNlLWluLW91dCBkdXJhdGlvbi01MDBcIlxyXG4gICAgICAgICAgICBsZWF2ZUZyb209XCJvcGFjaXR5LTEwMFwiXHJcbiAgICAgICAgICAgIGxlYXZlVG89XCJvcGFjaXR5LTBcIlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgZmxleC1jb2xcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8TG9hZGVyPjwvTG9hZGVyPlxyXG4gICAgICAgICAgPC9UcmFuc2l0aW9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiIG10LTEyIG1iLTEyIGZsZXgganVzdGlmeS1jZW50ZXIgc2VsZi1jZW50ZXIgb3ZlcmZsb3cteS1hdXRvIHctOS8xMiBoLXNjcmVlblwiPlxyXG4gICAgICAgICAge3Jlc3VsdHMubGVuZ3RoID4gMCA/IChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGNvbnRlbnQtY2VudGVyIHRleHQtYmFzZSByb3VuZGVkLWxnIHctZnVsbFwiPlxyXG4gICAgICAgICAgICAgIHtyZXN1bHRzLm1hcCgocHJvamVjdCwgaW5kZXgpID0+IChcclxuICAgICAgICAgICAgICAgIDxTZWFyY2hSZXN1bHQgcHJvamVjdD17cHJvamVjdH0ga2V5PXtpbmRleH0+PC9TZWFyY2hSZXN1bHQ+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICB7YXNrZWQgPyAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8VHJhbnNpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGFwcGVhcj17dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICBzaG93PXshaXNMb2FkaW5nfVxyXG4gICAgICAgICAgICAgICAgICAgIGVudGVyPVwidHJhbnNpdGlvbi1hbGwgZWFzZS1pbi1vdXQgZHVyYXRpb24tNTAwIGRlbGF5LVsyMDBtc11cIlxyXG4gICAgICAgICAgICAgICAgICAgIGVudGVyRnJvbT1cIm9wYWNpdHktMCB0cmFuc2xhdGUteS05XCJcclxuICAgICAgICAgICAgICAgICAgICBlbnRlclRvPVwib3BhY2l0eS0xMDAgdHJhbnNsYXRlLXktMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgbGVhdmU9XCJ0cmFuc2l0aW9uLWFsbCBlYXNlLWluLW91dCBkdXJhdGlvbi01MDBcIlxyXG4gICAgICAgICAgICAgICAgICAgIGxlYXZlRnJvbT1cIm9wYWNpdHktMTAwXCJcclxuICAgICAgICAgICAgICAgICAgICBsZWF2ZVRvPVwib3BhY2l0eS0wXCJcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgZmxleC1jb2xcIlxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPE5vdEZvdW5kIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTN4bFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgU29ycnksIHdlIGNvdWxkIG5vdCBmaW5kIGFueXRoaW5nLlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8L1RyYW5zaXRpb24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoQXJlYTtcclxuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJUZXh0YXJlYUF1dG9zaXplIiwiQnV0dG9uIiwiU2VhcmNoUmVzdWx0IiwiTG9hZGVyIiwiTm90Rm91bmQiLCJUcmFuc2l0aW9uIiwiU2VhcmNoR3JlZXRpbmciLCJTZWFyY2hBcmVhIiwic2VhcmNoVGVybSIsInNldFNlYXJjaFRlcm0iLCJyZXN1bHRzIiwic2V0UmVzdWx0IiwiYXNrZWQiLCJzZXRBc2tlZCIsImlzTG9hZGluZyIsInNldExvYWRpbmciLCJoYW5kbGVDaGFuZ2UiLCJ2YWx1ZSIsIm9uRW50ZXJQcmVzcyIsImUiLCJrZXlDb2RlIiwic2hpZnRLZXkiLCJwcmV2ZW50RGVmYXVsdCIsImhhbmRsZUFza2VkIiwiaGFuZGxlU3VibWl0IiwidHJpbSIsImNvbnNvbGUiLCJsb2ciLCJzZW1hbnRpY1NlYXJjaCIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzcG9uc2UiLCJqc29uIiwicmVzdWx0IiwiZGl2IiwiY2xhc3NOYW1lIiwiZm9ybSIsIm9uU3VibWl0Iiwib25LZXlEb3duIiwibWF4Um93cyIsInBsYWNlaG9sZGVyIiwiYXV0b0ZvY3VzIiwib25DaGFuZ2UiLCJ0YXJnZXQiLCJ0eXBlIiwib25DbGljayIsImFwcGVhciIsInNob3ciLCJlbnRlciIsImVudGVyRnJvbSIsImVudGVyVG8iLCJsZWF2ZSIsImxlYXZlRnJvbSIsImxlYXZlVG8iLCJsZW5ndGgiLCJtYXAiLCJwcm9qZWN0IiwiaW5kZXgiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/components/search/SearchArea.tsx\n"));

/***/ })

});