"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/safer-buffer";
exports.ids = ["vendor-chunks/safer-buffer"];
exports.modules = {

/***/ "(rsc)/./node_modules/safer-buffer/safer.js":
/*!********************************************!*\
  !*** ./node_modules/safer-buffer/safer.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/* eslint-disable node/no-deprecated-api */\n\n\n\nvar buffer = __webpack_require__(/*! buffer */ \"buffer\")\nvar Buffer = buffer.Buffer\n\nvar safer = {}\n\nvar key\n\nfor (key in buffer) {\n  if (!buffer.hasOwnProperty(key)) continue\n  if (key === 'SlowBuffer' || key === 'Buffer') continue\n  safer[key] = buffer[key]\n}\n\nvar Safer = safer.Buffer = {}\nfor (key in Buffer) {\n  if (!Buffer.hasOwnProperty(key)) continue\n  if (key === 'allocUnsafe' || key === 'allocUnsafeSlow') continue\n  Safer[key] = Buffer[key]\n}\n\nsafer.Buffer.prototype = Buffer.prototype\n\nif (!Safer.from || Safer.from === Uint8Array.from) {\n  Safer.from = function (value, encodingOrOffset, length) {\n    if (typeof value === 'number') {\n      throw new TypeError('The \"value\" argument must not be of type number. Received type ' + typeof value)\n    }\n    if (value && typeof value.length === 'undefined') {\n      throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' + typeof value)\n    }\n    return Buffer(value, encodingOrOffset, length)\n  }\n}\n\nif (!Safer.alloc) {\n  Safer.alloc = function (size, fill, encoding) {\n    if (typeof size !== 'number') {\n      throw new TypeError('The \"size\" argument must be of type number. Received type ' + typeof size)\n    }\n    if (size < 0 || size >= 2 * (1 << 30)) {\n      throw new RangeError('The value \"' + size + '\" is invalid for option \"size\"')\n    }\n    var buf = Buffer(size)\n    if (!fill || fill.length === 0) {\n      buf.fill(0)\n    } else if (typeof encoding === 'string') {\n      buf.fill(fill, encoding)\n    } else {\n      buf.fill(fill)\n    }\n    return buf\n  }\n}\n\nif (!safer.kStringMaxLength) {\n  try {\n    safer.kStringMaxLength = process.binding('buffer').kStringMaxLength\n  } catch (e) {\n    // we can't determine kStringMaxLength in environments where process.binding\n    // is unsupported, so let's not set it\n  }\n}\n\nif (!safer.constants) {\n  safer.constants = {\n    MAX_LENGTH: safer.kMaxLength\n  }\n  if (safer.kStringMaxLength) {\n    safer.constants.MAX_STRING_LENGTH = safer.kStringMaxLength\n  }\n}\n\nmodule.exports = safer\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvc2FmZXItYnVmZmVyL3NhZmVyLmpzIiwibWFwcGluZ3MiOiJBQUFBOztBQUVZOztBQUVaLGFBQWEsbUJBQU8sQ0FBQyxzQkFBUTtBQUM3Qjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RpZGIvLi9ub2RlX21vZHVsZXMvc2FmZXItYnVmZmVyL3NhZmVyLmpzP2MwNGUiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm9kZS9uby1kZXByZWNhdGVkLWFwaSAqL1xuXG4ndXNlIHN0cmljdCdcblxudmFyIGJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpXG52YXIgQnVmZmVyID0gYnVmZmVyLkJ1ZmZlclxuXG52YXIgc2FmZXIgPSB7fVxuXG52YXIga2V5XG5cbmZvciAoa2V5IGluIGJ1ZmZlcikge1xuICBpZiAoIWJ1ZmZlci5oYXNPd25Qcm9wZXJ0eShrZXkpKSBjb250aW51ZVxuICBpZiAoa2V5ID09PSAnU2xvd0J1ZmZlcicgfHwga2V5ID09PSAnQnVmZmVyJykgY29udGludWVcbiAgc2FmZXJba2V5XSA9IGJ1ZmZlcltrZXldXG59XG5cbnZhciBTYWZlciA9IHNhZmVyLkJ1ZmZlciA9IHt9XG5mb3IgKGtleSBpbiBCdWZmZXIpIHtcbiAgaWYgKCFCdWZmZXIuaGFzT3duUHJvcGVydHkoa2V5KSkgY29udGludWVcbiAgaWYgKGtleSA9PT0gJ2FsbG9jVW5zYWZlJyB8fCBrZXkgPT09ICdhbGxvY1Vuc2FmZVNsb3cnKSBjb250aW51ZVxuICBTYWZlcltrZXldID0gQnVmZmVyW2tleV1cbn1cblxuc2FmZXIuQnVmZmVyLnByb3RvdHlwZSA9IEJ1ZmZlci5wcm90b3R5cGVcblxuaWYgKCFTYWZlci5mcm9tIHx8IFNhZmVyLmZyb20gPT09IFVpbnQ4QXJyYXkuZnJvbSkge1xuICBTYWZlci5mcm9tID0gZnVuY3Rpb24gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwidmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBvZiB0eXBlIG51bWJlci4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIHZhbHVlKVxuICAgIH1cbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlLmxlbmd0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksIG9yIEFycmF5LWxpa2UgT2JqZWN0LiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgdmFsdWUpXG4gICAgfVxuICAgIHJldHVybiBCdWZmZXIodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxufVxuXG5pZiAoIVNhZmVyLmFsbG9jKSB7XG4gIFNhZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gICAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwic2l6ZVwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBudW1iZXIuIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBzaXplKVxuICAgIH1cbiAgICBpZiAoc2l6ZSA8IDAgfHwgc2l6ZSA+PSAyICogKDEgPDwgMzApKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIFwiJyArIHNpemUgKyAnXCIgaXMgaW52YWxpZCBmb3Igb3B0aW9uIFwic2l6ZVwiJylcbiAgICB9XG4gICAgdmFyIGJ1ZiA9IEJ1ZmZlcihzaXplKVxuICAgIGlmICghZmlsbCB8fCBmaWxsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgYnVmLmZpbGwoMClcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGJ1Zi5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgIH0gZWxzZSB7XG4gICAgICBidWYuZmlsbChmaWxsKVxuICAgIH1cbiAgICByZXR1cm4gYnVmXG4gIH1cbn1cblxuaWYgKCFzYWZlci5rU3RyaW5nTWF4TGVuZ3RoKSB7XG4gIHRyeSB7XG4gICAgc2FmZXIua1N0cmluZ01heExlbmd0aCA9IHByb2Nlc3MuYmluZGluZygnYnVmZmVyJykua1N0cmluZ01heExlbmd0aFxuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gd2UgY2FuJ3QgZGV0ZXJtaW5lIGtTdHJpbmdNYXhMZW5ndGggaW4gZW52aXJvbm1lbnRzIHdoZXJlIHByb2Nlc3MuYmluZGluZ1xuICAgIC8vIGlzIHVuc3VwcG9ydGVkLCBzbyBsZXQncyBub3Qgc2V0IGl0XG4gIH1cbn1cblxuaWYgKCFzYWZlci5jb25zdGFudHMpIHtcbiAgc2FmZXIuY29uc3RhbnRzID0ge1xuICAgIE1BWF9MRU5HVEg6IHNhZmVyLmtNYXhMZW5ndGhcbiAgfVxuICBpZiAoc2FmZXIua1N0cmluZ01heExlbmd0aCkge1xuICAgIHNhZmVyLmNvbnN0YW50cy5NQVhfU1RSSU5HX0xFTkdUSCA9IHNhZmVyLmtTdHJpbmdNYXhMZW5ndGhcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNhZmVyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/safer-buffer/safer.js\n");

/***/ })

};
;