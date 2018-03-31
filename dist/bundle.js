/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./source/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/rxjs/Observer.js":
/*!***************************************!*\
  !*** ./node_modules/rxjs/Observer.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.empty = {\n    closed: true,\n    next: function (value) { },\n    error: function (err) { throw err; },\n    complete: function () { }\n};\n//# sourceMappingURL=Observer.js.map\n\n//# sourceURL=webpack:///./node_modules/rxjs/Observer.js?");

/***/ }),

/***/ "./node_modules/rxjs/Subscriber.js":
/*!*****************************************!*\
  !*** ./node_modules/rxjs/Subscriber.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\nvar isFunction_1 = __webpack_require__(/*! ./util/isFunction */ \"./node_modules/rxjs/util/isFunction.js\");\nvar Subscription_1 = __webpack_require__(/*! ./Subscription */ \"./node_modules/rxjs/Subscription.js\");\nvar Observer_1 = __webpack_require__(/*! ./Observer */ \"./node_modules/rxjs/Observer.js\");\nvar rxSubscriber_1 = __webpack_require__(/*! ./symbol/rxSubscriber */ \"./node_modules/rxjs/symbol/rxSubscriber.js\");\n/**\n * Implements the {@link Observer} interface and extends the\n * {@link Subscription} class. While the {@link Observer} is the public API for\n * consuming the values of an {@link Observable}, all Observers get converted to\n * a Subscriber, in order to provide Subscription-like capabilities such as\n * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for\n * implementing operators, but it is rarely used as a public API.\n *\n * @class Subscriber<T>\n */\nvar Subscriber = (function (_super) {\n    __extends(Subscriber, _super);\n    /**\n     * @param {Observer|function(value: T): void} [destinationOrNext] A partially\n     * defined Observer or a `next` callback function.\n     * @param {function(e: ?any): void} [error] The `error` callback of an\n     * Observer.\n     * @param {function(): void} [complete] The `complete` callback of an\n     * Observer.\n     */\n    function Subscriber(destinationOrNext, error, complete) {\n        _super.call(this);\n        this.syncErrorValue = null;\n        this.syncErrorThrown = false;\n        this.syncErrorThrowable = false;\n        this.isStopped = false;\n        switch (arguments.length) {\n            case 0:\n                this.destination = Observer_1.empty;\n                break;\n            case 1:\n                if (!destinationOrNext) {\n                    this.destination = Observer_1.empty;\n                    break;\n                }\n                if (typeof destinationOrNext === 'object') {\n                    if (destinationOrNext instanceof Subscriber) {\n                        this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;\n                        this.destination = destinationOrNext;\n                        this.destination.add(this);\n                    }\n                    else {\n                        this.syncErrorThrowable = true;\n                        this.destination = new SafeSubscriber(this, destinationOrNext);\n                    }\n                    break;\n                }\n            default:\n                this.syncErrorThrowable = true;\n                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);\n                break;\n        }\n    }\n    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () { return this; };\n    /**\n     * A static factory for a Subscriber, given a (potentially partial) definition\n     * of an Observer.\n     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.\n     * @param {function(e: ?any): void} [error] The `error` callback of an\n     * Observer.\n     * @param {function(): void} [complete] The `complete` callback of an\n     * Observer.\n     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)\n     * Observer represented by the given arguments.\n     */\n    Subscriber.create = function (next, error, complete) {\n        var subscriber = new Subscriber(next, error, complete);\n        subscriber.syncErrorThrowable = false;\n        return subscriber;\n    };\n    /**\n     * The {@link Observer} callback to receive notifications of type `next` from\n     * the Observable, with a value. The Observable may call this method 0 or more\n     * times.\n     * @param {T} [value] The `next` value.\n     * @return {void}\n     */\n    Subscriber.prototype.next = function (value) {\n        if (!this.isStopped) {\n            this._next(value);\n        }\n    };\n    /**\n     * The {@link Observer} callback to receive notifications of type `error` from\n     * the Observable, with an attached {@link Error}. Notifies the Observer that\n     * the Observable has experienced an error condition.\n     * @param {any} [err] The `error` exception.\n     * @return {void}\n     */\n    Subscriber.prototype.error = function (err) {\n        if (!this.isStopped) {\n            this.isStopped = true;\n            this._error(err);\n        }\n    };\n    /**\n     * The {@link Observer} callback to receive a valueless notification of type\n     * `complete` from the Observable. Notifies the Observer that the Observable\n     * has finished sending push-based notifications.\n     * @return {void}\n     */\n    Subscriber.prototype.complete = function () {\n        if (!this.isStopped) {\n            this.isStopped = true;\n            this._complete();\n        }\n    };\n    Subscriber.prototype.unsubscribe = function () {\n        if (this.closed) {\n            return;\n        }\n        this.isStopped = true;\n        _super.prototype.unsubscribe.call(this);\n    };\n    Subscriber.prototype._next = function (value) {\n        this.destination.next(value);\n    };\n    Subscriber.prototype._error = function (err) {\n        this.destination.error(err);\n        this.unsubscribe();\n    };\n    Subscriber.prototype._complete = function () {\n        this.destination.complete();\n        this.unsubscribe();\n    };\n    Subscriber.prototype._unsubscribeAndRecycle = function () {\n        var _a = this, _parent = _a._parent, _parents = _a._parents;\n        this._parent = null;\n        this._parents = null;\n        this.unsubscribe();\n        this.closed = false;\n        this.isStopped = false;\n        this._parent = _parent;\n        this._parents = _parents;\n        return this;\n    };\n    return Subscriber;\n}(Subscription_1.Subscription));\nexports.Subscriber = Subscriber;\n/**\n * We need this JSDoc comment for affecting ESDoc.\n * @ignore\n * @extends {Ignored}\n */\nvar SafeSubscriber = (function (_super) {\n    __extends(SafeSubscriber, _super);\n    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {\n        _super.call(this);\n        this._parentSubscriber = _parentSubscriber;\n        var next;\n        var context = this;\n        if (isFunction_1.isFunction(observerOrNext)) {\n            next = observerOrNext;\n        }\n        else if (observerOrNext) {\n            next = observerOrNext.next;\n            error = observerOrNext.error;\n            complete = observerOrNext.complete;\n            if (observerOrNext !== Observer_1.empty) {\n                context = Object.create(observerOrNext);\n                if (isFunction_1.isFunction(context.unsubscribe)) {\n                    this.add(context.unsubscribe.bind(context));\n                }\n                context.unsubscribe = this.unsubscribe.bind(this);\n            }\n        }\n        this._context = context;\n        this._next = next;\n        this._error = error;\n        this._complete = complete;\n    }\n    SafeSubscriber.prototype.next = function (value) {\n        if (!this.isStopped && this._next) {\n            var _parentSubscriber = this._parentSubscriber;\n            if (!_parentSubscriber.syncErrorThrowable) {\n                this.__tryOrUnsub(this._next, value);\n            }\n            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {\n                this.unsubscribe();\n            }\n        }\n    };\n    SafeSubscriber.prototype.error = function (err) {\n        if (!this.isStopped) {\n            var _parentSubscriber = this._parentSubscriber;\n            if (this._error) {\n                if (!_parentSubscriber.syncErrorThrowable) {\n                    this.__tryOrUnsub(this._error, err);\n                    this.unsubscribe();\n                }\n                else {\n                    this.__tryOrSetError(_parentSubscriber, this._error, err);\n                    this.unsubscribe();\n                }\n            }\n            else if (!_parentSubscriber.syncErrorThrowable) {\n                this.unsubscribe();\n                throw err;\n            }\n            else {\n                _parentSubscriber.syncErrorValue = err;\n                _parentSubscriber.syncErrorThrown = true;\n                this.unsubscribe();\n            }\n        }\n    };\n    SafeSubscriber.prototype.complete = function () {\n        var _this = this;\n        if (!this.isStopped) {\n            var _parentSubscriber = this._parentSubscriber;\n            if (this._complete) {\n                var wrappedComplete = function () { return _this._complete.call(_this._context); };\n                if (!_parentSubscriber.syncErrorThrowable) {\n                    this.__tryOrUnsub(wrappedComplete);\n                    this.unsubscribe();\n                }\n                else {\n                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);\n                    this.unsubscribe();\n                }\n            }\n            else {\n                this.unsubscribe();\n            }\n        }\n    };\n    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {\n        try {\n            fn.call(this._context, value);\n        }\n        catch (err) {\n            this.unsubscribe();\n            throw err;\n        }\n    };\n    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {\n        try {\n            fn.call(this._context, value);\n        }\n        catch (err) {\n            parent.syncErrorValue = err;\n            parent.syncErrorThrown = true;\n            return true;\n        }\n        return false;\n    };\n    SafeSubscriber.prototype._unsubscribe = function () {\n        var _parentSubscriber = this._parentSubscriber;\n        this._context = null;\n        this._parentSubscriber = null;\n        _parentSubscriber.unsubscribe();\n    };\n    return SafeSubscriber;\n}(Subscriber));\n//# sourceMappingURL=Subscriber.js.map\n\n//# sourceURL=webpack:///./node_modules/rxjs/Subscriber.js?");

/***/ }),

/***/ "./node_modules/rxjs/Subscription.js":
/*!*******************************************!*\
  !*** ./node_modules/rxjs/Subscription.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar isArray_1 = __webpack_require__(/*! ./util/isArray */ \"./node_modules/rxjs/util/isArray.js\");\nvar isObject_1 = __webpack_require__(/*! ./util/isObject */ \"./node_modules/rxjs/util/isObject.js\");\nvar isFunction_1 = __webpack_require__(/*! ./util/isFunction */ \"./node_modules/rxjs/util/isFunction.js\");\nvar tryCatch_1 = __webpack_require__(/*! ./util/tryCatch */ \"./node_modules/rxjs/util/tryCatch.js\");\nvar errorObject_1 = __webpack_require__(/*! ./util/errorObject */ \"./node_modules/rxjs/util/errorObject.js\");\nvar UnsubscriptionError_1 = __webpack_require__(/*! ./util/UnsubscriptionError */ \"./node_modules/rxjs/util/UnsubscriptionError.js\");\n/**\n * Represents a disposable resource, such as the execution of an Observable. A\n * Subscription has one important method, `unsubscribe`, that takes no argument\n * and just disposes the resource held by the subscription.\n *\n * Additionally, subscriptions may be grouped together through the `add()`\n * method, which will attach a child Subscription to the current Subscription.\n * When a Subscription is unsubscribed, all its children (and its grandchildren)\n * will be unsubscribed as well.\n *\n * @class Subscription\n */\nvar Subscription = (function () {\n    /**\n     * @param {function(): void} [unsubscribe] A function describing how to\n     * perform the disposal of resources when the `unsubscribe` method is called.\n     */\n    function Subscription(unsubscribe) {\n        /**\n         * A flag to indicate whether this Subscription has already been unsubscribed.\n         * @type {boolean}\n         */\n        this.closed = false;\n        this._parent = null;\n        this._parents = null;\n        this._subscriptions = null;\n        if (unsubscribe) {\n            this._unsubscribe = unsubscribe;\n        }\n    }\n    /**\n     * Disposes the resources held by the subscription. May, for instance, cancel\n     * an ongoing Observable execution or cancel any other type of work that\n     * started when the Subscription was created.\n     * @return {void}\n     */\n    Subscription.prototype.unsubscribe = function () {\n        var hasErrors = false;\n        var errors;\n        if (this.closed) {\n            return;\n        }\n        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;\n        this.closed = true;\n        this._parent = null;\n        this._parents = null;\n        // null out _subscriptions first so any child subscriptions that attempt\n        // to remove themselves from this subscription will noop\n        this._subscriptions = null;\n        var index = -1;\n        var len = _parents ? _parents.length : 0;\n        // if this._parent is null, then so is this._parents, and we\n        // don't have to remove ourselves from any parent subscriptions.\n        while (_parent) {\n            _parent.remove(this);\n            // if this._parents is null or index >= len,\n            // then _parent is set to null, and the loop exits\n            _parent = ++index < len && _parents[index] || null;\n        }\n        if (isFunction_1.isFunction(_unsubscribe)) {\n            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);\n            if (trial === errorObject_1.errorObject) {\n                hasErrors = true;\n                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?\n                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);\n            }\n        }\n        if (isArray_1.isArray(_subscriptions)) {\n            index = -1;\n            len = _subscriptions.length;\n            while (++index < len) {\n                var sub = _subscriptions[index];\n                if (isObject_1.isObject(sub)) {\n                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);\n                    if (trial === errorObject_1.errorObject) {\n                        hasErrors = true;\n                        errors = errors || [];\n                        var err = errorObject_1.errorObject.e;\n                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {\n                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));\n                        }\n                        else {\n                            errors.push(err);\n                        }\n                    }\n                }\n            }\n        }\n        if (hasErrors) {\n            throw new UnsubscriptionError_1.UnsubscriptionError(errors);\n        }\n    };\n    /**\n     * Adds a tear down to be called during the unsubscribe() of this\n     * Subscription.\n     *\n     * If the tear down being added is a subscription that is already\n     * unsubscribed, is the same reference `add` is being called on, or is\n     * `Subscription.EMPTY`, it will not be added.\n     *\n     * If this subscription is already in an `closed` state, the passed\n     * tear down logic will be executed immediately.\n     *\n     * @param {TeardownLogic} teardown The additional logic to execute on\n     * teardown.\n     * @return {Subscription} Returns the Subscription used or created to be\n     * added to the inner subscriptions list. This Subscription can be used with\n     * `remove()` to remove the passed teardown logic from the inner subscriptions\n     * list.\n     */\n    Subscription.prototype.add = function (teardown) {\n        if (!teardown || (teardown === Subscription.EMPTY)) {\n            return Subscription.EMPTY;\n        }\n        if (teardown === this) {\n            return this;\n        }\n        var subscription = teardown;\n        switch (typeof teardown) {\n            case 'function':\n                subscription = new Subscription(teardown);\n            case 'object':\n                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {\n                    return subscription;\n                }\n                else if (this.closed) {\n                    subscription.unsubscribe();\n                    return subscription;\n                }\n                else if (typeof subscription._addParent !== 'function' /* quack quack */) {\n                    var tmp = subscription;\n                    subscription = new Subscription();\n                    subscription._subscriptions = [tmp];\n                }\n                break;\n            default:\n                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');\n        }\n        var subscriptions = this._subscriptions || (this._subscriptions = []);\n        subscriptions.push(subscription);\n        subscription._addParent(this);\n        return subscription;\n    };\n    /**\n     * Removes a Subscription from the internal list of subscriptions that will\n     * unsubscribe during the unsubscribe process of this Subscription.\n     * @param {Subscription} subscription The subscription to remove.\n     * @return {void}\n     */\n    Subscription.prototype.remove = function (subscription) {\n        var subscriptions = this._subscriptions;\n        if (subscriptions) {\n            var subscriptionIndex = subscriptions.indexOf(subscription);\n            if (subscriptionIndex !== -1) {\n                subscriptions.splice(subscriptionIndex, 1);\n            }\n        }\n    };\n    Subscription.prototype._addParent = function (parent) {\n        var _a = this, _parent = _a._parent, _parents = _a._parents;\n        if (!_parent || _parent === parent) {\n            // If we don't have a parent, or the new parent is the same as the\n            // current parent, then set this._parent to the new parent.\n            this._parent = parent;\n        }\n        else if (!_parents) {\n            // If there's already one parent, but not multiple, allocate an Array to\n            // store the rest of the parent Subscriptions.\n            this._parents = [parent];\n        }\n        else if (_parents.indexOf(parent) === -1) {\n            // Only add the new parent to the _parents list if it's not already there.\n            _parents.push(parent);\n        }\n    };\n    Subscription.EMPTY = (function (empty) {\n        empty.closed = true;\n        return empty;\n    }(new Subscription()));\n    return Subscription;\n}());\nexports.Subscription = Subscription;\nfunction flattenUnsubscriptionErrors(errors) {\n    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);\n}\n//# sourceMappingURL=Subscription.js.map\n\n//# sourceURL=webpack:///./node_modules/rxjs/Subscription.js?");

/***/ }),

/***/ "./node_modules/rxjs/operator/every.js":
/*!*********************************************!*\
  !*** ./node_modules/rxjs/operator/every.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar every_1 = __webpack_require__(/*! ../operators/every */ \"./node_modules/rxjs/operators/every.js\");\n/**\n * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.\n *\n * @example <caption>A simple example emitting true if all elements are less than 5, false otherwise</caption>\n *  Observable.of(1, 2, 3, 4, 5, 6)\n *     .every(x => x < 5)\n *     .subscribe(x => console.log(x)); // -> false\n *\n * @param {function} predicate A function for determining if an item meets a specified condition.\n * @param {any} [thisArg] Optional object to use for `this` in the callback.\n * @return {Observable} An Observable of booleans that determines if all items of the source Observable meet the condition specified.\n * @method every\n * @owner Observable\n */\nfunction every(predicate, thisArg) {\n    return every_1.every(predicate, thisArg)(this);\n}\nexports.every = every;\n//# sourceMappingURL=every.js.map\n\n//# sourceURL=webpack:///./node_modules/rxjs/operator/every.js?");

/***/ }),

/***/ "./node_modules/rxjs/operators/every.js":
/*!**********************************************!*\
  !*** ./node_modules/rxjs/operators/every.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\nvar Subscriber_1 = __webpack_require__(/*! ../Subscriber */ \"./node_modules/rxjs/Subscriber.js\");\n/**\n * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.\n *\n * @example <caption>A simple example emitting true if all elements are less than 5, false otherwise</caption>\n *  Observable.of(1, 2, 3, 4, 5, 6)\n *     .every(x => x < 5)\n *     .subscribe(x => console.log(x)); // -> false\n *\n * @param {function} predicate A function for determining if an item meets a specified condition.\n * @param {any} [thisArg] Optional object to use for `this` in the callback.\n * @return {Observable} An Observable of booleans that determines if all items of the source Observable meet the condition specified.\n * @method every\n * @owner Observable\n */\nfunction every(predicate, thisArg) {\n    return function (source) { return source.lift(new EveryOperator(predicate, thisArg, source)); };\n}\nexports.every = every;\nvar EveryOperator = (function () {\n    function EveryOperator(predicate, thisArg, source) {\n        this.predicate = predicate;\n        this.thisArg = thisArg;\n        this.source = source;\n    }\n    EveryOperator.prototype.call = function (observer, source) {\n        return source.subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));\n    };\n    return EveryOperator;\n}());\n/**\n * We need this JSDoc comment for affecting ESDoc.\n * @ignore\n * @extends {Ignored}\n */\nvar EverySubscriber = (function (_super) {\n    __extends(EverySubscriber, _super);\n    function EverySubscriber(destination, predicate, thisArg, source) {\n        _super.call(this, destination);\n        this.predicate = predicate;\n        this.thisArg = thisArg;\n        this.source = source;\n        this.index = 0;\n        this.thisArg = thisArg || this;\n    }\n    EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {\n        this.destination.next(everyValueMatch);\n        this.destination.complete();\n    };\n    EverySubscriber.prototype._next = function (value) {\n        var result = false;\n        try {\n            result = this.predicate.call(this.thisArg, value, this.index++, this.source);\n        }\n        catch (err) {\n            this.destination.error(err);\n            return;\n        }\n        if (!result) {\n            this.notifyComplete(false);\n        }\n    };\n    EverySubscriber.prototype._complete = function () {\n        this.notifyComplete(true);\n    };\n    return EverySubscriber;\n}(Subscriber_1.Subscriber));\n//# sourceMappingURL=every.js.map\n\n//# sourceURL=webpack:///./node_modules/rxjs/operators/every.js?");

/***/ }),

/***/ "./node_modules/rxjs/symbol/rxSubscriber.js":
/*!**************************************************!*\
  !*** ./node_modules/rxjs/symbol/rxSubscriber.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar root_1 = __webpack_require__(/*! ../util/root */ \"./node_modules/rxjs/util/root.js\");\nvar Symbol = root_1.root.Symbol;\nexports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?\n    Symbol.for('rxSubscriber') : '@@rxSubscriber';\n/**\n * @deprecated use rxSubscriber instead\n */\nexports.$$rxSubscriber = exports.rxSubscriber;\n//# sourceMappingURL=rxSubscriber.js.map\n\n//# sourceURL=webpack:///./node_modules/rxjs/symbol/rxSubscriber.js?");

/***/ }),

/***/ "./node_modules/rxjs/util/UnsubscriptionError.js":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs/util/UnsubscriptionError.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\n/**\n * An error thrown when one or more errors have occurred during the\n * `unsubscribe` of a {@link Subscription}.\n */\nvar UnsubscriptionError = (function (_super) {\n    __extends(UnsubscriptionError, _super);\n    function UnsubscriptionError(errors) {\n        _super.call(this);\n        this.errors = errors;\n        var err = Error.call(this, errors ?\n            errors.length + \" errors occurred during unsubscription:\\n  \" + errors.map(function (err, i) { return ((i + 1) + \") \" + err.toString()); }).join('\\n  ') : '');\n        this.name = err.name = 'UnsubscriptionError';\n        this.stack = err.stack;\n        this.message = err.message;\n    }\n    return UnsubscriptionError;\n}(Error));\nexports.UnsubscriptionError = UnsubscriptionError;\n//# sourceMappingURL=UnsubscriptionError.js.map\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/UnsubscriptionError.js?");

/***/ }),

/***/ "./node_modules/rxjs/util/errorObject.js":
/*!***********************************************!*\
  !*** ./node_modules/rxjs/util/errorObject.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n// typeof any so that it we don't have to cast when comparing a result to the error object\nexports.errorObject = { e: {} };\n//# sourceMappingURL=errorObject.js.map\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/errorObject.js?");

/***/ }),

/***/ "./node_modules/rxjs/util/isArray.js":
/*!*******************************************!*\
  !*** ./node_modules/rxjs/util/isArray.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nexports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });\n//# sourceMappingURL=isArray.js.map\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/isArray.js?");

/***/ }),

/***/ "./node_modules/rxjs/util/isFunction.js":
/*!**********************************************!*\
  !*** ./node_modules/rxjs/util/isFunction.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction isFunction(x) {\n    return typeof x === 'function';\n}\nexports.isFunction = isFunction;\n//# sourceMappingURL=isFunction.js.map\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/isFunction.js?");

/***/ }),

/***/ "./node_modules/rxjs/util/isObject.js":
/*!********************************************!*\
  !*** ./node_modules/rxjs/util/isObject.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction isObject(x) {\n    return x != null && typeof x === 'object';\n}\nexports.isObject = isObject;\n//# sourceMappingURL=isObject.js.map\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/isObject.js?");

/***/ }),

/***/ "./node_modules/rxjs/util/root.js":
/*!****************************************!*\
  !*** ./node_modules/rxjs/util/root.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global) {\n// CommonJS / Node have global context exposed as \"global\" variable.\n// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake\n// the global \"global\" var for now.\nvar __window = typeof window !== 'undefined' && window;\nvar __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&\n    self instanceof WorkerGlobalScope && self;\nvar __global = typeof global !== 'undefined' && global;\nvar _root = __window || __global || __self;\nexports.root = _root;\n// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.\n// This is needed when used with angular/tsickle which inserts a goog.module statement.\n// Wrap in IIFE\n(function () {\n    if (!_root) {\n        throw new Error('RxJS could not find any global context (window, self, global)');\n    }\n})();\n//# sourceMappingURL=root.js.map\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/root.js?");

/***/ }),

/***/ "./node_modules/rxjs/util/tryCatch.js":
/*!********************************************!*\
  !*** ./node_modules/rxjs/util/tryCatch.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar errorObject_1 = __webpack_require__(/*! ./errorObject */ \"./node_modules/rxjs/util/errorObject.js\");\nvar tryCatchTarget;\nfunction tryCatcher() {\n    try {\n        return tryCatchTarget.apply(this, arguments);\n    }\n    catch (e) {\n        errorObject_1.errorObject.e = e;\n        return errorObject_1.errorObject;\n    }\n}\nfunction tryCatch(fn) {\n    tryCatchTarget = fn;\n    return tryCatcher;\n}\nexports.tryCatch = tryCatch;\n;\n//# sourceMappingURL=tryCatch.js.map\n\n//# sourceURL=webpack:///./node_modules/rxjs/util/tryCatch.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\r\n\r\n// This works in non-strict mode\r\ng = (function() {\r\n\treturn this;\r\n})();\r\n\r\ntry {\r\n\t// This works if eval is allowed (see CSP)\r\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\r\n} catch (e) {\r\n\t// This works if the window reference is available\r\n\tif (typeof window === \"object\") g = window;\r\n}\r\n\r\n// g can still be undefined, but nothing to do about it...\r\n// We return undefined, instead of nothing here, so it's\r\n// easier to handle this case. if(!global) { ...}\r\n\r\nmodule.exports = g;\r\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./source/main.js":
/*!************************!*\
  !*** ./source/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Triangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Triangle */ \"./source/modules/Triangle.js\");\n/* harmony import */ var _modules_Init__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Init */ \"./source/modules/Init.js\");\n/* harmony import */ var rxjs_operator_every__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operator/every */ \"./node_modules/rxjs/operator/every.js\");\n/* harmony import */ var rxjs_operator_every__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rxjs_operator_every__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _modules_setPosition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/setPosition */ \"./source/modules/setPosition.js\");\n/**\n *  @version 0.2\n *  @author Alexander Veselov\n *  @todo responsive\n *  @todo user scenary\n *\n */\n\n\n\n\n\n\n\n\n\n\n\nfunction Portal (options) {\n\n  /**\n   * @param {node} target - Элемент-якорь относительно которого задана позиция\n   */\n\n  options = {\n    target: options.target,\n    triangle: options.triangle || false,\n    triangleSize: options.triangle ? options.triangleSize || 10 : 0,\n    positions: options.positions || [\"bottom\"],\n    hover: options.hover === undefined ? true : options.hover\n  };\n\n  const InitPortal = new _modules_Init__WEBPACK_IMPORTED_MODULE_1__[\"Init\"](options.target);\n  const target = InitPortal.renderTarget();\n\n  if (!target) {\n    return\n  }\n\n  const root = target.offsetParent\n  const rootLeft = root.clientLeft;\n  const portalBox = InitPortal.renderPortalBox(target);\n\n  if (!portalBox) {\n    return\n  }\n\n  let triangle = options.triangle ? InitPortal.renderTriangle(portalBox) : null\n\n\n  const sizes = getSize(portalBox, target, root);\n\n  function getSize(portalBox, target, root) {\n    let sizes = {\n      root: {\n        height: root.clientHeight,\n        width: root.clientWidth\n      },\n      box: {\n        width: portalBox.offsetWidth,\n        height: portalBox.offsetHeight\n      },\n      target: {\n        width: target.offsetWidth,\n        height: target.offsetHeight\n      },\n      triangle: {\n        width: options.triangleSize,\n        height: options.triangleSize\n      }\n    };\n\n    return sizes;\n  }\n\n  function placement(target, sizes) {\n    const coordinates = {};\n    const borderLeftWidth = computedBordersWidth(getComputedStyle(target.offsetParent).borderLeftWidth);\n    const borderTopWidth = computedBordersWidth(getComputedStyle(target.offsetParent).borderTopWidth);\n    const targetTop = target.getBoundingClientRect().top - target.offsetParent.getBoundingClientRect().top - borderTopWidth\n    const targetLeft = target.getBoundingClientRect().left - target.offsetParent.getBoundingClientRect().left - borderLeftWidth\n    const heightCase = sizes.target.height > sizes.box.height;\n\n    options.triangle ? coordinates.tr = {} : null\n\n    function alignedTriangleY(element) {\n      return element.height / 2 - sizes.triangle.height;\n    }\n\n    function alignedYCase1() {\n      if (heightCase) {\n        return coordinates.tr.y = alignedTriangleY(sizes.box);\n      }\n    }\n\n    function computedBordersWidth(border) {\n      const width = Number(border.match(/\\d+/, \"\"))\n      return width\n    }\n\n    function arrangeBottom() {\n      coordinates.x = targetLeft - (sizes.box.width - sizes.target.width) / 2\n      coordinates.y = targetTop + sizes.target.height + sizes.triangle.height;\n\n      if (coordinates.y + sizes.box.height > sizes.root.height) {\n        return false;\n      }\n\n      if (options.triangle) {\n        coordinates.tr.y = -sizes.triangle.height;\n        coordinates.tr.x = 0;\n        triangle.style = Object(_modules_Triangle__WEBPACK_IMPORTED_MODULE_0__[\"Triangle\"])(\"bottom\", options.triangleSize);\n      }\n\n      return true;\n    }\n\n    function arrangeRight() {\n      coordinates.x = targetLeft + sizes.target.width + sizes.triangle.width\n      coordinates.y = targetTop\n\n\n      if (options.triangle) {\n        coordinates.tr.x = -sizes.triangle.width;\n        coordinates.tr.y = alignedTriangleY(sizes.target);\n        alignedYCase1();\n        triangle.style = Object(_modules_Triangle__WEBPACK_IMPORTED_MODULE_0__[\"Triangle\"])(\"left\", options.triangleSize);\n      }\n\n      if (coordinates.x + sizes.box.width > sizes.root.width) {\n        return false;\n      }\n      return true;\n    }\n\n    function arrangeLeft() {\n      coordinates.x = targetLeft - sizes.box.width - sizes.triangle.width;\n      coordinates.y = targetTop\n      let overCondVertical = coordinates.x - sizes.triangle.width + sizes.box.width / 2 < rootLeft\n\n      if (options.triangle) {\n        coordinates.tr.x = sizes.box.width;\n        coordinates.tr.y = alignedTriangleY(sizes.target);\n        alignedYCase1();\n        triangle.style = Object(_modules_Triangle__WEBPACK_IMPORTED_MODULE_0__[\"Triangle\"])(\"right\", options.triangleSize);\n      }\n\n      if (coordinates.x < rootLeft) {\n        return false;\n      }\n\n      return true\n    }\n\n    function arrangeTop() {\n      coordinates.y = targetTop - sizes.box.height - sizes.triangle.height;\n      coordinates.x = targetLeft - (sizes.box.width - sizes.target.width) / 2\n\n\n      if (sizes.box.height + sizes.triangle.height > targetTop) {\n        return false;\n      }\n\n      if (options.triangle) {\n        coordinates.tr.y = sizes.box.height\n        coordinates.tr.x = 0;\n        triangle.style = Object(_modules_Triangle__WEBPACK_IMPORTED_MODULE_0__[\"Triangle\"])(\"top\", options.triangleSize);\n      }\n\n      return true\n    }\n\n    function flipRight () {\n      coordinates.y = targetTop - sizes.box.height - sizes.triangle.height\n      coordinates.x = targetLeft - sizes.box.width + sizes.target.width\n\n      if (options.triangle) {\n        coordinates.tr.y = sizes.box.height;\n        coordinates.tr.x = sizes.box.width - (sizes.target.width / 2) - sizes.triangle.width\n        triangle.style = Object(_modules_Triangle__WEBPACK_IMPORTED_MODULE_0__[\"Triangle\"])(\"top\", options.triangleSize, false)\n      }\n      return true\n    }\n\n    function flipLeft() {\n      coordinates.y = targetTop - sizes.box.height - sizes.triangle.height\n      coordinates.x = targetLeft\n\n      if (options.triangle) {\n        coordinates.tr.y = sizes.box.height;\n        coordinates.tr.x = sizes.target.width / 2 - sizes.triangle.width\n        triangle.style = Object(_modules_Triangle__WEBPACK_IMPORTED_MODULE_0__[\"Triangle\"])(\"top\", options.triangleSize, false);\n      }\n      return true\n    }\n\n\n    function conductor() {\n\n      let positionsMap = []\n\n      options.positions.forEach((i) => {\n\n        switch (i) {\n          case 'left':\n            positionsMap.push(arrangeLeft)\n            break;\n          case 'right':\n            positionsMap.push(arrangeRight)\n            break;\n          case 'top':\n            positionsMap.push(arrangeTop)\n            break;\n          case 'bottom':\n            positionsMap.push(arrangeBottom)\n            break;\n          default:\n            break;\n        }\n      })\n\n      positionsMap.some((i) => i())\n    }\n\n    conductor();\n    return coordinates;\n  }\n\n\n  function showPortal() {\n\n     if (!options.hover) {\n       portalBox.classList.toggle(\"open\");\n     }\n\n     else {\n       portalBox.classList.add(\"open\");\n     }\n   }\n\n   function hiddenPortal(event) {\n    // for click\n    function removeClass() {\n      portalBox.classList.remove(\"open\");\n    }\n\n    if (!options.hover) {\n      if (!target.contains(event.target) && event.target != portalBox && !portalBox.contains(event.target)) {\n        removeClass()\n      }\n    }\n\n    else {\n      if (!(portalBox.contains(event.relatedTarget))) {\n        removeClass();\n      }\n    }\n   }\n\n  const eventsForShow = !options.hover ? \"click\" : \"mouseover\"\n  const eventsForHidden = !options.hover ? \"click\" : \"mouseout\"\n\n\n  window.addEventListener(\"resize\", displacement);\n  document.addEventListener(\"DOMContentLoaded\", displacement);\n  target.addEventListener(eventsForShow, displacement);\n  window.addEventListener(eventsForHidden, hiddenPortal);\n\n  function draw(sizes) {\n    let coordinates = placement(target, sizes);\n    Object(_modules_setPosition__WEBPACK_IMPORTED_MODULE_3__[\"setPosition\"])(coordinates, portalBox, triangle);\n  }\n\n  function displacement(event) {\n    let sizes = getSize(portalBox, target, root);\n    draw(sizes);\n\n    if (!(event.type === \"resize\" || event.type === \"DOMContentLoaded\")) {\n      showPortal()\n    }\n  }\n};;\n\n\n\n\nconst PortalRight = new Portal({\n  target: \".button-2\",\n  position: \"top\",\n  triangle: true,\n  hover: true\n});\n\n// // // PortalRight.test('Alex')\n\n// const PortalTop = new Portal({\n//   target: '.button-5',\n//   position: 'top',\n//   triangle: true\n// });\n\n// const PortalTopNew = new Portal({\n//   target: '.button-4',\n//   position: 'top',\n//   triangle: true\n// });\n\n// const PortalBottom = new Portal({\n//   target: \".button-3\",\n//   position: \"top\",\n//   triangle: true\n// });\n\nconst PortalLeft = new Portal({\n  triangle: true,\n  positions: ['top', 'bottom'],\n  hover: false,\n  target: \"#custom-button\"\n});\n\n// const PortalPreview = new Portal({\n//   position: 'top',\n//   triangle: true\n// });\n\n\n\n\nfunction shuffleRandom(nodes) {\n  let elements = document.querySelectorAll(nodes)\n  let max = 2800;\n  let min = 1000;\n  elements.forEach(element => {\n    element.style = \"margin-left:\" + Math.random() * (max - min) + min + \"px\";\n  });\n}\n\nshuffleRandom(\".button-open-portal\");\n\nfunction getSize(node) {\n  let el = document.getElementById(node)\n  let sizes = {\n    width: el.offsetWidth,\n    height: el.offsetHeight,\n  }\n  console.log(sizes)\n}\n\n// getSize(\"custom-button\");\n\n//# sourceURL=webpack:///./source/main.js?");

/***/ }),

/***/ "./source/modules/Init.js":
/*!********************************!*\
  !*** ./source/modules/Init.js ***!
  \********************************/
/*! exports provided: Init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Init\", function() { return Init; });\nlet Init = function(targetButton) {\n\n  this.renderTarget = function() {\n\n    let target = document.querySelector(targetButton);\n    if (!target) {\n      return\n    }\n    target.className = \"button-open-portal\";\n    return target;\n\n\n  };\n\n  this.renderTriangle = function (portalBox) {\n    let triangle = document.createElement(\"div\")\n    portalBox.appendChild(triangle);\n    return triangle\n  }\n\n  this.renderPortalBox = function(target) {\n\n    let portal = document.querySelector(target.dataset.portal);\n    if (!portal) {\n      return\n    }\n    portal.className = \"portal-box\";\n    portal.style = \"position: absolute;\";\n    return portal;\n\n  };\n};\n\n\n\n//# sourceURL=webpack:///./source/modules/Init.js?");

/***/ }),

/***/ "./source/modules/Triangle.js":
/*!************************************!*\
  !*** ./source/modules/Triangle.js ***!
  \************************************/
/*! exports provided: Triangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Triangle\", function() { return Triangle; });\nconst Triangle = function (direction, size, horizontalAlignment) {\n   let hAlignment = horizontalAlignment === undefined ? true : horizontalAlignment;\n   let baseStyle = `\n    width: 0;\n    height: 0;\n    position: absolute;\n  `;\n\n   if (direction === \"left\") {\n     return `\n      ${baseStyle}\n      border-right: ${size + \"px\"} solid black;\n      border-top: ${size + \"px\"} solid transparent;\n      border-bottom: ${size + \"px\"} solid transparent;\n    `;\n   }\n   if (direction === \"right\") {\n     return `\n      ${baseStyle}\n      border-top:  ${size + \"px\"} solid transparent;\n      border-left:  ${size + \"px\"}  solid black;\n      border-bottom: ${size + \"px\"} solid transparent;\n    `;\n   }\n   if (direction === \"top\") {\n     return `\n      ${baseStyle}\n      border-left:  ${size + \"px\"} solid transparent;\n      border-right:  ${size + \"px\"}  solid transparent;\n      border-top:  ${size + \"px\"} solid black;\n      left: 0;\n      right: 0;\n      ${hAlignment ? \"margin-left: auto\" : null};\n      ${hAlignment ? \"margin-right: auto\" : null};\n    `;\n   }\n   if (direction === \"bottom\") {\n     return `\n      ${baseStyle}\n      border-left:  ${size + \"px\"} solid transparent;\n      border-right:  ${size + \"px\"}  solid transparent;\n      border-bottom:  ${size + \"px\"} solid black;\n      ${hAlignment ? \"margin-left: auto\" : null};\n      ${hAlignment ? \"margin-right: auto\" : null};\n      left: 0;\n      right: 0;\n    `;\n   }\n}\n\n\n//# sourceURL=webpack:///./source/modules/Triangle.js?");

/***/ }),

/***/ "./source/modules/setPosition.js":
/*!***************************************!*\
  !*** ./source/modules/setPosition.js ***!
  \***************************************/
/*! exports provided: setPosition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setPosition\", function() { return setPosition; });\nconst setPosition = (coordinates, portalBox, triangle) => {\n  portalBox.style.top = 0\n  portalBox.style.left = 0\n  portalBox.style.transform = `translate(${coordinates.x}px, ${coordinates.y}px)`\n\n  if (triangle) {\n    triangle.style.top = coordinates.tr.y + \"px\";\n    triangle.style.left = coordinates.tr.x + \"px\";\n  }\n}\n\n\n\n//# sourceURL=webpack:///./source/modules/setPosition.js?");

/***/ })

/******/ });