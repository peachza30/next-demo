"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/denque";
exports.ids = ["vendor-chunks/denque"];
exports.modules = {

/***/ "(rsc)/./node_modules/denque/index.js":
/*!**************************************!*\
  !*** ./node_modules/denque/index.js ***!
  \**************************************/
/***/ ((module) => {

eval("\n\n/**\n * Custom implementation of a double ended queue.\n */\nfunction Denque(array, options) {\n  var options = options || {};\n  this._capacity = options.capacity;\n\n  this._head = 0;\n  this._tail = 0;\n\n  if (Array.isArray(array)) {\n    this._fromArray(array);\n  } else {\n    this._capacityMask = 0x3;\n    this._list = new Array(4);\n  }\n}\n\n/**\n * --------------\n *  PUBLIC API\n * -------------\n */\n\n/**\n * Returns the item at the specified index from the list.\n * 0 is the first element, 1 is the second, and so on...\n * Elements at negative values are that many from the end: -1 is one before the end\n * (the last element), -2 is two before the end (one before last), etc.\n * @param index\n * @returns {*}\n */\nDenque.prototype.peekAt = function peekAt(index) {\n  var i = index;\n  // expect a number or return undefined\n  if ((i !== (i | 0))) {\n    return void 0;\n  }\n  var len = this.size();\n  if (i >= len || i < -len) return undefined;\n  if (i < 0) i += len;\n  i = (this._head + i) & this._capacityMask;\n  return this._list[i];\n};\n\n/**\n * Alias for peekAt()\n * @param i\n * @returns {*}\n */\nDenque.prototype.get = function get(i) {\n  return this.peekAt(i);\n};\n\n/**\n * Returns the first item in the list without removing it.\n * @returns {*}\n */\nDenque.prototype.peek = function peek() {\n  if (this._head === this._tail) return undefined;\n  return this._list[this._head];\n};\n\n/**\n * Alias for peek()\n * @returns {*}\n */\nDenque.prototype.peekFront = function peekFront() {\n  return this.peek();\n};\n\n/**\n * Returns the item that is at the back of the queue without removing it.\n * Uses peekAt(-1)\n */\nDenque.prototype.peekBack = function peekBack() {\n  return this.peekAt(-1);\n};\n\n/**\n * Returns the current length of the queue\n * @return {Number}\n */\nObject.defineProperty(Denque.prototype, 'length', {\n  get: function length() {\n    return this.size();\n  }\n});\n\n/**\n * Return the number of items on the list, or 0 if empty.\n * @returns {number}\n */\nDenque.prototype.size = function size() {\n  if (this._head === this._tail) return 0;\n  if (this._head < this._tail) return this._tail - this._head;\n  else return this._capacityMask + 1 - (this._head - this._tail);\n};\n\n/**\n * Add an item at the beginning of the list.\n * @param item\n */\nDenque.prototype.unshift = function unshift(item) {\n  if (arguments.length === 0) return this.size();\n  var len = this._list.length;\n  this._head = (this._head - 1 + len) & this._capacityMask;\n  this._list[this._head] = item;\n  if (this._tail === this._head) this._growArray();\n  if (this._capacity && this.size() > this._capacity) this.pop();\n  if (this._head < this._tail) return this._tail - this._head;\n  else return this._capacityMask + 1 - (this._head - this._tail);\n};\n\n/**\n * Remove and return the first item on the list,\n * Returns undefined if the list is empty.\n * @returns {*}\n */\nDenque.prototype.shift = function shift() {\n  var head = this._head;\n  if (head === this._tail) return undefined;\n  var item = this._list[head];\n  this._list[head] = undefined;\n  this._head = (head + 1) & this._capacityMask;\n  if (head < 2 && this._tail > 10000 && this._tail <= this._list.length >>> 2) this._shrinkArray();\n  return item;\n};\n\n/**\n * Add an item to the bottom of the list.\n * @param item\n */\nDenque.prototype.push = function push(item) {\n  if (arguments.length === 0) return this.size();\n  var tail = this._tail;\n  this._list[tail] = item;\n  this._tail = (tail + 1) & this._capacityMask;\n  if (this._tail === this._head) {\n    this._growArray();\n  }\n  if (this._capacity && this.size() > this._capacity) {\n    this.shift();\n  }\n  if (this._head < this._tail) return this._tail - this._head;\n  else return this._capacityMask + 1 - (this._head - this._tail);\n};\n\n/**\n * Remove and return the last item on the list.\n * Returns undefined if the list is empty.\n * @returns {*}\n */\nDenque.prototype.pop = function pop() {\n  var tail = this._tail;\n  if (tail === this._head) return undefined;\n  var len = this._list.length;\n  this._tail = (tail - 1 + len) & this._capacityMask;\n  var item = this._list[this._tail];\n  this._list[this._tail] = undefined;\n  if (this._head < 2 && tail > 10000 && tail <= len >>> 2) this._shrinkArray();\n  return item;\n};\n\n/**\n * Remove and return the item at the specified index from the list.\n * Returns undefined if the list is empty.\n * @param index\n * @returns {*}\n */\nDenque.prototype.removeOne = function removeOne(index) {\n  var i = index;\n  // expect a number or return undefined\n  if ((i !== (i | 0))) {\n    return void 0;\n  }\n  if (this._head === this._tail) return void 0;\n  var size = this.size();\n  var len = this._list.length;\n  if (i >= size || i < -size) return void 0;\n  if (i < 0) i += size;\n  i = (this._head + i) & this._capacityMask;\n  var item = this._list[i];\n  var k;\n  if (index < size / 2) {\n    for (k = index; k > 0; k--) {\n      this._list[i] = this._list[i = (i - 1 + len) & this._capacityMask];\n    }\n    this._list[i] = void 0;\n    this._head = (this._head + 1 + len) & this._capacityMask;\n  } else {\n    for (k = size - 1 - index; k > 0; k--) {\n      this._list[i] = this._list[i = (i + 1 + len) & this._capacityMask];\n    }\n    this._list[i] = void 0;\n    this._tail = (this._tail - 1 + len) & this._capacityMask;\n  }\n  return item;\n};\n\n/**\n * Remove number of items from the specified index from the list.\n * Returns array of removed items.\n * Returns undefined if the list is empty.\n * @param index\n * @param count\n * @returns {array}\n */\nDenque.prototype.remove = function remove(index, count) {\n  var i = index;\n  var removed;\n  var del_count = count;\n  // expect a number or return undefined\n  if ((i !== (i | 0))) {\n    return void 0;\n  }\n  if (this._head === this._tail) return void 0;\n  var size = this.size();\n  var len = this._list.length;\n  if (i >= size || i < -size || count < 1) return void 0;\n  if (i < 0) i += size;\n  if (count === 1 || !count) {\n    removed = new Array(1);\n    removed[0] = this.removeOne(i);\n    return removed;\n  }\n  if (i === 0 && i + count >= size) {\n    removed = this.toArray();\n    this.clear();\n    return removed;\n  }\n  if (i + count > size) count = size - i;\n  var k;\n  removed = new Array(count);\n  for (k = 0; k < count; k++) {\n    removed[k] = this._list[(this._head + i + k) & this._capacityMask];\n  }\n  i = (this._head + i) & this._capacityMask;\n  if (index + count === size) {\n    this._tail = (this._tail - count + len) & this._capacityMask;\n    for (k = count; k > 0; k--) {\n      this._list[i = (i + 1 + len) & this._capacityMask] = void 0;\n    }\n    return removed;\n  }\n  if (index === 0) {\n    this._head = (this._head + count + len) & this._capacityMask;\n    for (k = count - 1; k > 0; k--) {\n      this._list[i = (i + 1 + len) & this._capacityMask] = void 0;\n    }\n    return removed;\n  }\n  if (i < size / 2) {\n    this._head = (this._head + index + count + len) & this._capacityMask;\n    for (k = index; k > 0; k--) {\n      this.unshift(this._list[i = (i - 1 + len) & this._capacityMask]);\n    }\n    i = (this._head - 1 + len) & this._capacityMask;\n    while (del_count > 0) {\n      this._list[i = (i - 1 + len) & this._capacityMask] = void 0;\n      del_count--;\n    }\n    if (index < 0) this._tail = i;\n  } else {\n    this._tail = i;\n    i = (i + count + len) & this._capacityMask;\n    for (k = size - (count + index); k > 0; k--) {\n      this.push(this._list[i++]);\n    }\n    i = this._tail;\n    while (del_count > 0) {\n      this._list[i = (i + 1 + len) & this._capacityMask] = void 0;\n      del_count--;\n    }\n  }\n  if (this._head < 2 && this._tail > 10000 && this._tail <= len >>> 2) this._shrinkArray();\n  return removed;\n};\n\n/**\n * Native splice implementation.\n * Remove number of items from the specified index from the list and/or add new elements.\n * Returns array of removed items or empty array if count == 0.\n * Returns undefined if the list is empty.\n *\n * @param index\n * @param count\n * @param {...*} [elements]\n * @returns {array}\n */\nDenque.prototype.splice = function splice(index, count) {\n  var i = index;\n  // expect a number or return undefined\n  if ((i !== (i | 0))) {\n    return void 0;\n  }\n  var size = this.size();\n  if (i < 0) i += size;\n  if (i > size) return void 0;\n  if (arguments.length > 2) {\n    var k;\n    var temp;\n    var removed;\n    var arg_len = arguments.length;\n    var len = this._list.length;\n    var arguments_index = 2;\n    if (!size || i < size / 2) {\n      temp = new Array(i);\n      for (k = 0; k < i; k++) {\n        temp[k] = this._list[(this._head + k) & this._capacityMask];\n      }\n      if (count === 0) {\n        removed = [];\n        if (i > 0) {\n          this._head = (this._head + i + len) & this._capacityMask;\n        }\n      } else {\n        removed = this.remove(i, count);\n        this._head = (this._head + i + len) & this._capacityMask;\n      }\n      while (arg_len > arguments_index) {\n        this.unshift(arguments[--arg_len]);\n      }\n      for (k = i; k > 0; k--) {\n        this.unshift(temp[k - 1]);\n      }\n    } else {\n      temp = new Array(size - (i + count));\n      var leng = temp.length;\n      for (k = 0; k < leng; k++) {\n        temp[k] = this._list[(this._head + i + count + k) & this._capacityMask];\n      }\n      if (count === 0) {\n        removed = [];\n        if (i != size) {\n          this._tail = (this._head + i + len) & this._capacityMask;\n        }\n      } else {\n        removed = this.remove(i, count);\n        this._tail = (this._tail - leng + len) & this._capacityMask;\n      }\n      while (arguments_index < arg_len) {\n        this.push(arguments[arguments_index++]);\n      }\n      for (k = 0; k < leng; k++) {\n        this.push(temp[k]);\n      }\n    }\n    return removed;\n  } else {\n    return this.remove(i, count);\n  }\n};\n\n/**\n * Soft clear - does not reset capacity.\n */\nDenque.prototype.clear = function clear() {\n  this._list = new Array(this._list.length);\n  this._head = 0;\n  this._tail = 0;\n};\n\n/**\n * Returns true or false whether the list is empty.\n * @returns {boolean}\n */\nDenque.prototype.isEmpty = function isEmpty() {\n  return this._head === this._tail;\n};\n\n/**\n * Returns an array of all queue items.\n * @returns {Array}\n */\nDenque.prototype.toArray = function toArray() {\n  return this._copyArray(false);\n};\n\n/**\n * -------------\n *   INTERNALS\n * -------------\n */\n\n/**\n * Fills the queue with items from an array\n * For use in the constructor\n * @param array\n * @private\n */\nDenque.prototype._fromArray = function _fromArray(array) {\n  var length = array.length;\n  var capacity = this._nextPowerOf2(length);\n\n  this._list = new Array(capacity);\n  this._capacityMask = capacity - 1;\n  this._tail = length;\n\n  for (var i = 0; i < length; i++) this._list[i] = array[i];\n};\n\n/**\n *\n * @param fullCopy\n * @param size Initialize the array with a specific size. Will default to the current list size\n * @returns {Array}\n * @private\n */\nDenque.prototype._copyArray = function _copyArray(fullCopy, size) {\n  var src = this._list;\n  var capacity = src.length;\n  var length = this.length;\n  size = size | length;\n\n  // No prealloc requested and the buffer is contiguous\n  if (size == length && this._head < this._tail) {\n    // Simply do a fast slice copy\n    return this._list.slice(this._head, this._tail);\n  }\n\n  var dest = new Array(size);\n\n  var k = 0;\n  var i;\n  if (fullCopy || this._head > this._tail) {\n    for (i = this._head; i < capacity; i++) dest[k++] = src[i];\n    for (i = 0; i < this._tail; i++) dest[k++] = src[i];\n  } else {\n    for (i = this._head; i < this._tail; i++) dest[k++] = src[i];\n  }\n\n  return dest;\n}\n\n/**\n * Grows the internal list array.\n * @private\n */\nDenque.prototype._growArray = function _growArray() {\n  if (this._head != 0) {\n    // double array size and copy existing data, head to end, then beginning to tail.\n    var newList = this._copyArray(true, this._list.length << 1);\n\n    this._tail = this._list.length;\n    this._head = 0;\n\n    this._list = newList;\n  } else {\n    this._tail = this._list.length;\n    this._list.length <<= 1;\n  }\n\n  this._capacityMask = (this._capacityMask << 1) | 1;\n};\n\n/**\n * Shrinks the internal list array.\n * @private\n */\nDenque.prototype._shrinkArray = function _shrinkArray() {\n  this._list.length >>>= 1;\n  this._capacityMask >>>= 1;\n};\n\n/**\n * Find the next power of 2, at least 4\n * @private\n * @param {number} num \n * @returns {number}\n */\nDenque.prototype._nextPowerOf2 = function _nextPowerOf2(num) {\n  var log2 = Math.log(num) / Math.log(2);\n  var nextPow2 = 1 << (log2 + 1);\n\n  return Math.max(nextPow2, 4);\n}\n\nmodule.exports = Denque;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvZGVucXVlL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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ZGVfbW9kdWxlcy9kZW5xdWUvaW5kZXguanM/OTUxNyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3VzdG9tIGltcGxlbWVudGF0aW9uIG9mIGEgZG91YmxlIGVuZGVkIHF1ZXVlLlxuICovXG5mdW5jdGlvbiBEZW5xdWUoYXJyYXksIG9wdGlvbnMpIHtcbiAgdmFyIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB0aGlzLl9jYXBhY2l0eSA9IG9wdGlvbnMuY2FwYWNpdHk7XG5cbiAgdGhpcy5faGVhZCA9IDA7XG4gIHRoaXMuX3RhaWwgPSAwO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGFycmF5KSkge1xuICAgIHRoaXMuX2Zyb21BcnJheShhcnJheSk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fY2FwYWNpdHlNYXNrID0gMHgzO1xuICAgIHRoaXMuX2xpc3QgPSBuZXcgQXJyYXkoNCk7XG4gIH1cbn1cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLVxuICogIFBVQkxJQyBBUElcbiAqIC0tLS0tLS0tLS0tLS1cbiAqL1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGl0ZW0gYXQgdGhlIHNwZWNpZmllZCBpbmRleCBmcm9tIHRoZSBsaXN0LlxuICogMCBpcyB0aGUgZmlyc3QgZWxlbWVudCwgMSBpcyB0aGUgc2Vjb25kLCBhbmQgc28gb24uLi5cbiAqIEVsZW1lbnRzIGF0IG5lZ2F0aXZlIHZhbHVlcyBhcmUgdGhhdCBtYW55IGZyb20gdGhlIGVuZDogLTEgaXMgb25lIGJlZm9yZSB0aGUgZW5kXG4gKiAodGhlIGxhc3QgZWxlbWVudCksIC0yIGlzIHR3byBiZWZvcmUgdGhlIGVuZCAob25lIGJlZm9yZSBsYXN0KSwgZXRjLlxuICogQHBhcmFtIGluZGV4XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuRGVucXVlLnByb3RvdHlwZS5wZWVrQXQgPSBmdW5jdGlvbiBwZWVrQXQoaW5kZXgpIHtcbiAgdmFyIGkgPSBpbmRleDtcbiAgLy8gZXhwZWN0IGEgbnVtYmVyIG9yIHJldHVybiB1bmRlZmluZWRcbiAgaWYgKChpICE9PSAoaSB8IDApKSkge1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cbiAgdmFyIGxlbiA9IHRoaXMuc2l6ZSgpO1xuICBpZiAoaSA+PSBsZW4gfHwgaSA8IC1sZW4pIHJldHVybiB1bmRlZmluZWQ7XG4gIGlmIChpIDwgMCkgaSArPSBsZW47XG4gIGkgPSAodGhpcy5faGVhZCArIGkpICYgdGhpcy5fY2FwYWNpdHlNYXNrO1xuICByZXR1cm4gdGhpcy5fbGlzdFtpXTtcbn07XG5cbi8qKlxuICogQWxpYXMgZm9yIHBlZWtBdCgpXG4gKiBAcGFyYW0gaVxuICogQHJldHVybnMgeyp9XG4gKi9cbkRlbnF1ZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KGkpIHtcbiAgcmV0dXJuIHRoaXMucGVla0F0KGkpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBmaXJzdCBpdGVtIGluIHRoZSBsaXN0IHdpdGhvdXQgcmVtb3ZpbmcgaXQuXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuRGVucXVlLnByb3RvdHlwZS5wZWVrID0gZnVuY3Rpb24gcGVlaygpIHtcbiAgaWYgKHRoaXMuX2hlYWQgPT09IHRoaXMuX3RhaWwpIHJldHVybiB1bmRlZmluZWQ7XG4gIHJldHVybiB0aGlzLl9saXN0W3RoaXMuX2hlYWRdO1xufTtcblxuLyoqXG4gKiBBbGlhcyBmb3IgcGVlaygpXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuRGVucXVlLnByb3RvdHlwZS5wZWVrRnJvbnQgPSBmdW5jdGlvbiBwZWVrRnJvbnQoKSB7XG4gIHJldHVybiB0aGlzLnBlZWsoKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgaXRlbSB0aGF0IGlzIGF0IHRoZSBiYWNrIG9mIHRoZSBxdWV1ZSB3aXRob3V0IHJlbW92aW5nIGl0LlxuICogVXNlcyBwZWVrQXQoLTEpXG4gKi9cbkRlbnF1ZS5wcm90b3R5cGUucGVla0JhY2sgPSBmdW5jdGlvbiBwZWVrQmFjaygpIHtcbiAgcmV0dXJuIHRoaXMucGVla0F0KC0xKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgY3VycmVudCBsZW5ndGggb2YgdGhlIHF1ZXVlXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShEZW5xdWUucHJvdG90eXBlLCAnbGVuZ3RoJywge1xuICBnZXQ6IGZ1bmN0aW9uIGxlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy5zaXplKCk7XG4gIH1cbn0pO1xuXG4vKipcbiAqIFJldHVybiB0aGUgbnVtYmVyIG9mIGl0ZW1zIG9uIHRoZSBsaXN0LCBvciAwIGlmIGVtcHR5LlxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuRGVucXVlLnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24gc2l6ZSgpIHtcbiAgaWYgKHRoaXMuX2hlYWQgPT09IHRoaXMuX3RhaWwpIHJldHVybiAwO1xuICBpZiAodGhpcy5faGVhZCA8IHRoaXMuX3RhaWwpIHJldHVybiB0aGlzLl90YWlsIC0gdGhpcy5faGVhZDtcbiAgZWxzZSByZXR1cm4gdGhpcy5fY2FwYWNpdHlNYXNrICsgMSAtICh0aGlzLl9oZWFkIC0gdGhpcy5fdGFpbCk7XG59O1xuXG4vKipcbiAqIEFkZCBhbiBpdGVtIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3QuXG4gKiBAcGFyYW0gaXRlbVxuICovXG5EZW5xdWUucHJvdG90eXBlLnVuc2hpZnQgPSBmdW5jdGlvbiB1bnNoaWZ0KGl0ZW0pIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB0aGlzLnNpemUoKTtcbiAgdmFyIGxlbiA9IHRoaXMuX2xpc3QubGVuZ3RoO1xuICB0aGlzLl9oZWFkID0gKHRoaXMuX2hlYWQgLSAxICsgbGVuKSAmIHRoaXMuX2NhcGFjaXR5TWFzaztcbiAgdGhpcy5fbGlzdFt0aGlzLl9oZWFkXSA9IGl0ZW07XG4gIGlmICh0aGlzLl90YWlsID09PSB0aGlzLl9oZWFkKSB0aGlzLl9ncm93QXJyYXkoKTtcbiAgaWYgKHRoaXMuX2NhcGFjaXR5ICYmIHRoaXMuc2l6ZSgpID4gdGhpcy5fY2FwYWNpdHkpIHRoaXMucG9wKCk7XG4gIGlmICh0aGlzLl9oZWFkIDwgdGhpcy5fdGFpbCkgcmV0dXJuIHRoaXMuX3RhaWwgLSB0aGlzLl9oZWFkO1xuICBlbHNlIHJldHVybiB0aGlzLl9jYXBhY2l0eU1hc2sgKyAxIC0gKHRoaXMuX2hlYWQgLSB0aGlzLl90YWlsKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuZCByZXR1cm4gdGhlIGZpcnN0IGl0ZW0gb24gdGhlIGxpc3QsXG4gKiBSZXR1cm5zIHVuZGVmaW5lZCBpZiB0aGUgbGlzdCBpcyBlbXB0eS5cbiAqIEByZXR1cm5zIHsqfVxuICovXG5EZW5xdWUucHJvdG90eXBlLnNoaWZ0ID0gZnVuY3Rpb24gc2hpZnQoKSB7XG4gIHZhciBoZWFkID0gdGhpcy5faGVhZDtcbiAgaWYgKGhlYWQgPT09IHRoaXMuX3RhaWwpIHJldHVybiB1bmRlZmluZWQ7XG4gIHZhciBpdGVtID0gdGhpcy5fbGlzdFtoZWFkXTtcbiAgdGhpcy5fbGlzdFtoZWFkXSA9IHVuZGVmaW5lZDtcbiAgdGhpcy5faGVhZCA9IChoZWFkICsgMSkgJiB0aGlzLl9jYXBhY2l0eU1hc2s7XG4gIGlmIChoZWFkIDwgMiAmJiB0aGlzLl90YWlsID4gMTAwMDAgJiYgdGhpcy5fdGFpbCA8PSB0aGlzLl9saXN0Lmxlbmd0aCA+Pj4gMikgdGhpcy5fc2hyaW5rQXJyYXkoKTtcbiAgcmV0dXJuIGl0ZW07XG59O1xuXG4vKipcbiAqIEFkZCBhbiBpdGVtIHRvIHRoZSBib3R0b20gb2YgdGhlIGxpc3QuXG4gKiBAcGFyYW0gaXRlbVxuICovXG5EZW5xdWUucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiBwdXNoKGl0ZW0pIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB0aGlzLnNpemUoKTtcbiAgdmFyIHRhaWwgPSB0aGlzLl90YWlsO1xuICB0aGlzLl9saXN0W3RhaWxdID0gaXRlbTtcbiAgdGhpcy5fdGFpbCA9ICh0YWlsICsgMSkgJiB0aGlzLl9jYXBhY2l0eU1hc2s7XG4gIGlmICh0aGlzLl90YWlsID09PSB0aGlzLl9oZWFkKSB7XG4gICAgdGhpcy5fZ3Jvd0FycmF5KCk7XG4gIH1cbiAgaWYgKHRoaXMuX2NhcGFjaXR5ICYmIHRoaXMuc2l6ZSgpID4gdGhpcy5fY2FwYWNpdHkpIHtcbiAgICB0aGlzLnNoaWZ0KCk7XG4gIH1cbiAgaWYgKHRoaXMuX2hlYWQgPCB0aGlzLl90YWlsKSByZXR1cm4gdGhpcy5fdGFpbCAtIHRoaXMuX2hlYWQ7XG4gIGVsc2UgcmV0dXJuIHRoaXMuX2NhcGFjaXR5TWFzayArIDEgLSAodGhpcy5faGVhZCAtIHRoaXMuX3RhaWwpO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW5kIHJldHVybiB0aGUgbGFzdCBpdGVtIG9uIHRoZSBsaXN0LlxuICogUmV0dXJucyB1bmRlZmluZWQgaWYgdGhlIGxpc3QgaXMgZW1wdHkuXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuRGVucXVlLnByb3RvdHlwZS5wb3AgPSBmdW5jdGlvbiBwb3AoKSB7XG4gIHZhciB0YWlsID0gdGhpcy5fdGFpbDtcbiAgaWYgKHRhaWwgPT09IHRoaXMuX2hlYWQpIHJldHVybiB1bmRlZmluZWQ7XG4gIHZhciBsZW4gPSB0aGlzLl9saXN0Lmxlbmd0aDtcbiAgdGhpcy5fdGFpbCA9ICh0YWlsIC0gMSArIGxlbikgJiB0aGlzLl9jYXBhY2l0eU1hc2s7XG4gIHZhciBpdGVtID0gdGhpcy5fbGlzdFt0aGlzLl90YWlsXTtcbiAgdGhpcy5fbGlzdFt0aGlzLl90YWlsXSA9IHVuZGVmaW5lZDtcbiAgaWYgKHRoaXMuX2hlYWQgPCAyICYmIHRhaWwgPiAxMDAwMCAmJiB0YWlsIDw9IGxlbiA+Pj4gMikgdGhpcy5fc2hyaW5rQXJyYXkoKTtcbiAgcmV0dXJuIGl0ZW07XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbmQgcmV0dXJuIHRoZSBpdGVtIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXggZnJvbSB0aGUgbGlzdC5cbiAqIFJldHVybnMgdW5kZWZpbmVkIGlmIHRoZSBsaXN0IGlzIGVtcHR5LlxuICogQHBhcmFtIGluZGV4XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuRGVucXVlLnByb3RvdHlwZS5yZW1vdmVPbmUgPSBmdW5jdGlvbiByZW1vdmVPbmUoaW5kZXgpIHtcbiAgdmFyIGkgPSBpbmRleDtcbiAgLy8gZXhwZWN0IGEgbnVtYmVyIG9yIHJldHVybiB1bmRlZmluZWRcbiAgaWYgKChpICE9PSAoaSB8IDApKSkge1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cbiAgaWYgKHRoaXMuX2hlYWQgPT09IHRoaXMuX3RhaWwpIHJldHVybiB2b2lkIDA7XG4gIHZhciBzaXplID0gdGhpcy5zaXplKCk7XG4gIHZhciBsZW4gPSB0aGlzLl9saXN0Lmxlbmd0aDtcbiAgaWYgKGkgPj0gc2l6ZSB8fCBpIDwgLXNpemUpIHJldHVybiB2b2lkIDA7XG4gIGlmIChpIDwgMCkgaSArPSBzaXplO1xuICBpID0gKHRoaXMuX2hlYWQgKyBpKSAmIHRoaXMuX2NhcGFjaXR5TWFzaztcbiAgdmFyIGl0ZW0gPSB0aGlzLl9saXN0W2ldO1xuICB2YXIgaztcbiAgaWYgKGluZGV4IDwgc2l6ZSAvIDIpIHtcbiAgICBmb3IgKGsgPSBpbmRleDsgayA+IDA7IGstLSkge1xuICAgICAgdGhpcy5fbGlzdFtpXSA9IHRoaXMuX2xpc3RbaSA9IChpIC0gMSArIGxlbikgJiB0aGlzLl9jYXBhY2l0eU1hc2tdO1xuICAgIH1cbiAgICB0aGlzLl9saXN0W2ldID0gdm9pZCAwO1xuICAgIHRoaXMuX2hlYWQgPSAodGhpcy5faGVhZCArIDEgKyBsZW4pICYgdGhpcy5fY2FwYWNpdHlNYXNrO1xuICB9IGVsc2Uge1xuICAgIGZvciAoayA9IHNpemUgLSAxIC0gaW5kZXg7IGsgPiAwOyBrLS0pIHtcbiAgICAgIHRoaXMuX2xpc3RbaV0gPSB0aGlzLl9saXN0W2kgPSAoaSArIDEgKyBsZW4pICYgdGhpcy5fY2FwYWNpdHlNYXNrXTtcbiAgICB9XG4gICAgdGhpcy5fbGlzdFtpXSA9IHZvaWQgMDtcbiAgICB0aGlzLl90YWlsID0gKHRoaXMuX3RhaWwgLSAxICsgbGVuKSAmIHRoaXMuX2NhcGFjaXR5TWFzaztcbiAgfVxuICByZXR1cm4gaXRlbTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIG51bWJlciBvZiBpdGVtcyBmcm9tIHRoZSBzcGVjaWZpZWQgaW5kZXggZnJvbSB0aGUgbGlzdC5cbiAqIFJldHVybnMgYXJyYXkgb2YgcmVtb3ZlZCBpdGVtcy5cbiAqIFJldHVybnMgdW5kZWZpbmVkIGlmIHRoZSBsaXN0IGlzIGVtcHR5LlxuICogQHBhcmFtIGluZGV4XG4gKiBAcGFyYW0gY291bnRcbiAqIEByZXR1cm5zIHthcnJheX1cbiAqL1xuRGVucXVlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoaW5kZXgsIGNvdW50KSB7XG4gIHZhciBpID0gaW5kZXg7XG4gIHZhciByZW1vdmVkO1xuICB2YXIgZGVsX2NvdW50ID0gY291bnQ7XG4gIC8vIGV4cGVjdCBhIG51bWJlciBvciByZXR1cm4gdW5kZWZpbmVkXG4gIGlmICgoaSAhPT0gKGkgfCAwKSkpIHtcbiAgICByZXR1cm4gdm9pZCAwO1xuICB9XG4gIGlmICh0aGlzLl9oZWFkID09PSB0aGlzLl90YWlsKSByZXR1cm4gdm9pZCAwO1xuICB2YXIgc2l6ZSA9IHRoaXMuc2l6ZSgpO1xuICB2YXIgbGVuID0gdGhpcy5fbGlzdC5sZW5ndGg7XG4gIGlmIChpID49IHNpemUgfHwgaSA8IC1zaXplIHx8IGNvdW50IDwgMSkgcmV0dXJuIHZvaWQgMDtcbiAgaWYgKGkgPCAwKSBpICs9IHNpemU7XG4gIGlmIChjb3VudCA9PT0gMSB8fCAhY291bnQpIHtcbiAgICByZW1vdmVkID0gbmV3IEFycmF5KDEpO1xuICAgIHJlbW92ZWRbMF0gPSB0aGlzLnJlbW92ZU9uZShpKTtcbiAgICByZXR1cm4gcmVtb3ZlZDtcbiAgfVxuICBpZiAoaSA9PT0gMCAmJiBpICsgY291bnQgPj0gc2l6ZSkge1xuICAgIHJlbW92ZWQgPSB0aGlzLnRvQXJyYXkoKTtcbiAgICB0aGlzLmNsZWFyKCk7XG4gICAgcmV0dXJuIHJlbW92ZWQ7XG4gIH1cbiAgaWYgKGkgKyBjb3VudCA+IHNpemUpIGNvdW50ID0gc2l6ZSAtIGk7XG4gIHZhciBrO1xuICByZW1vdmVkID0gbmV3IEFycmF5KGNvdW50KTtcbiAgZm9yIChrID0gMDsgayA8IGNvdW50OyBrKyspIHtcbiAgICByZW1vdmVkW2tdID0gdGhpcy5fbGlzdFsodGhpcy5faGVhZCArIGkgKyBrKSAmIHRoaXMuX2NhcGFjaXR5TWFza107XG4gIH1cbiAgaSA9ICh0aGlzLl9oZWFkICsgaSkgJiB0aGlzLl9jYXBhY2l0eU1hc2s7XG4gIGlmIChpbmRleCArIGNvdW50ID09PSBzaXplKSB7XG4gICAgdGhpcy5fdGFpbCA9ICh0aGlzLl90YWlsIC0gY291bnQgKyBsZW4pICYgdGhpcy5fY2FwYWNpdHlNYXNrO1xuICAgIGZvciAoayA9IGNvdW50OyBrID4gMDsgay0tKSB7XG4gICAgICB0aGlzLl9saXN0W2kgPSAoaSArIDEgKyBsZW4pICYgdGhpcy5fY2FwYWNpdHlNYXNrXSA9IHZvaWQgMDtcbiAgICB9XG4gICAgcmV0dXJuIHJlbW92ZWQ7XG4gIH1cbiAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgdGhpcy5faGVhZCA9ICh0aGlzLl9oZWFkICsgY291bnQgKyBsZW4pICYgdGhpcy5fY2FwYWNpdHlNYXNrO1xuICAgIGZvciAoayA9IGNvdW50IC0gMTsgayA+IDA7IGstLSkge1xuICAgICAgdGhpcy5fbGlzdFtpID0gKGkgKyAxICsgbGVuKSAmIHRoaXMuX2NhcGFjaXR5TWFza10gPSB2b2lkIDA7XG4gICAgfVxuICAgIHJldHVybiByZW1vdmVkO1xuICB9XG4gIGlmIChpIDwgc2l6ZSAvIDIpIHtcbiAgICB0aGlzLl9oZWFkID0gKHRoaXMuX2hlYWQgKyBpbmRleCArIGNvdW50ICsgbGVuKSAmIHRoaXMuX2NhcGFjaXR5TWFzaztcbiAgICBmb3IgKGsgPSBpbmRleDsgayA+IDA7IGstLSkge1xuICAgICAgdGhpcy51bnNoaWZ0KHRoaXMuX2xpc3RbaSA9IChpIC0gMSArIGxlbikgJiB0aGlzLl9jYXBhY2l0eU1hc2tdKTtcbiAgICB9XG4gICAgaSA9ICh0aGlzLl9oZWFkIC0gMSArIGxlbikgJiB0aGlzLl9jYXBhY2l0eU1hc2s7XG4gICAgd2hpbGUgKGRlbF9jb3VudCA+IDApIHtcbiAgICAgIHRoaXMuX2xpc3RbaSA9IChpIC0gMSArIGxlbikgJiB0aGlzLl9jYXBhY2l0eU1hc2tdID0gdm9pZCAwO1xuICAgICAgZGVsX2NvdW50LS07XG4gICAgfVxuICAgIGlmIChpbmRleCA8IDApIHRoaXMuX3RhaWwgPSBpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX3RhaWwgPSBpO1xuICAgIGkgPSAoaSArIGNvdW50ICsgbGVuKSAmIHRoaXMuX2NhcGFjaXR5TWFzaztcbiAgICBmb3IgKGsgPSBzaXplIC0gKGNvdW50ICsgaW5kZXgpOyBrID4gMDsgay0tKSB7XG4gICAgICB0aGlzLnB1c2godGhpcy5fbGlzdFtpKytdKTtcbiAgICB9XG4gICAgaSA9IHRoaXMuX3RhaWw7XG4gICAgd2hpbGUgKGRlbF9jb3VudCA+IDApIHtcbiAgICAgIHRoaXMuX2xpc3RbaSA9IChpICsgMSArIGxlbikgJiB0aGlzLl9jYXBhY2l0eU1hc2tdID0gdm9pZCAwO1xuICAgICAgZGVsX2NvdW50LS07XG4gICAgfVxuICB9XG4gIGlmICh0aGlzLl9oZWFkIDwgMiAmJiB0aGlzLl90YWlsID4gMTAwMDAgJiYgdGhpcy5fdGFpbCA8PSBsZW4gPj4+IDIpIHRoaXMuX3Nocmlua0FycmF5KCk7XG4gIHJldHVybiByZW1vdmVkO1xufTtcblxuLyoqXG4gKiBOYXRpdmUgc3BsaWNlIGltcGxlbWVudGF0aW9uLlxuICogUmVtb3ZlIG51bWJlciBvZiBpdGVtcyBmcm9tIHRoZSBzcGVjaWZpZWQgaW5kZXggZnJvbSB0aGUgbGlzdCBhbmQvb3IgYWRkIG5ldyBlbGVtZW50cy5cbiAqIFJldHVybnMgYXJyYXkgb2YgcmVtb3ZlZCBpdGVtcyBvciBlbXB0eSBhcnJheSBpZiBjb3VudCA9PSAwLlxuICogUmV0dXJucyB1bmRlZmluZWQgaWYgdGhlIGxpc3QgaXMgZW1wdHkuXG4gKlxuICogQHBhcmFtIGluZGV4XG4gKiBAcGFyYW0gY291bnRcbiAqIEBwYXJhbSB7Li4uKn0gW2VsZW1lbnRzXVxuICogQHJldHVybnMge2FycmF5fVxuICovXG5EZW5xdWUucHJvdG90eXBlLnNwbGljZSA9IGZ1bmN0aW9uIHNwbGljZShpbmRleCwgY291bnQpIHtcbiAgdmFyIGkgPSBpbmRleDtcbiAgLy8gZXhwZWN0IGEgbnVtYmVyIG9yIHJldHVybiB1bmRlZmluZWRcbiAgaWYgKChpICE9PSAoaSB8IDApKSkge1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cbiAgdmFyIHNpemUgPSB0aGlzLnNpemUoKTtcbiAgaWYgKGkgPCAwKSBpICs9IHNpemU7XG4gIGlmIChpID4gc2l6ZSkgcmV0dXJuIHZvaWQgMDtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKSB7XG4gICAgdmFyIGs7XG4gICAgdmFyIHRlbXA7XG4gICAgdmFyIHJlbW92ZWQ7XG4gICAgdmFyIGFyZ19sZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHZhciBsZW4gPSB0aGlzLl9saXN0Lmxlbmd0aDtcbiAgICB2YXIgYXJndW1lbnRzX2luZGV4ID0gMjtcbiAgICBpZiAoIXNpemUgfHwgaSA8IHNpemUgLyAyKSB7XG4gICAgICB0ZW1wID0gbmV3IEFycmF5KGkpO1xuICAgICAgZm9yIChrID0gMDsgayA8IGk7IGsrKykge1xuICAgICAgICB0ZW1wW2tdID0gdGhpcy5fbGlzdFsodGhpcy5faGVhZCArIGspICYgdGhpcy5fY2FwYWNpdHlNYXNrXTtcbiAgICAgIH1cbiAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICByZW1vdmVkID0gW107XG4gICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgIHRoaXMuX2hlYWQgPSAodGhpcy5faGVhZCArIGkgKyBsZW4pICYgdGhpcy5fY2FwYWNpdHlNYXNrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmVkID0gdGhpcy5yZW1vdmUoaSwgY291bnQpO1xuICAgICAgICB0aGlzLl9oZWFkID0gKHRoaXMuX2hlYWQgKyBpICsgbGVuKSAmIHRoaXMuX2NhcGFjaXR5TWFzaztcbiAgICAgIH1cbiAgICAgIHdoaWxlIChhcmdfbGVuID4gYXJndW1lbnRzX2luZGV4KSB7XG4gICAgICAgIHRoaXMudW5zaGlmdChhcmd1bWVudHNbLS1hcmdfbGVuXSk7XG4gICAgICB9XG4gICAgICBmb3IgKGsgPSBpOyBrID4gMDsgay0tKSB7XG4gICAgICAgIHRoaXMudW5zaGlmdCh0ZW1wW2sgLSAxXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRlbXAgPSBuZXcgQXJyYXkoc2l6ZSAtIChpICsgY291bnQpKTtcbiAgICAgIHZhciBsZW5nID0gdGVtcC5sZW5ndGg7XG4gICAgICBmb3IgKGsgPSAwOyBrIDwgbGVuZzsgaysrKSB7XG4gICAgICAgIHRlbXBba10gPSB0aGlzLl9saXN0Wyh0aGlzLl9oZWFkICsgaSArIGNvdW50ICsgaykgJiB0aGlzLl9jYXBhY2l0eU1hc2tdO1xuICAgICAgfVxuICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgIHJlbW92ZWQgPSBbXTtcbiAgICAgICAgaWYgKGkgIT0gc2l6ZSkge1xuICAgICAgICAgIHRoaXMuX3RhaWwgPSAodGhpcy5faGVhZCArIGkgKyBsZW4pICYgdGhpcy5fY2FwYWNpdHlNYXNrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmVkID0gdGhpcy5yZW1vdmUoaSwgY291bnQpO1xuICAgICAgICB0aGlzLl90YWlsID0gKHRoaXMuX3RhaWwgLSBsZW5nICsgbGVuKSAmIHRoaXMuX2NhcGFjaXR5TWFzaztcbiAgICAgIH1cbiAgICAgIHdoaWxlIChhcmd1bWVudHNfaW5kZXggPCBhcmdfbGVuKSB7XG4gICAgICAgIHRoaXMucHVzaChhcmd1bWVudHNbYXJndW1lbnRzX2luZGV4KytdKTtcbiAgICAgIH1cbiAgICAgIGZvciAoayA9IDA7IGsgPCBsZW5nOyBrKyspIHtcbiAgICAgICAgdGhpcy5wdXNoKHRlbXBba10pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVtb3ZlZDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdGhpcy5yZW1vdmUoaSwgY291bnQpO1xuICB9XG59O1xuXG4vKipcbiAqIFNvZnQgY2xlYXIgLSBkb2VzIG5vdCByZXNldCBjYXBhY2l0eS5cbiAqL1xuRGVucXVlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICB0aGlzLl9saXN0ID0gbmV3IEFycmF5KHRoaXMuX2xpc3QubGVuZ3RoKTtcbiAgdGhpcy5faGVhZCA9IDA7XG4gIHRoaXMuX3RhaWwgPSAwO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgb3IgZmFsc2Ugd2hldGhlciB0aGUgbGlzdCBpcyBlbXB0eS5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5EZW5xdWUucHJvdG90eXBlLmlzRW1wdHkgPSBmdW5jdGlvbiBpc0VtcHR5KCkge1xuICByZXR1cm4gdGhpcy5faGVhZCA9PT0gdGhpcy5fdGFpbDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBvZiBhbGwgcXVldWUgaXRlbXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbkRlbnF1ZS5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uIHRvQXJyYXkoKSB7XG4gIHJldHVybiB0aGlzLl9jb3B5QXJyYXkoZmFsc2UpO1xufTtcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tXG4gKiAgIElOVEVSTkFMU1xuICogLS0tLS0tLS0tLS0tLVxuICovXG5cbi8qKlxuICogRmlsbHMgdGhlIHF1ZXVlIHdpdGggaXRlbXMgZnJvbSBhbiBhcnJheVxuICogRm9yIHVzZSBpbiB0aGUgY29uc3RydWN0b3JcbiAqIEBwYXJhbSBhcnJheVxuICogQHByaXZhdGVcbiAqL1xuRGVucXVlLnByb3RvdHlwZS5fZnJvbUFycmF5ID0gZnVuY3Rpb24gX2Zyb21BcnJheShhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB2YXIgY2FwYWNpdHkgPSB0aGlzLl9uZXh0UG93ZXJPZjIobGVuZ3RoKTtcblxuICB0aGlzLl9saXN0ID0gbmV3IEFycmF5KGNhcGFjaXR5KTtcbiAgdGhpcy5fY2FwYWNpdHlNYXNrID0gY2FwYWNpdHkgLSAxO1xuICB0aGlzLl90YWlsID0gbGVuZ3RoO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHRoaXMuX2xpc3RbaV0gPSBhcnJheVtpXTtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBmdWxsQ29weVxuICogQHBhcmFtIHNpemUgSW5pdGlhbGl6ZSB0aGUgYXJyYXkgd2l0aCBhIHNwZWNpZmljIHNpemUuIFdpbGwgZGVmYXVsdCB0byB0aGUgY3VycmVudCBsaXN0IHNpemVcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbkRlbnF1ZS5wcm90b3R5cGUuX2NvcHlBcnJheSA9IGZ1bmN0aW9uIF9jb3B5QXJyYXkoZnVsbENvcHksIHNpemUpIHtcbiAgdmFyIHNyYyA9IHRoaXMuX2xpc3Q7XG4gIHZhciBjYXBhY2l0eSA9IHNyYy5sZW5ndGg7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgc2l6ZSA9IHNpemUgfCBsZW5ndGg7XG5cbiAgLy8gTm8gcHJlYWxsb2MgcmVxdWVzdGVkIGFuZCB0aGUgYnVmZmVyIGlzIGNvbnRpZ3VvdXNcbiAgaWYgKHNpemUgPT0gbGVuZ3RoICYmIHRoaXMuX2hlYWQgPCB0aGlzLl90YWlsKSB7XG4gICAgLy8gU2ltcGx5IGRvIGEgZmFzdCBzbGljZSBjb3B5XG4gICAgcmV0dXJuIHRoaXMuX2xpc3Quc2xpY2UodGhpcy5faGVhZCwgdGhpcy5fdGFpbCk7XG4gIH1cblxuICB2YXIgZGVzdCA9IG5ldyBBcnJheShzaXplKTtcblxuICB2YXIgayA9IDA7XG4gIHZhciBpO1xuICBpZiAoZnVsbENvcHkgfHwgdGhpcy5faGVhZCA+IHRoaXMuX3RhaWwpIHtcbiAgICBmb3IgKGkgPSB0aGlzLl9oZWFkOyBpIDwgY2FwYWNpdHk7IGkrKykgZGVzdFtrKytdID0gc3JjW2ldO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLl90YWlsOyBpKyspIGRlc3RbaysrXSA9IHNyY1tpXTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKGkgPSB0aGlzLl9oZWFkOyBpIDwgdGhpcy5fdGFpbDsgaSsrKSBkZXN0W2srK10gPSBzcmNbaV07XG4gIH1cblxuICByZXR1cm4gZGVzdDtcbn1cblxuLyoqXG4gKiBHcm93cyB0aGUgaW50ZXJuYWwgbGlzdCBhcnJheS5cbiAqIEBwcml2YXRlXG4gKi9cbkRlbnF1ZS5wcm90b3R5cGUuX2dyb3dBcnJheSA9IGZ1bmN0aW9uIF9ncm93QXJyYXkoKSB7XG4gIGlmICh0aGlzLl9oZWFkICE9IDApIHtcbiAgICAvLyBkb3VibGUgYXJyYXkgc2l6ZSBhbmQgY29weSBleGlzdGluZyBkYXRhLCBoZWFkIHRvIGVuZCwgdGhlbiBiZWdpbm5pbmcgdG8gdGFpbC5cbiAgICB2YXIgbmV3TGlzdCA9IHRoaXMuX2NvcHlBcnJheSh0cnVlLCB0aGlzLl9saXN0Lmxlbmd0aCA8PCAxKTtcblxuICAgIHRoaXMuX3RhaWwgPSB0aGlzLl9saXN0Lmxlbmd0aDtcbiAgICB0aGlzLl9oZWFkID0gMDtcblxuICAgIHRoaXMuX2xpc3QgPSBuZXdMaXN0O1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX3RhaWwgPSB0aGlzLl9saXN0Lmxlbmd0aDtcbiAgICB0aGlzLl9saXN0Lmxlbmd0aCA8PD0gMTtcbiAgfVxuXG4gIHRoaXMuX2NhcGFjaXR5TWFzayA9ICh0aGlzLl9jYXBhY2l0eU1hc2sgPDwgMSkgfCAxO1xufTtcblxuLyoqXG4gKiBTaHJpbmtzIHRoZSBpbnRlcm5hbCBsaXN0IGFycmF5LlxuICogQHByaXZhdGVcbiAqL1xuRGVucXVlLnByb3RvdHlwZS5fc2hyaW5rQXJyYXkgPSBmdW5jdGlvbiBfc2hyaW5rQXJyYXkoKSB7XG4gIHRoaXMuX2xpc3QubGVuZ3RoID4+Pj0gMTtcbiAgdGhpcy5fY2FwYWNpdHlNYXNrID4+Pj0gMTtcbn07XG5cbi8qKlxuICogRmluZCB0aGUgbmV4dCBwb3dlciBvZiAyLCBhdCBsZWFzdCA0XG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG51bSBcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbkRlbnF1ZS5wcm90b3R5cGUuX25leHRQb3dlck9mMiA9IGZ1bmN0aW9uIF9uZXh0UG93ZXJPZjIobnVtKSB7XG4gIHZhciBsb2cyID0gTWF0aC5sb2cobnVtKSAvIE1hdGgubG9nKDIpO1xuICB2YXIgbmV4dFBvdzIgPSAxIDw8IChsb2cyICsgMSk7XG5cbiAgcmV0dXJuIE1hdGgubWF4KG5leHRQb3cyLCA0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEZW5xdWU7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/denque/index.js\n");

/***/ })

};
;