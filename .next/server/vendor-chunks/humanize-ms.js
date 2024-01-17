"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/humanize-ms";
exports.ids = ["vendor-chunks/humanize-ms"];
exports.modules = {

/***/ "(rsc)/./node_modules/humanize-ms/index.js":
/*!*******************************************!*\
  !*** ./node_modules/humanize-ms/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*!\n * humanize-ms - index.js\n * Copyright(c) 2014 dead_horse <dead_horse@qq.com>\n * MIT Licensed\n */ \n/**\n * Module dependencies.\n */ var util = __webpack_require__(/*! util */ \"util\");\nvar ms = __webpack_require__(/*! ms */ \"(rsc)/./node_modules/ms/index.js\");\nmodule.exports = function(t) {\n    if (typeof t === \"number\") return t;\n    var r = ms(t);\n    if (r === undefined) {\n        var err = new Error(util.format(\"humanize-ms(%j) result undefined\", t));\n        console.warn(err.stack);\n    }\n    return r;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvaHVtYW5pemUtbXMvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Q0FJQyxHQUVEO0FBRUE7O0NBRUMsR0FFRCxJQUFJQSxPQUFPQyxtQkFBT0EsQ0FBQztBQUNuQixJQUFJQyxLQUFLRCxtQkFBT0EsQ0FBQztBQUVqQkUsT0FBT0MsT0FBTyxHQUFHLFNBQVVDLENBQUM7SUFDMUIsSUFBSSxPQUFPQSxNQUFNLFVBQVUsT0FBT0E7SUFDbEMsSUFBSUMsSUFBSUosR0FBR0c7SUFDWCxJQUFJQyxNQUFNQyxXQUFXO1FBQ25CLElBQUlDLE1BQU0sSUFBSUMsTUFBTVQsS0FBS1UsTUFBTSxDQUFDLG9DQUFvQ0w7UUFDcEVNLFFBQVFDLElBQUksQ0FBQ0osSUFBSUssS0FBSztJQUN4QjtJQUNBLE9BQU9QO0FBQ1QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2VlLXByb3RvLW9uZS8uL25vZGVfbW9kdWxlcy9odW1hbml6ZS1tcy9pbmRleC5qcz9jMWIyIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogaHVtYW5pemUtbXMgLSBpbmRleC5qc1xuICogQ29weXJpZ2h0KGMpIDIwMTQgZGVhZF9ob3JzZSA8ZGVhZF9ob3JzZUBxcS5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcbnZhciBtcyA9IHJlcXVpcmUoJ21zJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHQpIHtcbiAgaWYgKHR5cGVvZiB0ID09PSAnbnVtYmVyJykgcmV0dXJuIHQ7XG4gIHZhciByID0gbXModCk7XG4gIGlmIChyID09PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKHV0aWwuZm9ybWF0KCdodW1hbml6ZS1tcyglaikgcmVzdWx0IHVuZGVmaW5lZCcsIHQpKTtcbiAgICBjb25zb2xlLndhcm4oZXJyLnN0YWNrKTtcbiAgfVxuICByZXR1cm4gcjtcbn07XG4iXSwibmFtZXMiOlsidXRpbCIsInJlcXVpcmUiLCJtcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJ0IiwiciIsInVuZGVmaW5lZCIsImVyciIsIkVycm9yIiwiZm9ybWF0IiwiY29uc29sZSIsIndhcm4iLCJzdGFjayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/humanize-ms/index.js\n");

/***/ })

};
;