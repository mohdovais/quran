(function () {
'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);
  
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  return returnValue;
}

__$styleInject(":lang(ar) {\n    direction: rtl;\n    font-family: Amiri, serif;\n}\n\nbody{\n    padding-top: 42px;\n}\n\nselect{\n    font-size: 16px;\n    border: none;\n    -moz-appearance: none;\n    -webkit-appearance: none;\n    color: #007aff;\n    padding: 0 15px 0 0;\n    margin: 5px 0;\n    vertical-align: middle;\n    height: 22px;\n    min-width: 45px;\n    cursor: pointer;\n    background: transparent url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2012%2020%22%3E%3Cg%20fill%3D%22%23007aff%22%3E%3Cpath%20d%3D%22m%2012%2C6%20-1.2%2C1.2%20-4.8%2C-4.8%20-4.8%2C4.8%20L%20-1.95e-7%2C6%206%2C0%2012%2C6%20Z%22%20/%3E%3Cpath%20d%3D%22m%2012%2C14%20-1.2%2C-1.2%20-4.8%2C4.8%20-4.8%2C-4.8%20-1.2%2C1.2%206%2C6%20L%2012%2C14%20Z%22%20/%3E%3C/g%3E%3C/svg%3E') no-repeat 100% 50%;\n}\n\nselect::-ms-expand { display: none; }\n\nsection{\n    max-width: 1200px;\n    margin: 0 auto;\n}\n\narticle {\n    line-height: 2.5em;\n    font-size: 1.5em;\n    padding: 1em;\n    text-align: justify;\n}\n\narticle header {\n    text-align: center;\n}\n\narticle header * {\n    line-height: 1;\n    padding: 0;\n    margin: 0;\n}\n\narticle header h2 {\n    font-size: 2em;\n}\n\narticle h2 img{\n    max-width: 100%;\n    max-height: 90px;\n}\n\narticle header h3 {\n    font-size: 0.7em;\n    color: #5C3219;\n    font-weight: 300;\n}\n\n.bismillah{\n    width: 240px;\n    height: 55px;\n    max-width: 100%;\n    margin-top: 1em;\n}\n\n.verse {\n    border-bottom: 1px dotted #5c1712;\n}\n\n.verse-count{\n    margin: 0 0.5em;\n    font-family: serif;\n}\n\n.verse-count span{\n    font-family: serif;\n}\n\n.verse-count svg{\n    height: 1.5em;\n    width: 1em;\n    vertical-align: middle;\n}\n\n.verse-count svg text{\n    direction: ltr;\n    fill: red;\n}\n\n.sajda {\n    color: red;\n}\n\n\nfooter {\n    text-align: center;\n    padding: 1em;\n}\n\n.nav{\n    text-align: center;\n}\n\n.nav:after{\n    content: '';\n    display: block;\n    clear: both;\n}\n\n.nav button{\n    background: none;\n    border: none;\n    color: #007aff;\n    padding: 5px 0;\n}\n\n.nav button:disabled{\n    opacity: 0;\n}\n\n.nav .text{\n    font-size: 0.8em;\n    padding: 0 1em;\n}\n\n.nav .next{\n    float: left;\n}\n.nav .prev{\n    float: right;\n}\n\n.nav button{\n    cursor: pointer;\n}\n\n.nav button svg{\n    margin: 0 0.25em;\n    vertical-align: middle;\n}\n\n.nav button span{\n    font-size: 16px;\n    line-height: 20px;\n    vertical-align: middle;\n}\n\nheader nav{\n    padding: 0.25em;\n\n    position: fixed;\n    top: 0;\n    width: 1200px;\n    max-width: 100%;\n\n    background-color: #FDF9F0;\n    border-bottom: 1px solid #5c3219;\n\n    -webkit-transform: translatez(0); /*360deg*/\n    -moz-transform: translatez(0);\n    -ms-transform: translatez(0);\n    -o-transform: translatez(0);\n    transform: translatez(0);\n}\n\n\n\n/* top navigation */\n", undefined);

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */
if (typeof Object.assign != 'function') {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) {
            // .length of function is 2
            'use strict';

            if (target == null) {
                // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) {
                    // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}

// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function value(predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return undefined.
            return undefined;
        }
    });
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var promise = createCommonjsModule(function (module) {
(function (root) {

  // Store setTimeout reference so promise-polyfill will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var setTimeoutFunc = setTimeout;

  function noop() {}
  
  // Polyfill for Function.prototype.bind
  function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }

  function Promise(fn) {
    if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
    if (typeof fn !== 'function') throw new TypeError('not a function');
    this._state = 0;
    this._handled = false;
    this._value = undefined;
    this._deferreds = [];

    doResolve(fn, this);
  }

  function handle(self, deferred) {
    while (self._state === 3) {
      self = self._value;
    }
    if (self._state === 0) {
      self._deferreds.push(deferred);
      return;
    }
    self._handled = true;
    Promise._immediateFn(function () {
      var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
      if (cb === null) {
        (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
        return;
      }
      var ret;
      try {
        ret = cb(self._value);
      } catch (e) {
        reject(deferred.promise, e);
        return;
      }
      resolve(deferred.promise, ret);
    });
  }

  function resolve(self, newValue) {
    try {
      // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
      if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
      if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
        var then = newValue.then;
        if (newValue instanceof Promise) {
          self._state = 3;
          self._value = newValue;
          finale(self);
          return;
        } else if (typeof then === 'function') {
          doResolve(bind(then, newValue), self);
          return;
        }
      }
      self._state = 1;
      self._value = newValue;
      finale(self);
    } catch (e) {
      reject(self, e);
    }
  }

  function reject(self, newValue) {
    self._state = 2;
    self._value = newValue;
    finale(self);
  }

  function finale(self) {
    if (self._state === 2 && self._deferreds.length === 0) {
      Promise._immediateFn(function() {
        if (!self._handled) {
          Promise._unhandledRejectionFn(self._value);
        }
      });
    }

    for (var i = 0, len = self._deferreds.length; i < len; i++) {
      handle(self, self._deferreds[i]);
    }
    self._deferreds = null;
  }

  function Handler(onFulfilled, onRejected, promise) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.promise = promise;
  }

  /**
   * Take a potentially misbehaving resolver function and make sure
   * onFulfilled and onRejected are only called once.
   *
   * Makes no guarantees about asynchrony.
   */
  function doResolve(fn, self) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return;
        done = true;
        resolve(self, value);
      }, function (reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      });
    } catch (ex) {
      if (done) return;
      done = true;
      reject(self, ex);
    }
  }

  Promise.prototype['catch'] = function (onRejected) {
    return this.then(null, onRejected);
  };

  Promise.prototype.then = function (onFulfilled, onRejected) {
    var prom = new (this.constructor)(noop);

    handle(this, new Handler(onFulfilled, onRejected, prom));
    return prom;
  };

  Promise.all = function (arr) {
    var args = Array.prototype.slice.call(arr);

    return new Promise(function (resolve, reject) {
      if (args.length === 0) return resolve([]);
      var remaining = args.length;

      function res(i, val) {
        try {
          if (val && (typeof val === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, reject);
              return;
            }
          }
          args[i] = val;
          if (--remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      }

      for (var i = 0; i < args.length; i++) {
        res(i, args[i]);
      }
    });
  };

  Promise.resolve = function (value) {
    if (value && typeof value === 'object' && value.constructor === Promise) {
      return value;
    }

    return new Promise(function (resolve) {
      resolve(value);
    });
  };

  Promise.reject = function (value) {
    return new Promise(function (resolve, reject) {
      reject(value);
    });
  };

  Promise.race = function (values) {
    return new Promise(function (resolve, reject) {
      for (var i = 0, len = values.length; i < len; i++) {
        values[i].then(resolve, reject);
      }
    });
  };

  // Use polyfill for setImmediate for performance gains
  Promise._immediateFn = (typeof setImmediate === 'function' && function (fn) { setImmediate(fn); }) ||
    function (fn) {
      setTimeoutFunc(fn, 0);
    };

  Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
    if (typeof console !== 'undefined' && console) {
      console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
    }
  };

  /**
   * Set the immediate function to execute callbacks
   * @param fn {function} Function to execute
   * @deprecated
   */
  Promise._setImmediateFn = function _setImmediateFn(fn) {
    Promise._immediateFn = fn;
  };

  /**
   * Change the function to execute on unhandled rejection
   * @param {function} fn Function to execute on unhandled rejection
   * @deprecated
   */
  Promise._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
    Promise._unhandledRejectionFn = fn;
  };
  
  if ('object' !== 'undefined' && module.exports) {
    module.exports = Promise;
  } else if (!root.Promise) {
    root.Promise = Promise;
  }

})(commonjsGlobal);
});

var ajax = function (url, callback, _method, data) {
    var method = _method && _method.toUpperCase() || 'GET';
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            return resolve(xhr);
        };
        xhr.onerror = function () {
            return reject(xhr);
        };
        xhr.open(method, url, true);
        xhr.send(data);
    });
};

/** Virtual DOM Node */
function VNode() {}

/** Global options
 *	@public
 *	@namespace options {Object}
 */
var options = {

	/** If `true`, `prop` changes trigger synchronous component updates.
  *	@name syncComponentUpdates
  *	@type Boolean
  *	@default true
  */
	//syncComponentUpdates: true,

	/** Processes all created VNodes.
  *	@param {VNode} vnode	A newly-created VNode to normalize/process
  */
	//vnode(vnode) { }

	/** Hook invoked after a component is mounted. */
	// afterMount(component) { }

	/** Hook invoked after the DOM is updated with a component's latest render. */
	// afterUpdate(component) { }

	/** Hook invoked immediately before a component is unmounted. */
	// beforeUnmount(component) { }
};

var stack = [];

var EMPTY_CHILDREN = [];

/** JSX/hyperscript reviver
*	Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *	@see http://jasonformat.com/wtf-is-jsx
 *	@public
 */
function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	// if a "vnode hook" is defined, pass every created VNode to it
	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

/** Copy own-properties from `props` onto `obj`.
 *	@returns obj
 *	@private
 */
function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }return obj;
}

/** Call a function asynchronously, as soon as possible.
 *	@param {Function} callback
 */
var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

// DOM properties that should NOT have "px" added when numeric
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

/** Managed queue of dirty components to be re-rendered */

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

/** Check if two nodes are equivalent.
 *	@param {Element} node
 *	@param {VNode} vnode
 *	@private
 */
function isSameNodeType(node, vnode, hydrating) {
	if (typeof vnode === 'string' || typeof vnode === 'number') {
		return node.splitText !== undefined;
	}
	if (typeof vnode.nodeName === 'string') {
		return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
	}
	return hydrating || node._componentConstructor === vnode.nodeName;
}

/** Check if an Element has a given normalized name.
*	@param {Element} node
*	@param {String} nodeName
 */
function isNamedNode(node, nodeName) {
	return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 * @param {VNode} vnode
 * @returns {Object} props
 */
function getNodeProps(vnode) {
	var props = extend({}, vnode.attributes);
	props.children = vnode.children;

	var defaultProps = vnode.nodeName.defaultProps;
	if (defaultProps !== undefined) {
		for (var i in defaultProps) {
			if (props[i] === undefined) {
				props[i] = defaultProps[i];
			}
		}
	}

	return props;
}

/** Create an element with the given nodeName.
 *	@param {String} nodeName
 *	@param {Boolean} [isSvg=false]	If `true`, creates an element within the SVG namespace.
 *	@returns {Element} node
 */
function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

/** Remove a child node from its parent if attached.
 *	@param {Element} node		The node to remove
 */
function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *	If `value` is `null`, the attribute/handler will be removed.
 *	@param {Element} node	An element to mutate
 *	@param {string} name	The name/key to set, such as an event or attribute name
 *	@param {any} old	The last value that was set for this name/node pair
 *	@param {any} value	An attribute value, such as a function to be used as an event handler
 *	@param {Boolean} isSvg	Are we currently diffing inside an svg?
 *	@private
 */
function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') {
		// ignore
	} else if (name === 'ref') {
		if (old) old(null);
		if (value) value(node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && typeof value === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		setProperty(node, name, value == null ? '' : value);
		if (value == null || value === false) node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));
		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

/** Attempt to set a DOM property to the given value.
 *	IE & FF throw for certain property-value combinations.
 */
function setProperty(node, name, value) {
	try {
		node[name] = value;
	} catch (e) {}
}

/** Proxy an event to hooked event handlers
 *	@private
 */
function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

/** Queue of components that have been mounted and are awaiting componentDidMount */
var mounts = [];

/** Diff recursion count, used to track the end of the diff cycle. */
var diffLevel = 0;

/** Global flag indicating if the diff is currently within an SVG */
var isSvgMode = false;

/** Global flag indicating if the diff is performing hydration */
var hydrating = false;

/** Invoke queued componentDidMount lifecycle methods */
function flushMounts() {
	var c;
	while (c = mounts.pop()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
 *	@returns {Element} dom			The created/mutated element
 *	@private
 */
function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	// diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
	if (!diffLevel++) {
		// when first starting the diff, check if we're diffing an SVG or within an SVG
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		// hydration is indicated by the existing element to be diffed not having a prop cache
		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	// append the element if its a new parent
	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	// diffLevel being reduced to 0 means we're exiting the diff
	if (! --diffLevel) {
		hydrating = false;
		// invoke queued componentDidMount lifecycle methods
		if (!componentRoot) flushMounts();
	}

	return ret;
}

/** Internals of `diff()`, separated to allow bypassing diffLevel / mount flushing. */
function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	// empty values (null, undefined, booleans) render as empty Text nodes
	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	// Fast case: Strings & Numbers create/update Text nodes.
	if (typeof vnode === 'string' || typeof vnode === 'number') {

		// update if it's already a Text node:
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			/* istanbul ignore if */ /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			// it wasn't a Text node: replace it with one and recycle the old Element
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	// If the VNode represents a Component, perform a component diff:
	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	// Tracks entering and exiting SVG namespace when descending through the tree.
	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	// If there's no existing element or it's the wrong type, create a new one:
	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			// move children into the replacement node
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			} // if the previous Element was mounted into the DOM, replace it inline
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			// recycle the old element (skips non-Element node types)
			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	// Optimization: fast-path for elements containing a single TextNode:
	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	}
	// otherwise, if there are existing or new children, diff them:
	else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	// Apply attributes/props from VNode to the DOM Element:
	diffAttributes(out, vnode.attributes, props);

	// restore previous SVG mode: (in case we're exiting an SVG namespace)
	isSvgMode = prevSvgMode;

	return out;
}

/** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
 *	@param {Element} dom			Element whose children should be compared & mutated
 *	@param {Array} vchildren		Array of VNodes to compare to `dom.childNodes`
 *	@param {Object} context			Implicitly descendant context object (from most recent `getChildContext()`)
 *	@param {Boolean} mountAll
 *	@param {Boolean} isHydrating	If `true`, consumes externally created elements similar to hydration
 */
function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	// Build up a map of keyed children and an Array of unkeyed children:
	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			// attempt to find a node based on key matching
			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			}
			// attempt to pluck a node of the same type from the existing children
			else if (!child && min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			// morph the matched/found/created DOM child to match vchild (deep)
			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	// remove unused keyed children:
	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	// remove orphaned unkeyed children:
	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

/** Recursively recycle (or just unmount) a node and its descendants.
 *	@param {Node} node						DOM node to start unmount/removal from
 *	@param {Boolean} [unmountOnly=false]	If `true`, only triggers unmount lifecycle, skips removal
 */
function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		// if node is owned by a Component, unmount that component (ends up recursing back here)
		unmountComponent(component);
	} else {
		// If the node's VNode had a ref function, invoke it with null here.
		// (this is part of the React spec, and smart for unsetting references)
		if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

/** Recollect/unmount all children.
 *	- we use .lastChild here because it causes less reflow than .firstChild
 *	- it's also cheaper than accessing the .childNodes Live NodeList
 */
function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

/** Apply differences in attributes from a VNode to the given DOM Element.
 *	@param {Element} dom		Element with attributes to diff `attrs` against
 *	@param {Object} attrs		The desired end-state key-value attribute pairs
 *	@param {Object} old			Current/previous attributes (from previous VNode or element's prop cache)
 */
function diffAttributes(dom, attrs, old) {
	var name;

	// remove attributes no longer present on the vnode by setting them to undefined
	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	// add new & update changed attributes
	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

/** Retains a pool of Components for re-use, keyed on component name.
 *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
 *	@private
 */
var components = {};

/** Reclaim a component for later re-use by the recycler. */
function collectComponent(component) {
	var name = component.constructor.name;
	(components[name] || (components[name] = [])).push(component);
}

/** Create a component. Normalizes differences between PFC's and classful Components. */
function createComponent(Ctor, props, context) {
	var list = components[Ctor.name],
	    inst;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	if (list) {
		for (var i = list.length; i--;) {
			if (list[i].constructor === Ctor) {
				inst.nextBase = list[i].nextBase;
				list.splice(i, 1);
				break;
			}
		}
	}
	return inst;
}

/** The `.render()` method for a PFC backing instance. */
function doRender(props, state, context) {
	return this.constructor(props, context);
}

/** Set a component's `props` (generally derived from JSX attributes).
 *	@param {Object} props
 *	@param {Object} [opts]
 *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
 *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
 */
function setComponentProps(component, props, opts, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	if (component.__ref = props.ref) delete props.ref;
	if (component.__key = props.key) delete props.key;

	if (!component.base || mountAll) {
		if (component.componentWillMount) component.componentWillMount();
	} else if (component.componentWillReceiveProps) {
		component.componentWillReceiveProps(props, context);
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (opts !== 0) {
		if (opts === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
 *	@param {Component} component
 *	@param {Object} [opts]
 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
 *	@private
 */
function renderComponent(component, opts, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    rendered,
	    inst,
	    cbase;

	// if updating
	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (opts !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		// context to pass to the child, can be updated via (grand-)parent component
		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {
			// set up high order component link

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			// destroy high order component link
			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || opts === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
	} else if (!skip) {
		// Ensure that pending componentDidMount() hooks of child components
		// are called before the componentDidUpdate() hook in the parent.
		// Note: disabled as it causes duplicate hooks, see https://github.com/developit/preact/issues/750
		// flushMounts();

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, previousContext);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	if (component._renderCallbacks != null) {
		while (component._renderCallbacks.length) {
			component._renderCallbacks.pop().call(component);
		}
	}

	if (!diffLevel && !isChild) flushMounts();
}

/** Apply the Component referenced by a VNode to the DOM.
 *	@param {Element} dom	The DOM node to mutate
 *	@param {VNode} vnode	A Component-referencing VNode
 *	@returns {Element} dom	The created/mutated element
 *	@private
 */
function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;
			// passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:
			oldDom = null;
		}
		setComponentProps(c, props, 1, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

/** Remove a component from the DOM and recycle it.
 *	@param {Component} component	The Component instance to unmount
 *	@private
 */
function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	// recursively tear down & recollect high-order component children:
	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

		component.nextBase = base;

		removeNode(base);
		collectComponent(component);

		removeChildren(base);
	}

	if (component.__ref) component.__ref(null);
}

/** Base Component class.
 *	Provides `setState()` and `forceUpdate()`, which trigger rendering.
 *	@public
 *
 *	@example
 *	class MyFoo extends Component {
 *		render(props, state) {
 *			return <div />;
 *		}
 *	}
 */
function Component(props, context) {
	this._dirty = true;

	/** @public
  *	@type {object}
  */
	this.context = context;

	/** @public
  *	@type {object}
  */
	this.props = props;

	/** @public
  *	@type {object}
  */
	this.state = this.state || {};
}

extend(Component.prototype, {

	/** Returns a `boolean` indicating if the component should re-render when receiving the given `props` and `state`.
  *	@param {object} nextProps
  *	@param {object} nextState
  *	@param {object} nextContext
  *	@returns {Boolean} should the component re-render
  *	@name shouldComponentUpdate
  *	@function
  */

	/** Update component state by copying properties from `state` to `this.state`.
  *	@param {object} state		A hash of state properties to update with new values
  *	@param {function} callback	A function to be called once component state is updated
  */
	setState: function setState(state, callback) {
		var s = this.state;
		if (!this.prevState) this.prevState = extend({}, s);
		extend(s, typeof state === 'function' ? state(s, this.props) : state);
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		enqueueRender(this);
	},


	/** Immediately perform a synchronous re-render of the component.
  *	@param {function} callback		A function to be called after component is re-rendered.
  *	@private
  */
	forceUpdate: function forceUpdate(callback) {
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		renderComponent(this, 2);
	},


	/** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
  *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
  *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
  *	@param {object} state		The component's current state
  *	@param {object} context		Context object (if a parent component has provided context)
  *	@returns VNode
  */
	render: function render() {}
});

/** Render JSX into a `parent` Element.
 *	@param {VNode} vnode		A (JSX) VNode to render
 *	@param {Element} parent		DOM element to render into
 *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
 *	@public
 *
 *	@example
 *	// render a div into <body>:
 *	render(<div id="hello">hello!</div>, document.body);
 *
 *	@example
 *	// render a "Thing" component into #foo:
 *	const Thing = ({ name }) => <span>{ name }</span>;
 *	render(<Thing name="one" />, document.querySelector('#foo'));
 */
function render(vnode, parent, merge) {
  return diff(merge, vnode, {}, false, parent, false);
}

var capitalize = function (_str) {
    var str = String(_str);
    return str.charAt(0).toUpperCase() + str.substring(1);
};

var TYPE_PAGE = 'page';
var TYPE_SURA = 'sura';
var ACTION_LOAD = 'LOAD';
var ACTION_GOTO_INDEX = 'GOTO_INDEX';
var ACTION_CHANGE_TYPE = 'CHANGE_TYPE';
var ACTION_APPLY = 'APPLY';
var ACTION_PAGING_OPTIONS = 'PAGING_OPTIONS';

var SURA_AR = 'سورة‎‎';
var BISMILLAH_AR = '\xD8\xA8\xD9\x90\xD8\xB3\xD9\u2019\xD9\u2026\xD9\x90 \xD8\xA7\xD9\u201E\xD9\u201E\xD9\u017D\xD9\u2018\xD9\u2021\xD9\x90 \xD8\xA7\xD9\u201E\xD8\xB1\xD9\u017D\xD9\u2018\xD8\xAD\xD9\u2019\xD9\u2026\xD9\u017D\xD9\u2020\xD9\x90 \xD8\xA7\xD9\u201E\xD8\xB1\xD9\u017D\xD9\u2018\xD8\xAD\xD9\x90\xD9\u0160\xD9\u2026\xD9\x90';

function observeStore(store, reducer, callback) {
    var currentState = void 0;

    function handleChange() {
        var nextState = reducer(store, currentState);
        if (nextState !== currentState) {
            currentState = nextState;
            callback(currentState);
        }
    }

    var unsubscribe = store.subscribe(handleChange);
    handleChange();
    return unsubscribe;
}

var check = function check(object1, object2) {
    var key;

    for (key in object1) {
        if (Object.prototype.hasOwnProperty.call(object1, key)) {
            if (object1[key] !== object2[key]) {
                return false;
            }
        }
    }
    return true;
};

var objectEquals = function (object1, object2) {

    // Short circuit if the same object is passed twice
    if (object1 === object2) {
        return true;
    }
    if (object1 && object2) {
        // Do the second check because we could have extra keys in
        // object2 that don't exist in object1.
        return check(object1, object2) && check(object2, object1);
    } else if (!object1 && !object2) {
        return object1 === object2;
    } else {
        return false;
    }
};

function gotoIndex(type, index) {
    return {
        type: ACTION_GOTO_INDEX,
        data: {
            type: type,
            index: index
        }
    };
}

function getSelectWidth(text) {
    var doc = document;
    var body = doc.body;
    var select = doc.createElement('select');
    var option = doc.createElement('option');
    var width;

    option.text = text;
    select.add(option, null);
    select.style.opacity = 0;
    body.appendChild(select);
    width = select.scrollWidth;
    body.removeChild(select);

    return width;
}

function resizeSelect(select) {
    var selected = select && select.options[select.selectedIndex];
    if (selected) {
        select.style.width = getSelectWidth(selected.innerText) + 'px';
    }
}

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Select = function (_Component) {
    inherits(Select, _Component);

    function Select() {
        classCallCheck(this, Select);
        return possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));
    }

    createClass(Select, [{
        key: 'updateWidth',
        value: function updateWidth() {
            var me = this;
            window.requestAnimationFrame(function () {
                //var node = me.getDOMNode();
                var node = me.base;
                if (node !== undefined) {
                    setTimeout(resizeSelect, 100, node);
                }
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.updateWidth();
        }

        // and or

    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.updateWidth();
        }
    }, {
        key: 'render',
        value: function render$$1() {
            return h(
                'select',
                this.props,
                this.props.children
            );
        }
    }]);
    return Select;
}(Component);

var Filter = function (_Component) {
    inherits(Filter, _Component);

    function Filter(props) {
        classCallCheck(this, Filter);

        var _this = possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, props));

        _this.state = _this.getStoreState(props.store);
        return _this;
    }

    createClass(Filter, [{
        key: 'getStoreState',
        value: function getStoreState(store) {
            var state = store && store.getState() || {};
            var props = ['dispalyTypes', 'pageIndex', 'pageType', 'pagingOptions'];

            if (props.indexOf(state.lastPropertyChanged) !== -1) {
                return {
                    types: state.dispalyTypes || [],
                    type: state.pageType,
                    typeOptions: state.pagingOptions || [],
                    currentIndex: state.pageIndex || 0
                };
            } else {
                return this.state;
            }
        }

        // after the component gets mounted to the DOM

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var me = this,
                store = me.props.store;

            me.unsubscribe = store && store.subscribe(function () {
                me.setState(function () {
                    return me.getStoreState(store);
                });
            });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(event) {
            event.preventDefault();
        }
    }, {
        key: 'gotoIndex',
        value: function gotoIndex$$1(index, event) {
            var me = this;

            event.preventDefault();
            if (index > 0 && index <= me.state.typeOptions.length) {
                me.props.store.dispatch(gotoIndex(me.state.type, index));
            }
        }
    }, {
        key: 'onSelectionChange',
        value: function onSelectionChange(event) {
            var index = parseInt(event.target.value, 10);
            //resizeSelect(event.target);
            this.gotoIndex(index, event);
        }
    }, {
        key: 'onTypeChange',
        value: function onTypeChange(event) {
            var type = event.target.value;
            this.props.store.dispatch({
                type: ACTION_CHANGE_TYPE,
                data: {
                    type: type,
                    index: 1
                }
            });
        }
    }, {
        key: 'getOptions',
        value: function getOptions(pages, selectedIndex) {
            var _pages = pages || [];
            var index = selectedIndex - 1;
            return _pages.map(function (page, i) {
                return h(
                    'option',
                    { value: page.value, selected: index === i },
                    page.text
                );
            });
        }
    }, {
        key: 'getTypes',
        value: function getTypes(types, currentType) {
            var _types = types || [];
            return _types.map(function (type) {
                return h(
                    'option',
                    { value: type.value, selected: type.value === currentType },
                    type.text
                );
            });
        }
    }, {
        key: 'render',
        value: function render$$1(props, state) {
            var me = this,
                options$$1 = me.getOptions(state.typeOptions, state.currentIndex),
                types = me.getTypes(state.types, state.type);

            return h(
                'form',
                { onSubmit: me.handleSubmit.bind(me) },
                h(
                    Select,
                    { onChange: me.onTypeChange.bind(me), 'aria-label': 'Select type' },
                    types
                ),
                '\xA0',
                h(
                    Select,
                    {
                        disabled: state.maxPage < 2,
                        onChange: me.onSelectionChange.bind(me),
                        'aria-label': 'Select page',
                        dir: 'rtl'
                    },
                    options$$1
                )
            );
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {}
        //console.log(arguments)


        // prior to removal from the DOM

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unsubscribe && this.unsubscribe();
        }
    }]);
    return Filter;
}(Component);

var _class = function (_Component) {
    inherits(_class, _Component);

    function _class(props) {
        classCallCheck(this, _class);

        var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this.unsubscribe = observeStore(props.store, _this.reducer.bind(_this), _this.setState.bind(_this));
        return _this;
    }

    createClass(_class, [{
        key: 'getStateFromStore',
        value: function getStateFromStore(store) {
            var storeState = store.getState();
            return Object.assign(Object.create(null), {
                index: storeState.pageIndex,
                max: storeState.pagingOptions.length,
                type: storeState.pageType,
                chapters: storeState.pageChapters
            });
        }
    }, {
        key: 'reducer',
        value: function reducer(store, oldState) {
            var newState = this.getStateFromStore(store);
            return objectEquals(newState, oldState) ? oldState : newState;
        }
    }, {
        key: 'gotoIndex',
        value: function gotoIndex(index, event) {
            var type = this.state.type;
            event.preventDefault();
            if (index > 0 && index <= this.state.max) {
                this.props.store.dispatch({
                    type: ACTION_GOTO_INDEX,
                    data: {
                        index: index,
                        type: type
                    }
                });
            }
        }
    }, {
        key: 'previous',
        value: function previous(event) {
            this.gotoIndex(this.state.index - 1, event);
        }
    }, {
        key: 'next',
        value: function next(event) {
            this.gotoIndex(this.state.index + 1, event);
        }
    }, {
        key: 'render',
        value: function render$$1() {
            var me = this;
            var state = me.state;
            var max = state.max;
            var index = state.index;
            var chapters = state.chapters.map(function (chapter) {
                //https://stackoverflow.com/questions/29988144/concat-rtl-string-with-ltr-string-in-javascript
                return chapter ? '\u202B' + SURA_AR + ' ' + chapter.name + '\u202C' : '';
            }).join(', ');

            //<span lang="ar">{chapters}</span>
            //<div class="text">{capitalize(state.type)} {index} of {max} <div>{chapters}</div></div>

            return h(
                'nav',
                { 'class': 'nav' },
                h(
                    'button',
                    { 'class': 'next', disabled: index >= max, onClick: me.next.bind(me) },
                    h(
                        'svg',
                        { xmlns: 'http://www.w3.org/2000/svg', width: '12', height: '20', viewBox: '0 0 12 20' },
                        h('path', { d: 'M10,0l2,2l-8,8l8,8l-2,2L0,10L10,0z', fill: '#007aff' })
                    ),
                    h(
                        'span',
                        null,
                        'Next'
                    )
                ),
                h(
                    'button',
                    { 'class': 'prev', disabled: index < 2, onClick: me.previous.bind(me) },
                    h(
                        'span',
                        null,
                        'Previous'
                    ),
                    h(
                        'svg',
                        { xmlns: 'http://www.w3.org/2000/svg', width: '12', height: '20', viewBox: '0 0 12 20' },
                        h('path', { d: 'M 2,0 0,2 8,10 0,18 2,20 12,10 2,0 Z', fill: '#007aff' })
                    )
                ),
                h(Filter, { store: me.props.store })
            );
        }

        // prior to removal from the DOM

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.unsubscribe) {
                this.unsubscribe();
            }
        }
    }]);
    return _class;
}(Component);

var Header = function (_Component) {
    inherits(Header, _Component);

    function Header() {
        classCallCheck(this, Header);
        return possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
    }

    createClass(Header, [{
        key: 'render',
        value: function render$$1() {
            return h(
                'header',
                null,
                h(_class, this.props)
            );
        }
    }]);
    return Header;
}(Component);

////"٠١٢٣٤٥٦٧٨٩"
function toArabicNumber(num) {
    var arabic = '\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669';
    return String(num).split('').reduce(function (accumulator, digit) {
        return accumulator += arabic.substr(parseInt(digit), 1);
    }, '');
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var guid = function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

var SvgAya = function (_Component) {
    inherits(SvgAya, _Component);

    function SvgAya() {
        classCallCheck(this, SvgAya);
        return possibleConstructorReturn(this, (SvgAya.__proto__ || Object.getPrototypeOf(SvgAya)).apply(this, arguments));
    }

    createClass(SvgAya, [{
        key: 'render',
        value: function render$$1() {
            var props = this.props;
            var fillColor = props.fillColor || '#e5bea1';
            var strokeColor = props.strokeColor || '#5c3219';
            var bgColor = props.bgColor || '#f5eed2';
            var id = guid();

            return h(
                'svg',
                { viewBox: '0 0 1250 1625', role: 'img', 'aria-labelledby': id, 'class': props.className },
                h(
                    'title',
                    { id: id },
                    props.desc
                ),
                h(
                    'g',
                    { stroke: strokeColor, 'stroke-width': '30' },
                    h('circle', { r: '605', cx: '633', cy: '822', fill: fillColor }),
                    h('circle', { r: '510', cx: '633', cy: '822', fill: bgColor }),
                    h('path', { fill: fillColor, d: 'M625 29.833c-103.84 178.52-196.29 123.51-353.51 236.32-72.27 51.866-146.27 134.606-229.57 148.02 40.92 54.082 105.585 76.11 201.66 30.11h.041c107.37 116.17 142.759-192.06 381.379 10.33 238.62-202.39 274.009 105.84 381.379-10.33h.04c96.076 46 160.741 23.972 201.661-30.11-83.3-13.414-157.3-96.154-229.57-148.02-157.22-112.81-249.67-57.8-353.51-236.32z' })
                ),
                h('circle', { fill: strokeColor, r: '69', cx: '620', cy: '266' }),
                h('path', { fill: strokeColor, d: 'M774.852 255.602a15.002 15.002 0 0 0-4.367 29.16c74.866 27.215 111.261 45.649 161.848 81.652a15.002 15.002 0 1 0 17.394-24.441c-52.253-37.19-92.918-57.752-168.992-85.406a15.002 15.002 0 0 0-5.883-.965zm-309.518 0a15.002 15.002 0 0 1 4.367 29.16c-74.866 27.215-111.261 45.649-161.848 81.652a15.002 15.002 0 1 1-17.394-24.441c52.254-37.19 92.918-57.752 168.992-85.406a15.002 15.002 0 0 1 5.883-.965z' }),
                h('path', { 'stroke-width': '30', stroke: strokeColor, fill: fillColor, d: 'M625 1595.167c-103.84-178.52-196.29-123.51-353.51-236.32-72.27-51.866-146.27-134.606-229.57-148.02 40.92-54.082 105.585-76.11 201.66-30.11h.041c107.37-116.17 142.759 192.06 381.379-10.33 238.62 202.39 274.009-105.84 381.379 10.33h.04c96.076-46 160.741-23.972 201.661 30.11-83.3 13.414-157.3 96.154-229.57 148.02-157.22 112.81-249.67 57.8-353.51 236.32z' }),
                h('circle', { r: '69', cx: '620', cy: '1358', fill: strokeColor }),
                h('path', { fill: strokeColor, d: 'M774.852 1369.398a15.002 15.002 0 0 1-4.367-29.16c74.866-27.215 111.261-45.649 161.848-81.652a15.002 15.002 0 1 1 17.394 24.441c-52.253 37.19-92.918 57.752-168.992 85.406a15.002 15.002 0 0 1-5.883.965zm-309.518 0a15.002 15.002 0 0 0 4.367-29.16c-74.866-27.215-111.261-45.649-161.848-81.652a15.002 15.002 0 1 0-17.394 24.441c52.254 37.19 92.918 57.752 168.992 85.406a15.002 15.002 0 0 0 5.883.965z' }),
                h(
                    'text',
                    { x: '620', y: '970', 'font-size': '700', 'text-anchor': 'middle' },
                    props.children[0]
                )
            );
        }
    }]);
    return SvgAya;
}(Component);

var _class$1 = function (_Component) {
    inherits(_class, _Component);

    function _class() {
        classCallCheck(this, _class);
        return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    createClass(_class, [{
        key: 'render',
        value: function render$$1() {
            var props = this.props;
            var id = guid();
            return h(
                'svg',
                {
                    viewBox: '0 0 1250 1625',
                    role: 'img',
                    'aria-labelledby': id,
                    'class': props.className,
                    width: props.width,
                    height: props.height
                },
                h(
                    'title',
                    { id: id },
                    props.title
                ),
                h('path', { fill: '#19435c', d: 'M1002.612 1402.795L752.454 1567.92q-205.664 0-318.384-16.81-194.788-28.673-300.586-114.696Q0 1328.638 0 1126.929q0-122.608 37.573-220.496 30.652-80.09 88-151.282 27.686-33.618 96.9-101.843-94.922-47.46-131.506-82.068-81.08-76.135-81.08-192.81 0-104.81 88.001-205.664Q198.743 57.08 342.114 57.08q64.27 0 136.45 37.573 48.45 24.72 121.62 82.068-96.9 0-198.744 12.854-131.506 16.81-212.585 48.45-98.877 38.562-98.877 94.922 0 60.315 113.709 114.697 95.91 45.483 217.529 64.27 98.877-53.393 192.81-90.967 104.81-41.528 217.53-69.214l-41.53 154.248q-205.663 80.09-296.63 122.608-183.911 87.012-281.8 177.978-125.573 116.675-125.573 250.16 0 139.416 104.81 219.506 90.966 69.214 267.956 97.888 140.405 22.742 357.935 22.742 46.472 0 92.944-.989l92.944-1.978v8.9z' }),
                h(
                    'text',
                    { x: '500', y: '1200', 'font-size': '700', 'text-anchor': 'middle' },
                    props.children[0]
                )
            );
        }
    }]);
    return _class;
}(Component);

var _class$2 = function (_Component) {
    inherits(_class, _Component);

    function _class() {
        classCallCheck(this, _class);
        return possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    createClass(_class, [{
        key: 'render',
        value: function render$$1() {
            var props = this.props;
            var id = guid();
            return h(
                'svg',
                {
                    viewBox: '0 0 99 147',
                    role: 'img',
                    'aria-labelledby': id,
                    'class': props.className,
                    width: props.width,
                    height: props.height
                },
                h(
                    'title',
                    { id: id },
                    props.title
                ),
                h('path', { d: 'M99.229 147.305H0l20.04-22.94v-51.68L0 49.923 49.57 0 99.23 49.922l-20.04 22.764v51.68l20.04 22.939zm-6.856-97.383L49.57 6.855 6.855 49.922l18.457 20.83v55.547L11.25 142.383h76.729l-14.063-16.084V70.752l18.457-20.83zm-9.316 0l-13.184 15.03v70.839H29.355v-70.84l-13.183-15.03L49.57 16.437l33.487 33.486zm-6.416 0l-27.07-27.07-26.983 27.07 11.074 12.305v68.73h31.904v-68.73l11.075-12.305zm-7.823 0l-7.734 8.525v65.39h-22.94v-65.39l-7.734-8.525 19.16-19.6 19.248 19.6zm-4.658 0L49.57 34.98 35.068 49.922l6.504 7.119v63.105h15.996V57.041l6.592-7.12z' })
            );
        }
    }]);
    return _class;
}(Component);

var Aya = function (_Component) {
    inherits(Aya, _Component);

    function Aya() {
        classCallCheck(this, Aya);
        return possibleConstructorReturn(this, (Aya.__proto__ || Object.getPrototypeOf(Aya)).apply(this, arguments));
    }

    createClass(Aya, [{
        key: 'render',
        value: function render$$1() {
            var rukuSign = void 0,
                sajdaSign = void 0,
                bgColor = void 0,
                fillColor = void 0,
                strokeColor = void 0;
            var aya = this.props.attr;
            var verseClass = 'verse';
            var id = 's' + aya.sura + '-a' + aya.index;
            var desc = 'End of Aya ' + aya.index + ' of Sura ' + aya.sura;
            if (aya.ruku) {
                bgColor = '#d2d9f5';
                fillColor = '#a1c8e5';
                strokeColor = '#19435c';
                rukuSign = h(
                    _class$1,
                    { title: 'Ruku ' + aya.ruku },
                    toArabicNumber(aya.ruku)
                );
            }

            if (aya.sajda) {
                //sajdaSign = <span role="img" title={`${aya.sajda} sajda`}>{'\u06E9'}</span>
                sajdaSign = h(_class$2, { title: aya.sajda + ' sajda' });
            }

            return h(
                'span',
                { 'class': verseClass + (aya.sajda ? ' sajda' : ''), id: id },
                h(
                    'span',
                    { 'class': verseClass + '-text' },
                    aya.text
                ),
                h(
                    'span',
                    { 'class': verseClass + '-count' },
                    sajdaSign,
                    h(
                        SvgAya,
                        {
                            desc: desc,
                            strokeColor: strokeColor,
                            bgColor: bgColor,
                            fillColor: fillColor
                        },
                        toArabicNumber(aya.index)
                    ),
                    rukuSign
                )
            );
        }
    }]);
    return Aya;
}(Component);

var Bismillah = function (_Component) {
    inherits(Bismillah, _Component);

    function Bismillah() {
        classCallCheck(this, Bismillah);
        return possibleConstructorReturn(this, (Bismillah.__proto__ || Object.getPrototypeOf(Bismillah)).apply(this, arguments));
    }

    createClass(Bismillah, [{
        key: "render",
        value: function render$$1() {
            return h(
                "svg",
                {
                    viewBox: "0 0 570.4 128.4",
                    role: "img",
                    "aria-labelledby": "bismillah-title bismillah-desc",
                    className: this.props.className },
                h(
                    "title",
                    { id: "bismillah-title" },
                    "In the name of Allah, the most beneficial, the most merciful"
                ),
                h(
                    "desc",
                    { id: "bismillah-desc" },
                    this.props.desc
                ),
                h("path", {
                    fill: this.props.fill,
                    d: "M12.8 39.2C11.731 46.131 7.462 51.063 0 54v-.4c4-2.4 6.4-4.938 7.2-7.6-3.738.264-6 .932-6.8 2 .531-3.2 1.462-5.469 2.8-6.8.531-.537 3.731-1.2 9.6-2zm193.6 21.2c0 4-.8 7.462-2.4 10.398-1.6 3.464-4 5.201-7.2 5.201-2.137 0-3.737-.139-4.8-.399v4c0 5.331-.669 8.662-2 10-10.669 12.262-20.669 18.4-30 18.4-4 0-7.069-1.869-9.2-5.601-1.869-2.938-2.8-6.27-2.8-10 0-6.138 1.462-13.737 4.4-22.8-3.2 2.399-8.538 7.331-16 14.8-8.269 8-14.269 13.601-18 16.8-6.938 5.332-12.538 8-16.8 8-3.2 0-6-1.537-8.4-4.6-2.4-3.068-3.6-6.601-3.6-10.601 0-4.801 1.6-10.938 4.8-18.399-.538.262-1.2.399-2 .399-1.869 0-3.469-.139-4.8-.399v4c0 5.331-.538 8.53-1.6 9.6-12.538 12.263-22.669 18.4-30.4 18.4-4 0-7.069-1.601-9.2-4.802-2.137-3.198-3.2-7.067-3.2-11.6 0-1.6.662-5.137 2-10.6 1.331-5.47 2-10.2 2-14.2 0-3.2-.4-6.27-1.2-9.2-3.2-.8-6.4-3.069-9.6-6.8-3.2-3.737-5.337-5.601-6.4-5.601-1.337 0-3.469 2.264-6.4 6.801A97.645 97.645 0 0 0 18 61.996c6.131 3.2 9.2 10.131 9.2 20.799h-2a82.35 82.35 0 0 1-8.4-4.395c-2.668-1.868-4-4.669-4-8.399-6.137 2.932-9.2 6.932-9.2 12 0 .531 2.6 6.662 7.8 18.399 5.2 11.73 7.8 21.063 7.8 28h-.8c-.538-4.27-3.6-12.138-9.2-23.602C4.131 94.131 1.6 86.4 1.6 81.6c0-6.938 4.131-13.338 12.4-19.2 1.063-3.469 3.731-8.137 8-14C26.8 41.462 30.663 38 33.6 38c1.063 0 3.6 2.4 7.6 7.2-.538-1.338-.8-2.669-.8-4 0-3.469 1.2-6.4 3.6-8.8 2.4-2.4 5.331-3.601 8.8-3.601 2.663 0 7.863 1.264 15.6 3.801 7.731 2.53 14.531 3.8 20.4 3.8l-4.8 8c-3.737.531-9.737 2.931-18 7.2-7.2 3.73-13.2 5.6-18 5.6h-1.6c1.332 3.731 2 7.731 2 12 0 3.463-.469 7.332-1.4 11.6-.938 4.265-1.4 6.663-1.4 7.201 0 8.531 3.462 12.799 10.4 12.799 5.063 0 10.931-2.668 17.6-8a159.19 159.19 0 0 0 12-10.799c0-1.869-1.069-4.801-3.2-8.801a92.014 92.014 0 0 0-3.6-7.199l2.8-6.8c2.4 3.731 4.131 6.262 5.2 7.599 1.863 1.863 3.863 2.802 6 2.802 2.663 0 4.8-1.068 6.4-3.2 0-4-.269-7.869-.8-11.601l-6.8-42.399c-.269-2.663-.8-4.663-1.6-6l2-5.601L99.2 14v2.4l-3.6-3.6c-.269.538-.269 1.069 0 1.601l6 40.399c.262 1.063.4 2.933.4 5.601 0 8-2.138 12.931-6.4 14.8-2.669 5.863-4 11.063-4 15.6 0 2.4.931 4.663 2.8 6.802 2.131 2.399 4.663 3.6 7.6 3.6 4.8 0 10.931-3.6 18.4-10.8a1334.436 1334.436 0 0 0 20-18.8c5.063-4.271 10-7.869 14.8-10.801-1.338-.536-3.338-2-6-4.399-3.738-2.938-5.6-6.27-5.6-10 0-6.137 3.331-9.2 10-9.2 12.8 0 26.663 2.262 41.6 6.8l-5.2 8c-4.8 1.601-13.469 5.063-26 10.4 1.331 2.132 2.8 7.2 4.4 15.2-7.2 0-10.8-2.139-10.8-6.4 0-.537.131-1.469.4-2.8.263-1.337.4-2.27.4-2.8-1.069.8-2.668 1.861-4.8 3.198-2.669 8.531-4 14.933-4 19.201 0 8.531 3.6 12.799 10.8 12.799 7.731 0 17.6-6.268 29.6-18.799-.269-1.869-1.337-4.801-3.2-8.801a54.095 54.095 0 0 1-3.6-6.8l2.4-7.2c2.4 4 4.262 6.531 5.6 7.599 1.6 1.863 3.6 2.802 6 2.802 2.662 0 4.8-1.068 6.4-3.2-.269-4-.669-7.869-1.2-11.601l-6.4-42c-.538-2.931-1.069-5.063-1.6-6.399l2-5.601 6.8 13.2v2.4L200 12.8c-.269.801-.269 1.47 0 2l6 40c.263 1.062.4 2.931.4 5.6zM27.6 24.8c0 4.531-1.469 6.801-4.4 6.801-2.669 0-4-1.47-4-4.4 0-1.869.4-4.131 1.2-6.8 1.6-3.2 2.4-5.063 2.4-5.601.531 2.139.663 3.601.4 4.4 2.931 1.6 4.4 3.469 4.4 5.6zm-1.2 1.6c-1.069-1.337-2.668-2.27-4.8-2.8-1.069 1.063-1.6 1.73-1.6 2 0 1.6.931 2.4 2.8 2.4 1.331 0 2.531-.538 3.6-1.6zm10.8 66l-2.8 4.398c-1.6.531-3.337.933-5.2 1.201-2.938 1.063-4.4 2.263-4.4 3.601 1.332 5.331 2 9.063 2 11.199 0 4.801-.137 7.601-.4 8.399 0-2.938-.538-6.8-1.6-11.6-1.068-4.802-1.6-7.869-1.6-9.2 0-2.399.862-4 2.6-4.8 1.731-.802 3.4-1.47 5-2-1.068-.802-2-1.2-2.8-1.2l-2.4 2v-2a30.572 30.572 0 0 0 2-3c.531-.938 1.2-1.399 2-1.399 1.6.001 4.131 1.463 7.6 4.401zm3.2-20l-3.2 6.398-6.8-3.198 2.4-5.6-6-3.201 2.8-6.398 7.2 3.2L34 69.2l6.4 3.2zm34-30.8c-1.6-.27-5.337-1.2-11.2-2.801C58.4 37.2 54.662 36.4 52 36.4c-6.138 0-9.2 2.263-9.2 6.8 0 1.862.663 3.731 2 5.6 1.063 1.063 2.4 1.601 4 1.601 3.731 0 8-1.069 12.8-3.2 7.731-3.47 12-5.339 12.8-5.601zM78 72c-4 10.131-9.069 15.2-15.2 15.2-4.537 0-6.8-2.137-6.8-6.4 0-3.469 2.931-7.067 8.8-10.799-1.068-.801-2.137-1.201-3.2-1.201-1.337 0-2.669.663-4 2v-1.6c1.331-2.938 3.2-4.4 5.6-4.4 4 0 7.2.531 9.6 1.602L68 70.799c-1.869.531-3.938 1.732-6.2 3.602-2.269 1.862-3.4 3.462-3.4 4.8 0 2.4 2.131 3.6 6.4 3.6 2.932 0 5.863-1.6 8.8-4.799 1.331-2.14 2.8-4.14 4.4-6.002zm7.2-54.4c0 3.199-1.069 4.8-3.2 4.8-1.069 0-2.138-.531-3.2-1.601-.8 2.139-2 3.2-3.6 3.2-1.869 0-2.8-1.2-2.8-3.6v-4.8c-.538.538-1.2 1.337-2 2.399v-1.6c.531-1.331 1.863-3.063 4-5.2-.8 5.6-.269 8.4 1.6 8.4 1.331 0 2-.932 2-2.801 0-.8-.269-2.399-.8-4.8L78.4 9.6c.8 1.337 1.332 3.337 1.6 6 0 1.869.663 2.8 2 2.8.8 0 1.2-.663 1.2-2L82 11.2l1.6-2.8c1.063 3.469 1.6 6.538 1.6 9.2zM108 86.4c-.269 3.73-1.6 5.601-4 5.601s-3.6-1.201-3.6-3.601c0-3.469 1.863-7.469 5.6-12-1.869 4.263-2.8 7.331-2.8 9.2 0 1.861.662 2.8 2 2.8 1.331 0 2.131-.669 2.4-2h.4zm8-23.2c0 5.599-.669 9.863-2 12.8h-.8c.262-5.869 0-12-.8-18.399l-7.2-45.2c-.269-2.663-.8-4.663-1.6-6l2-5.601 6.8 13.2v2.4l-3.2-3.601c-.269.538-.269 1.069 0 1.601l6.4 42.8c.262 1.331.4 3.331.4 6zm18-50c0 1.068-.4 2.27-1.2 3.6-.8-.8-1.469-1.199-2-1.199-1.337 0-2.4 1.869-3.2 5.6-.538 2.4-.938 5.063-1.2 8-.8-2.138-2.137-4.938-4-8.4-.269 1.339-1.069 2-2.4 2-2.138 0-3.2-1.199-3.2-3.6 0-2.932.932-4.4 2.8-4.4 2.4 0 4.531 2.801 6.4 8.4 1.6-9.6 3.6-14.4 6-14.4 1.331-.001 2 1.468 2 4.399zm.4 22.4c-1.069 7.199-5.2 12.131-12.4 14.8l-.4-.4c4-2.399 6.4-4.938 7.2-7.6-3.737.263-6 .931-6.8 2 .531-3.2 1.462-5.469 2.8-6.8.531-.537 3.731-1.2 9.6-2zm-.4 24.8l-3.2 6.398L124 63.6l3.2-6.4 6.8 3.2zm7.2 42.8c0 3.731-1.338 5.601-4 5.601-2.4 0-3.6-1.199-3.6-3.601 0-3.469 1.862-7.469 5.6-12h.4c-2.138 4.263-3.2 7.332-3.2 9.2 0 1.862.663 2.8 2 2.8 1.332 0 2.131-.668 2.4-2h.4zm7.2-85.6c0 3.199-.668 6.8-2 10.8.263-2.137.4-4.531.4-7.2 0-4.8-1.469-8.531-4.4-11.2l.4-4.8c1.863 1.068 3.263 2.938 4.2 5.6.931 2.669 1.4 4.937 1.4 6.8zm33.2 31.6c-7.469-3.2-16.138-4.8-26-4.8-4.8 0-8 .531-9.6 1.6 0 .531 1.731 2.063 5.2 4.601 3.462 2.53 6.4 5 8.8 7.399 5.6-2.669 12.8-5.6 21.6-8.8zM190.4 4c0 1.601-.469 3.47-1.4 5.601-.938 2.137-2.069 3.736-3.4 4.8 1.6-3.2 2.4-5.462 2.4-6.8-13.6 4.269-26 11.469-37.2 21.6.263-1.338.531-2.669.8-4 4.531-4.531 10.6-8.8 18.2-12.8C177.4 8.4 184.263 5.6 190.4 4zm-10 70.4c.531 2.132 0 3.331-1.6 3.601-.8.263-2-.27-3.6-1.601-1.069 1.862-2.8 4.398-5.2 7.601-2.938 3.462-6.8 5.601-11.6 6.399l-3.6.8c3.731-1.869 7.863-4.537 12.4-8 3.731-2.938 6.262-5.869 7.6-8.8 1.063-2.138 2-3.337 2.8-3.602 1.331-.266 2.262.933 2.8 3.602zm3.2-47.6c0 3.2-1.069 4.801-3.2 4.801-1.069 0-2.137-.669-3.2-2-.8 2.131-2 3.199-3.6 3.199s-2.538-1.067-2.8-3.199v-5.2c-.537.8-1.068 1.6-1.6 2.399v-1.2c.262-1.337 1.462-3.063 3.6-5.2-.8 5.332-.269 8 1.6 8 1.332 0 2-.8 2-2.4 0-.8-.269-2.53-.8-5.2l1.6-2c.531 1.069.931 2.938 1.2 5.601 0 1.863.663 2.8 2 2.8.8 0 1.2-.538 1.2-1.6 0-.27-.4-2-1.2-5.2l1.6-3.2c1.063 3.468 1.6 6.668 1.6 9.599zm-4 48.8c-1.069-1.601-2.269-2-3.6-1.2 1.6 1.062 2.8 1.462 3.6 1.2zM216 92c0 2.662-.8 4-2.4 4-1.069 0-2.269-.399-3.6-1.201-4.538 8.265-12.938 12.265-25.2 12h-.4v-.399c12-2.938 20.131-7.069 24.4-12.399-1.337-.538-2-1.338-2-2.399 0-.802.4-1.738 1.2-2.802.8-1.067 1.462-1.6 2-1.6l-.4-1.6.4-.4c.531 0 1.462.531 2.8 1.6v.4c2.131 2.4 3.2 4 3.2 4.8zm4.4-28.8c0 5.599-.668 9.863-2 12.8h-.8c.262-5.869-.138-12-1.2-18.399l-6.8-45.2c-.538-2.663-1.069-4.663-1.6-6L210 .8l6.8 13.2v2.4l-3.2-3.601a3.543 3.543 0 0 0-.4 1.601l6.8 42.8c.263 1.331.4 3.331.4 6zM211.6 90c0-.538-.269-.801-.8-.801-1.068 0-1.869.4-2.4 1.2.531.8 1.332 1.331 2.4 1.601 0-.27.131-.601.4-1 .262-.4.4-.738.4-1zm358.8-14.8c0 3.731-.869 6.801-2.602 9.2-1.736 2.398-3.668 3.6-5.799 3.6-4 0-6.8-2.538-8.4-7.601-1.067 5.063-3.337 7.601-6.8 7.601-3.2 0-5.337-2.139-6.398-6.399-2.139 5.063-5.869 7.6-11.2 7.6-1.869 0-3.4-.737-4.602-2.199-1.198-1.469-1.8-3.139-1.8-5v-2c-37.6 11.73-76 17.601-115.2 17.601-18.938 0-37.469-1.601-55.6-4.802-17.338-2.668-30.27-6.268-38.8-10.799 0 3.73-.139 7.462-.4 11.199H312c-3.2-2.137-5.2-4.668-6-7.6a110.407 110.407 0 0 1-.6-6c-.139-1.869-1.802-2.802-5-2.802-2.938 0-7.938 4.265-15 12.802-7.069 8.53-12.469 12.8-16.2 12.8-2.138 0-4-1-5.6-3s-2.4-4.737-2.4-8.2c0-1.869.4-4.137 1.2-6.8-1.337.531-2.668.8-4 .8-5.337 0-8.8-3.6-10.4-10.8-.538 8.8-4.538 13.2-12 13.2-3.2 0-5.6-1.738-7.2-5.2-1.068-2.669-1.469-5.737-1.2-9.2 0-.537.262-2.4.8-5.6.263-2.669.4-5.069.4-7.2-1.869 2.663-3.2 6.132-4 10.398-.537 2.933-1.068 5.863-1.6 8.802-1.069 4.8-2.8 7.198-5.2 7.198-1.869 0-3.469-1.536-4.8-4.6-1.338-3.068-2-6.338-2-9.8 0-3.737.262-7.868.8-12.4l.8.4a51.025 51.025 0 0 0-.4 6.398c0 9.063 1.863 13.602 5.6 13.602 1.331 0 2.531-2 3.6-6 1.862-6.669 2.931-10.538 3.2-11.601 1.863-4.536 4.263-7.6 7.2-9.199v5.199c-1.069 6.932-1.6 11.201-1.6 12.801 0 5.861 2.131 8.8 6.4 8.8 2.663 0 5-1.069 7-3.2 2-2.137 3-4.668 3-7.6L244 54l2-5.6c1.331 2.663 2.131 4.8 2.4 6.399.8 4.531 1.462 9.2 2 14 1.6 6.663 4.531 10 8.8 10 2.662 0 4.531-1.067 5.6-3.198-1.337-2.938-2.668-5.869-4-8.802-1.869-4.799-2.938-8.536-3.2-11.198l-1.2-2.801 1.6-5.6 5.6 8.8v2c-.8-.538-1.6-1.2-2.4-2-.269.531-.269.8 0 .8 3.731 8.531 5.6 14.4 5.6 17.601 0 4.8-1.068 8-3.2 9.601-.8 2.662-1.2 4.662-1.2 6 0 3.73 1.863 5.601 5.6 5.601 3.462 0 8.663-4.338 15.6-13 6.93-8.669 12.4-13 16.4-13 1.331 0 3.2.8 5.6 2.399l2-4.801c3.731 5.331 14.8 10.261 33.2 14.799 21.063 4.799 45.2 7.199 72.4 7.199 18.398 0 38.662-1.6 60.8-4.8 19.2-2.938 36.531-6.538 52-10.8-.537.8-.8 1.729-.8 2.8 0 1.601.531 3.063 1.6 4.398 1.063 1.332 2.263 2 3.602 2 2.661 0 5.462-1.337 8.398-4L544 73.6l.4.4v1.601c0 3.729 1.331 5.6 4 5.6 1.331 0 2.8-1.199 4.398-3.6 1.862-3.2 3.2-5.068 4-5.601h.4v1.601c0 2.131.73 4.063 2.2 5.8 1.463 1.73 2.863 2.6 4.2 2.6 2.663 0 4-1.068 4-3.201 0-2.398-2-7.198-6-14.398-4.269-7.737-6.537-12.4-6.8-14a48.52 48.52 0 0 0-1.2-2.2c-.537-.938-.8-1.538-.8-1.8l1.2-6 8 8.399V50.4l-3.6-1.601v.801c2.131 3.199 4.262 6.399 6.398 9.6 3.735 6.662 5.604 12 5.604 16zm-355.6 18c-.537-.537-1.337-1.469-2.4-2.8l-.8 2c.8.531 1.6.8 2.4.8h.8zM262.4 0c0 1.337-.538 3.069-1.6 5.2-1.068 2.137-2.137 3.869-3.2 5.2 1.6-3.2 2.4-5.601 2.4-7.2-16.538 5.337-30.538 13.2-42 23.6 0-1.337.263-2.8.8-4.399 4.531-4.262 11.463-8.8 20.8-13.601 8.8-4.531 16.4-7.463 22.8-8.8zm-16.8 93.6c0 1.331-.538 2.662-1.6 4-.538-.802-1.2-1.2-2-1.2-1.337 0-2.4 1.73-3.2 5.2a84.252 84.252 0 0 1-1.2 8c-.538-1.869-1.869-4.669-4-8.4-.269 1.6-.938 2.4-2 2.4-2.4 0-3.6-1.338-3.6-4 0-2.669 1.063-4 3.2-4 2.131 0 4.262 2.8 6.4 8.399 1.331-9.601 3.331-14.399 6-14.399 1.331 0 2 1.331 2 4zm.8-59.2c0 3.2-1.2 4.8-3.6 4.8-.8 0-1.869-.669-3.2-2-.538 2.131-1.738 3.2-3.6 3.2-1.6 0-2.538-1.069-2.8-3.2V32c-.538.8-1.069 1.601-1.6 2.4v-1.6c.531-1.067 1.731-2.668 3.6-4.8-.538 5.331 0 8 1.6 8 1.332 0 2-.938 2-2.8 0-.538-.269-2.138-.8-4.8l1.6-2c.8 1.063 1.2 2.931 1.2 5.6.263 1.862 1.063 2.8 2.4 2.8.8 0 1.2-.536 1.2-1.6 0-.269-.4-2-1.2-5.2l1.2-3.2c1.331 3.463 2 6.662 2 9.6zm10-4.4c0 3.2-.668 6.8-2 10.8.263-2.137.4-4.536.4-7.199 0-4.801-1.469-8.538-4.4-11.2l.4-5.2c1.6 1.337 2.932 3.337 4 6 1.062 2.661 1.6 4.93 1.6 6.799zM278 63.2c0 5.599-.538 9.863-1.6 12.8h-.8c.262-5.869-.138-12-1.2-18.399l-6.8-45.2c-.538-2.663-1.069-4.663-1.6-6L268 .8l6.8 13.2v2.4l-3.2-3.601a3.543 3.543 0 0 0-.4 1.601l6.8 42.8v6zm25.6 27.599c.264 2.4-.269 3.732-1.6 4-.8 0-2.138-.536-4-1.6-1.067 1.863-2.669 4.263-4.8 7.2-3.2 3.462-7.2 5.73-12 6.8l-3.2.4c3.462-1.601 7.463-4.139 12-7.601 4-3.201 6.662-6.27 8-9.201 1.063-2.137 1.862-3.337 2.4-3.6 1.331.003 2.4 1.203 3.2 3.602zM301.2 19.2c0 1.068-.4 2.27-1.2 3.6-.8-.8-1.469-1.199-2-1.199-1.338 0-2.399 1.736-3.2 5.199-.537 2.933-.938 5.601-1.199 8-.537-1.868-1.869-4.536-4-8-.27 1.332-1.068 2-2.399 2-2.138 0-3.2-1.199-3.2-3.6 0-2.932.931-4.4 2.8-4.4 2.4 0 4.531 2.801 6.4 8.4 1.6-9.6 3.6-14.4 6-14.4 1.329 0 1.998 1.469 1.998 4.4zm1.2 22l-2.802 4.4c-1.6.53-3.336 1.063-5.199 1.6-2.938.8-4.399 2-4.399 3.6 1.331 5.063 2 8.663 2 10.801 0 4.8-.138 7.6-.399 8.399 0-2.938-.537-6.737-1.601-11.399-1.067-4.669-1.601-7.669-1.601-9 0-2.669.863-4.4 2.601-5.2a47.971 47.971 0 0 1 5-2c-1.338-.538-2.399-.8-3.2-.8.264 0-.537.53-2.398 1.6l.398-2c.531-.8 1.133-1.8 1.801-3 .662-1.2 1.399-1.8 2.199-1.8 1.599-.001 4.132 1.599 7.6 4.799zm.4 50.8c-1.067-1.601-2.269-2-3.6-1.201 1.331 1.063 2.531 1.463 3.6 1.201zm8.4-10.8c-.8-.537-2-1.737-3.602-3.6 0 1.331.332 2.861 1 4.6.663 1.731 1.4 2.6 2.2 2.6.265-.001.402-1.2.402-3.6zM516.8 98c-1.337 0-2.269-.801-2.8-2.399-1.869 2.399-3.6 3.6-5.2 3.6-.537 0-1.398-.4-2.6-1.199-1.2-.802-1.938-1.202-2.2-1.202-1.338 0-3.869.802-7.6 2.4-4.802 2.131-8.67 3.731-11.602 4.801-5.868 1.861-12.269 2.799-19.2 2.799l-.398-.8c5.862 0 11.73-1.201 17.6-3.601 3.2-1.069 7.731-3.2 13.602-6.399 4.262-2.399 7.331-3.601 9.198-3.601.531 0 1.332.531 2.4 1.601 1.063 1.063 2 1.601 2.8 1.601 1.063 0 2.263-1.338 3.602-4l1.198-.802c-.269 2.133.4 3.201 2 3.201.802 0 1.602-1.338 2.4-4l.8-.399c0 5.599-1.337 8.399-4 8.399zm31.6-72.8c0 1.063-.538 2.4-1.602 4-.8-1.069-1.469-1.6-2-1.6-1.337 0-2.398 1.861-3.2 5.6a91.339 91.339 0 0 1-1.198 7.6c-.802-1.868-2.139-4.536-4-8-.271 1.332-1.069 2-2.4 2-2.138 0-3.2-1.199-3.2-3.6 0-2.938.933-4.4 2.8-4.4 2.4 0 4.531 2.801 6.4 8.4 1.6-9.6 3.6-14.4 6-14.4 1.6 0 2.4 1.469 2.4 4.4zM545.2 56c0 4.8-1.469 7.2-4.4 7.2-2.669 0-4-1.469-4-4.4 0-1.868.531-4.137 1.602-6.8 1.6-3.2 2.398-5.068 2.398-5.6.531 2.131.663 3.6.4 4.399 2.662 1.601 4 3.332 4 5.201zm-1.2 2c-1.068-1.337-2.669-2.399-4.8-3.2-.8 1.332-1.2 2.132-1.2 2.4 0 1.331.932 2 2.8 2 1.331 0 2.4-.4 3.2-1.2zm20 38l-2.8 6.399-6.8-3.602 2.8-6.398L564 96z" })
            );
        }
    }]);
    return Bismillah;
}(Component);

var Sura = function (_Component) {
    inherits(Sura, _Component);

    function Sura() {
        classCallCheck(this, Sura);
        return possibleConstructorReturn(this, (Sura.__proto__ || Object.getPrototypeOf(Sura)).apply(this, arguments));
    }

    createClass(Sura, [{
        key: 'render',
        value: function render$$1(props) {
            var sura = props.data;

            if (sura) {
                return h(
                    'article',
                    { lang: 'ar' },
                    this.getHeader(sura),
                    this.getVerse(sura.ayas)
                );
            } else {
                return h('article', { lang: 'ar' });
            }
        }
    }, {
        key: 'getHeader',
        value: function getHeader(sura) {
            var h2 = void 0,
                h3 = void 0,
                h4 = void 0;
            var firstAya = sura.ayas[0];

            if (!firstAya) {
                return;
            }

            var svgTitle = 'assets/images/sura-title/' + firstAya.sura + '.svg';
            var altTitle = SURA_AR + ' ' + sura.name;

            if (firstAya.index === 1) {
                h2 = h(
                    'h2',
                    null,
                    h('img', { src: svgTitle, alt: altTitle })
                );
                h3 = h(
                    'h3',
                    null,
                    sura.tname,
                    ' | ',
                    sura.ename,
                    ' | ',
                    sura.type
                );
            }

            if (firstAya.bismillah || firstAya.sura === 1) {
                h4 = h(Bismillah, { fill: '#19435C', desc: BISMILLAH_AR, className: 'bismillah' });
            }

            return h(
                'header',
                null,
                h2,
                h3,
                h4
            );
        }
    }, {
        key: 'getVerse',
        value: function getVerse(verse) {
            return verse.reduce(function (accum, aya) {
                return aya.sura === 1 && aya.index === 1 ? accum : accum.concat(h(Aya, { attr: aya }));
            }, []);
        }
        /*
            stepState(){
                const me = this;
                const count = me.state.ayas.length + 50;
                const ayas = me.props.data.ayas || [];
        
                me.setState(function(state, props){
                    return Object.assign({}, me.props.data, {
                        ayas: ayas.slice(0, count)
                    });
                });
        
                if(count < ayas.length){
                    window.requestAnimationFrame(me.stepState.bind(me));
                }
            }
            */

    }]);
    return Sura;
}(Component);

var Content = function (_Component) {
    inherits(Content, _Component);

    function Content(props) {
        classCallCheck(this, Content);

        var _this = possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));

        _this.state = _this.getStoreState(props.store);
        return _this;
    }

    // after the component gets mounted to the DOM


    createClass(Content, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var me = this,
                store = me.props.store;

            me.unsubscribe = store.subscribe(function () {
                me.setState(function (prevState, props) {
                    return me.getStoreState(store);
                });
            });
        }
    }, {
        key: 'getStoreState',
        value: function getStoreState(store) {
            var state = store && store.getState() || {};
            return {
                chapters: state.pageChapters || []
            };
        }
    }, {
        key: 'render',
        value: function render$$1(props, state) {
            return h(
                'main',
                null,
                state.chapters.map(function (chapter) {
                    return h(Sura, { data: chapter });
                })
            );
        }

        // prior to removal from the DOM

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unsubscribe();
        }
    }]);
    return Content;
}(Component);

var Footer = function (_Component) {
    inherits(Footer, _Component);

    function Footer() {
        classCallCheck(this, Footer);
        return possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
    }

    createClass(Footer, [{
        key: 'render',
        value: function render$$1() {
            return h(
                'footer',
                null,
                h(_class, this.props)
            );
        }
    }]);
    return Footer;
}(Component);

var App = function (_Component) {
    inherits(App, _Component);

    function App() {
        classCallCheck(this, App);
        return possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    createClass(App, [{
        key: 'render',
        value: function render$$1() {
            var store = this.props.store;
            return h(
                'section',
                { hidden: true },
                h(Header, { store: store }),
                h(Content, { store: store }),
                h(Footer, { store: store }),
                '\xA0'
            );
        }
    }]);
    return App;
}(Component);

var Router = function () {
    function Router(routes) {
        classCallCheck(this, Router);

        var me = this;
        me.routes = {};
        me.addRoutes(routes);
        window.addEventListener('hashchange', me.onHashChange.bind(me));
    }

    createClass(Router, [{
        key: 'addRoutes',
        value: function addRoutes(_routes) {
            var routes = Object.assign({}, _routes);
            var scope = routes.scope || this;

            delete routes.scope;

            for (var i in routes) {
                this.addRoute(i, routes[i], scope);
            }
        }
    }, {
        key: 'addRoute',
        value: function addRoute(route, callback, scope) {
            return this.routes[route] = {
                callback: callback,
                regex: new RegExp('^' + route + '$'),
                scope: scope || this
            };
        }
    }, {
        key: 'onHashChange',
        value: function onHashChange(event) {
            this.execute(event.target.location.hash);
        }
    }, {
        key: 'execute',
        value: function execute(hash) {
            var me = this;
            hash = hash === undefined ? window.location.hash : hash;
            hash = hash.replace(/^\#/, '').replace(/\/$/, '');
            var routeMatch = me.getRouteMatch(hash);
            if (routeMatch) {
                routeMatch.route.callback.apply(routeMatch.route.scope, Array.prototype.slice.call(routeMatch.match, 1));
            } else {
                me.routeMissed();
            }

            return me;
        }
    }, {
        key: 'getRouteMatch',
        value: function getRouteMatch(hash) {
            var routes = this.routes;
            var i = void 0,
                match = void 0,
                route = void 0;
            for (i in routes) {
                route = routes[i];
                match = route.regex.exec(hash);
                if (match) {
                    return {
                        route: route,
                        match: match
                    };
                }
            }
        }
    }, {
        key: 'routeMissed',
        value: function routeMissed() {}
    }, {
        key: 'redirectTo',
        value: function redirectTo(route) {
            window.location = '#' + route;
        }
    }, {
        key: 'then',
        value: function then(fn) {
            fn();
        }
    }]);
    return Router;
}();

var googleFonts = function (fontFamily) {
    var nodeType = "link",
        existingNode = document.getElementsByTagName(nodeType)[0],
        node = document.createElement(nodeType);

    node.rel = 'stylesheet';
    node.href = 'https://fonts.googleapis.com/css?family=' + fontFamily;
    node.type = 'text/css';
    existingNode.parentNode.insertBefore(node, existingNode);
};

var initialState = {
    lastPropertyChanged: null,
    quran: {},
    dispalyTypes: [{
        text: capitalize(TYPE_SURA),
        value: TYPE_SURA
    }, {
        text: capitalize(TYPE_PAGE),
        value: TYPE_PAGE
    }],
    pagingOptions: [],
    pageType: TYPE_SURA,
    pageIndex: 1,
    pageChapters: []
};

function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    if (action.type === ACTION_APPLY) {
        state = Object.assign({}, state, action.data);
    }
    return state;
}

var getObjectProperty = function (obj, property) {
    return property.split('.').reduce(function (acc, prop) {
        return acc && acc[prop];
    }, obj);
};

function getPageTypeOptions(count) {
    return Array.apply(null, Array(count)).map(function (item, index) {
        var i = index + 1;
        return {
            text: i,
            value: i
        };
    });
}

function getSuraTypeOptions(suraList) {
    return suraList.filter(function (page) {
        return !!page.name;
    }).map(function (page) {
        return {
            text: page.tname + ' ' + page.name,
            value: page.index
        };
    });
}

var pagingReducer = function (state) {
    var suraList, maxPages;
    switch (state.pageType) {
        case 'sura':
            suraList = getObjectProperty(state, 'quran.Sura') || [];
            return Object.assign({}, state, {
                pagingOptions: getSuraTypeOptions(suraList)
            });
        case 'page':
            maxPages = getObjectProperty(state, 'quran.Page.length');
            return Object.assign({}, state, {
                pagingOptions: getPageTypeOptions(maxPages)
            });
        default:
            return state;
    }
};

var hasOwnProperty = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
};

function WebWorker(worker) {
    var me = this;
    me.callbacks = Object.create(null);
    me.worker = worker;
    me.worker.onmessage = me.onMessage.bind(me);
}

WebWorker.prototype.onMessage = function (e) {
    var response = e.data;
    var callback = this.callbacks[response.messageId];

    if (callback) {
        delete this.callbacks[response.messageId];
        callback(false, response.data);
    }
};

WebWorker.prototype.postMessage = function (message) {
    var me = this;
    return new Promise(function (resolve, reject) {
        var messageId = guid();
        me.callbacks[messageId] = function (error, result) {
            if (error) {
                return reject(new Error(error.message));
            }
            resolve(result);
        };
        me.worker.postMessage({
            messageId: messageId,
            message: message
        });
    });
};

/*
export default function (source, suraIndex) {
    const hasSource = source.quran.length > 0;
    var suraList, chapter;

    if (hasSource) {
        suraList = source.meta.suras.sura || [];
        chapter = suraList[suraIndex - 1];
        return chapter ? [Object.assign({}, chapter, {
            ayas: source.quran.filter(function (aya) {
                return aya.sura === suraIndex;
            })
        })] : [];
    }

    return [];
}
*/
var getSura = function (quran, suraIndex) {
    var sura = quran.Sura || [];
    return [sura[suraIndex]] || [];
};

function getSuraAyas(Sura, start, end) {
    var i = start[0],
        j = start[1] - 1,
        s2 = end[0],
        p2 = end[1] - 1,
        response = [],
        ayas,
        aya;

    for (; i <= s2; i++) {
        aya = Sura[i].ayas[j];
        ayas = [];
        while (aya) {
            if (aya === Sura[s2].ayas[p2]) {
                break;
            } else {
                ayas.push(aya);
                j++;
                aya = Sura[i].ayas[j];
            }
        }

        if (ayas.length > 0) {
            response.push(Object.assign({}, Sura[i], {
                ayas: ayas
            }));
        }

        j = 0;
    }

    return response;
}

function getPage(Quran, i) {
    var pages = getObjectProperty(Quran, 'Page') || [],
        suras = getObjectProperty(Quran, 'Sura') || [],
        start = pages[i],
        end = pages[i + 1];

    if (start && end) {
        return getSuraAyas(suras, start, end);
    } else {
        return [];
    }
}

var getVerse = function (type, index, source) {
    switch (type) {
        case TYPE_SURA:
            return getSura(source, index);
        case TYPE_PAGE:
            return getPage(source, index);
        default:
            return [];
    }
};

//import prepare from './prepare';
var onMessageThread = function (e) {
    var worker = e.target,
        eData = e.data,
        message = eData.message,
        messageId = eData.messageId,
        data = message.data;

    switch (message.action) {
        /*case ACTION_LOAD:
            worker.postMessage({
                messageId: messageId,
                type: message.action,
                data: prepare(data)
            });
            break;*/
        case ACTION_GOTO_INDEX:
            worker.postMessage({
                messageId: messageId,
                type: message.action,
                data: getVerse(data.type, data.index, data.quran)
            });
            break;
        default:
            console.log(message);
    }
};

function FakeWebWorker() {}

FakeWebWorker.prototype.postMessage = function (message) {
    var me = this;
    var onmessage = typeof me.onmessage === 'function' ? me.onmessage : function () {};
    onMessageThread({
        target: {
            postMessage: function postMessage(message) {
                onmessage({
                    data: message
                });
            }
        },
        data: message
    });
};

var copy = function () {
    var args = Array.prototype.slice.call(arguments);
    return Object.assign.apply(null, [{}].concat(args));
};

var worker = window.Worker ? new Worker('assets/scripts/web-worker.js') : new FakeWebWorker();
var workerPromise = new WebWorker(worker);

var middleware = function (args) {
    var getState = args.getState;

    return function (next) {
        return function (action) {
            var currentState = getState();
            var actionData = action.data;
            switch (action.type) {
                case ACTION_GOTO_INDEX:

                    if (!hasOwnProperty(actionData, 'type') || !hasOwnProperty(actionData, 'index')) {
                        throw 'Missing parameters';
                    }

                    workerPromise.postMessage({
                        action: ACTION_GOTO_INDEX,
                        data: {
                            type: actionData.type,
                            index: actionData.index,
                            quran: currentState.quran
                        }
                    }).then(function (data) {
                        next({
                            type: ACTION_APPLY,
                            data: {
                                lastPropertyChanged: 'pageIndex',
                                pageIndex: actionData.index,
                                pageType: actionData.type,
                                pageChapters: data
                            }
                        });
                    });
                    break;

                case ACTION_LOAD:
                    next({
                        type: ACTION_APPLY,
                        data: copy(actionData, {
                            lastPropertyChanged: 'quran'
                        })
                    });

                    break;

                case ACTION_PAGING_OPTIONS:
                    next({
                        type: ACTION_APPLY,
                        data: copy(pagingReducer(currentState), {
                            lastPropertyChanged: 'pagingOptions'
                        })
                    });
                    break;

                case ACTION_CHANGE_TYPE:
                    next({
                        type: ACTION_APPLY,
                        data: {
                            lastPropertyChanged: 'pageType',
                            pageType: actionData.type
                        }
                    });
                    break;

                default:
                    next(action);
            }
        };
    };
};

var global$1 = typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};





 // empty string to avoid regexp issues


















// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global$1 == 'object' && global$1 && global$1.Object === Object && global$1;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol$1 = root.Symbol;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$1.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$2.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$2.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]';
var undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$1.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

var ponyfill = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}
});

var lib = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});



var _ponyfill2 = _interopRequireDefault(ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof commonjsGlobal !== 'undefined') {
  root = commonjsGlobal;
} else {
  root = module;
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
});

var symbolObservable = lib;

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[symbolObservable] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[symbolObservable] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

var _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(undefined, chain)(store.dispatch);

      return _extends$1({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

var store = createStore(reducer, applyMiddleware(middleware));

store.subscribe(function () {
    var state = store.getState();

    switch (state.lastPropertyChanged) {
        case 'quran':
            store.dispatch({
                type: ACTION_PAGING_OPTIONS
            });
            store.dispatch({
                type: ACTION_GOTO_INDEX,
                data: {
                    type: state.pageType,
                    index: state.pageIndex
                }
            });
            break;
        case 'pageType':
            store.dispatch({
                type: ACTION_PAGING_OPTIONS
            });
            store.dispatch({
                type: ACTION_GOTO_INDEX,
                data: {
                    type: state.pageType,
                    index: 1
                }
            });
    }
});

var registerServiceWorker = function (swjs, init) {
    var serviceWorker = navigator.serviceWorker;
    init = init || function () {};

    if (serviceWorker) {
        window.addEventListener('load', function () {
            "use strict";

            serviceWorker.getRegistration().then(function (registration) {
                //if (registration && registration.active) {
                //registration.unregister()
                //}
                serviceWorker.register(swjs).then(function () {
                    //console.log('then', sw)
                    //window.location.reload();
                    init();
                }).catch(function () {
                    init();
                });
            }).catch(function () {
                init();
            });
        });
    } else {
        init();
    }
};

// Quran Metadata (ver 1.0)
// Copyright (C) 2008-2009 Tanzil.info
// License: Creative Commons Attribution 3.0


var QuranData = {};

//------------------ Sura Data ---------------------

QuranData.Sura = [
// [start, ayas, order, rukus, name, tname, ename, type]
[], [0, 7, 5, 1, 'الفاتحة', "Al-Faatiha", 'The Opening', 'Meccan'], [7, 286, 87, 40, 'البقرة', "Al-Baqara", 'The Cow', 'Medinan'], [293, 200, 89, 20, 'آل عمران', "Aal-i-Imraan", 'The Family of Imraan', 'Medinan'], [493, 176, 92, 24, 'النساء', "An-Nisaa", 'The Women', 'Medinan'], [669, 120, 112, 16, 'المائدة', "Al-Maaida", 'The Table', 'Medinan'], [789, 165, 55, 20, 'الأنعام', "Al-An'aam", 'The Cattle', 'Meccan'], [954, 206, 39, 24, 'الأعراف', "Al-A'raaf", 'The Heights', 'Meccan'], [1160, 75, 88, 10, 'الأنفال', "Al-Anfaal", 'The Spoils of War', 'Medinan'], [1235, 129, 113, 16, 'التوبة', "At-Tawba", 'The Repentance', 'Medinan'], [1364, 109, 51, 11, 'يونس', "Yunus", 'Jonas', 'Meccan'], [1473, 123, 52, 10, 'هود', "Hud", 'Hud', 'Meccan'], [1596, 111, 53, 12, 'يوسف', "Yusuf", 'Joseph', 'Meccan'], [1707, 43, 96, 6, 'الرعد', "Ar-Ra'd", 'The Thunder', 'Medinan'], [1750, 52, 72, 7, 'ابراهيم', "Ibrahim", 'Abraham', 'Meccan'], [1802, 99, 54, 6, 'الحجر', "Al-Hijr", 'The Rock', 'Meccan'], [1901, 128, 70, 16, 'النحل', "An-Nahl", 'The Bee', 'Meccan'], [2029, 111, 50, 12, 'الإسراء', "Al-Israa", 'The Night Journey', 'Meccan'], [2140, 110, 69, 12, 'الكهف', "Al-Kahf", 'The Cave', 'Meccan'], [2250, 98, 44, 6, 'مريم', "Maryam", 'Mary', 'Meccan'], [2348, 135, 45, 8, 'طه', "Taa-Haa", 'Taa-Haa', 'Meccan'], [2483, 112, 73, 7, 'الأنبياء', "Al-Anbiyaa", 'The Prophets', 'Meccan'], [2595, 78, 103, 10, 'الحج', "Al-Hajj", 'The Pilgrimage', 'Medinan'], [2673, 118, 74, 6, 'المؤمنون', "Al-Muminoon", 'The Believers', 'Meccan'], [2791, 64, 102, 9, 'النور', "An-Noor", 'The Light', 'Medinan'], [2855, 77, 42, 6, 'الفرقان', "Al-Furqaan", 'The Criterion', 'Meccan'], [2932, 227, 47, 11, 'الشعراء', "Ash-Shu'araa", 'The Poets', 'Meccan'], [3159, 93, 48, 7, 'النمل', "An-Naml", 'The Ant', 'Meccan'], [3252, 88, 49, 8, 'القصص', "Al-Qasas", 'The Stories', 'Meccan'], [3340, 69, 85, 7, 'العنكبوت', "Al-Ankaboot", 'The Spider', 'Meccan'], [3409, 60, 84, 6, 'الروم', "Ar-Room", 'The Romans', 'Meccan'], [3469, 34, 57, 3, 'لقمان', "Luqman", 'Luqman', 'Meccan'], [3503, 30, 75, 3, 'السجدة', "As-Sajda", 'The Prostration', 'Meccan'], [3533, 73, 90, 9, 'الأحزاب', "Al-Ahzaab", 'The Clans', 'Medinan'], [3606, 54, 58, 6, 'سبإ', "Saba", 'Sheba', 'Meccan'], [3660, 45, 43, 5, 'فاطر', "Faatir", 'The Originator', 'Meccan'], [3705, 83, 41, 5, 'يس', "Yaseen", 'Yaseen', 'Meccan'], [3788, 182, 56, 5, 'الصافات', "As-Saaffaat", 'Those drawn up in Ranks', 'Meccan'], [3970, 88, 38, 5, 'ص', "Saad", 'The letter Saad', 'Meccan'], [4058, 75, 59, 8, 'الزمر', "Az-Zumar", 'The Groups', 'Meccan'], [4133, 85, 60, 9, 'غافر', "Al-Ghaafir", 'The Forgiver', 'Meccan'], [4218, 54, 61, 6, 'فصلت', "Fussilat", 'Explained in detail', 'Meccan'], [4272, 53, 62, 5, 'الشورى', "Ash-Shura", 'Consultation', 'Meccan'], [4325, 89, 63, 7, 'الزخرف', "Az-Zukhruf", 'Ornaments of gold', 'Meccan'], [4414, 59, 64, 3, 'الدخان', "Ad-Dukhaan", 'The Smoke', 'Meccan'], [4473, 37, 65, 4, 'الجاثية', "Al-Jaathiya", 'Crouching', 'Meccan'], [4510, 35, 66, 4, 'الأحقاف', "Al-Ahqaf", 'The Dunes', 'Meccan'], [4545, 38, 95, 4, 'محمد', "Muhammad", 'Muhammad', 'Medinan'], [4583, 29, 111, 4, 'الفتح', "Al-Fath", 'The Victory', 'Medinan'], [4612, 18, 106, 2, 'الحجرات', "Al-Hujuraat", 'The Inner Apartments', 'Medinan'], [4630, 45, 34, 3, 'ق', "Qaaf", 'The letter Qaaf', 'Meccan'], [4675, 60, 67, 3, 'الذاريات', "Adh-Dhaariyat", 'The Winnowing Winds', 'Meccan'], [4735, 49, 76, 2, 'الطور', "At-Tur", 'The Mount', 'Meccan'], [4784, 62, 23, 3, 'النجم', "An-Najm", 'The Star', 'Meccan'], [4846, 55, 37, 3, 'القمر', "Al-Qamar", 'The Moon', 'Meccan'], [4901, 78, 97, 3, 'الرحمن', "Ar-Rahmaan", 'The Beneficent', 'Medinan'], [4979, 96, 46, 3, 'الواقعة', "Al-Waaqia", 'The Inevitable', 'Meccan'], [5075, 29, 94, 4, 'الحديد', "Al-Hadid", 'The Iron', 'Medinan'], [5104, 22, 105, 3, 'المجادلة', "Al-Mujaadila", 'The Pleading Woman', 'Medinan'], [5126, 24, 101, 3, 'الحشر', "Al-Hashr", 'The Exile', 'Medinan'], [5150, 13, 91, 2, 'الممتحنة', "Al-Mumtahana", 'She that is to be examined', 'Medinan'], [5163, 14, 109, 2, 'الصف', "As-Saff", 'The Ranks', 'Medinan'], [5177, 11, 110, 2, 'الجمعة', "Al-Jumu'a", 'Friday', 'Medinan'], [5188, 11, 104, 2, 'المنافقون', "Al-Munaafiqoon", 'The Hypocrites', 'Medinan'], [5199, 18, 108, 2, 'التغابن', "At-Taghaabun", 'Mutual Disillusion', 'Medinan'], [5217, 12, 99, 2, 'الطلاق', "At-Talaaq", 'Divorce', 'Medinan'], [5229, 12, 107, 2, 'التحريم', "At-Tahrim", 'The Prohibition', 'Medinan'], [5241, 30, 77, 2, 'الملك', "Al-Mulk", 'The Sovereignty', 'Meccan'], [5271, 52, 2, 2, 'القلم', "Al-Qalam", 'The Pen', 'Meccan'], [5323, 52, 78, 2, 'الحاقة', "Al-Haaqqa", 'The Reality', 'Meccan'], [5375, 44, 79, 2, 'المعارج', "Al-Ma'aarij", 'The Ascending Stairways', 'Meccan'], [5419, 28, 71, 2, 'نوح', "Nooh", 'Noah', 'Meccan'], [5447, 28, 40, 2, 'الجن', "Al-Jinn", 'The Jinn', 'Meccan'], [5475, 20, 3, 2, 'المزمل', "Al-Muzzammil", 'The Enshrouded One', 'Meccan'], [5495, 56, 4, 2, 'المدثر', "Al-Muddaththir", 'The Cloaked One', 'Meccan'], [5551, 40, 31, 2, 'القيامة', "Al-Qiyaama", 'The Resurrection', 'Meccan'], [5591, 31, 98, 2, 'الانسان', "Al-Insaan", 'Man', 'Medinan'], [5622, 50, 33, 2, 'المرسلات', "Al-Mursalaat", 'The Emissaries', 'Meccan'], [5672, 40, 80, 2, 'النبإ', "An-Naba", 'The Announcement', 'Meccan'], [5712, 46, 81, 2, 'النازعات', "An-Naazi'aat", 'Those who drag forth', 'Meccan'], [5758, 42, 24, 1, 'عبس', "Abasa", 'He frowned', 'Meccan'], [5800, 29, 7, 1, 'التكوير', "At-Takwir", 'The Overthrowing', 'Meccan'], [5829, 19, 82, 1, 'الإنفطار', "Al-Infitaar", 'The Cleaving', 'Meccan'], [5848, 36, 86, 1, 'المطففين', "Al-Mutaffifin", 'Defrauding', 'Meccan'], [5884, 25, 83, 1, 'الإنشقاق', "Al-Inshiqaaq", 'The Splitting Open', 'Meccan'], [5909, 22, 27, 1, 'البروج', "Al-Burooj", 'The Constellations', 'Meccan'], [5931, 17, 36, 1, 'الطارق', "At-Taariq", 'The Morning Star', 'Meccan'], [5948, 19, 8, 1, 'الأعلى', "Al-A'laa", 'The Most High', 'Meccan'], [5967, 26, 68, 1, 'الغاشية', "Al-Ghaashiya", 'The Overwhelming', 'Meccan'], [5993, 30, 10, 1, 'الفجر', "Al-Fajr", 'The Dawn', 'Meccan'], [6023, 20, 35, 1, 'البلد', "Al-Balad", 'The City', 'Meccan'], [6043, 15, 26, 1, 'الشمس', "Ash-Shams", 'The Sun', 'Meccan'], [6058, 21, 9, 1, 'الليل', "Al-Lail", 'The Night', 'Meccan'], [6079, 11, 11, 1, 'الضحى', "Ad-Dhuhaa", 'The Morning Hours', 'Meccan'], [6090, 8, 12, 1, 'الشرح', "Ash-Sharh", 'The Consolation', 'Meccan'], [6098, 8, 28, 1, 'التين', "At-Tin", 'The Fig', 'Meccan'], [6106, 19, 1, 1, 'العلق', "Al-Alaq", 'The Clot', 'Meccan'], [6125, 5, 25, 1, 'القدر', "Al-Qadr", 'The Power, Fate', 'Meccan'], [6130, 8, 100, 1, 'البينة', "Al-Bayyina", 'The Evidence', 'Medinan'], [6138, 8, 93, 1, 'الزلزلة', "Az-Zalzala", 'The Earthquake', 'Medinan'], [6146, 11, 14, 1, 'العاديات', "Al-Aadiyaat", 'The Chargers', 'Meccan'], [6157, 11, 30, 1, 'القارعة', "Al-Qaari'a", 'The Calamity', 'Meccan'], [6168, 8, 16, 1, 'التكاثر', "At-Takaathur", 'Competition', 'Meccan'], [6176, 3, 13, 1, 'العصر', "Al-Asr", 'The Declining Day, Epoch', 'Meccan'], [6179, 9, 32, 1, 'الهمزة', "Al-Humaza", 'The Traducer', 'Meccan'], [6188, 5, 19, 1, 'الفيل', "Al-Fil", 'The Elephant', 'Meccan'], [6193, 4, 29, 1, 'قريش', "Quraish", 'Quraysh', 'Meccan'], [6197, 7, 17, 1, 'الماعون', "Al-Maa'un", 'Almsgiving', 'Meccan'], [6204, 3, 15, 1, 'الكوثر', "Al-Kawthar", 'Abundance', 'Meccan'], [6207, 6, 18, 1, 'الكافرون', "Al-Kaafiroon", 'The Disbelievers', 'Meccan'], [6213, 3, 114, 1, 'النصر', "An-Nasr", 'Divine Support', 'Medinan'], [6216, 5, 6, 1, 'المسد', "Al-Masad", 'The Palm Fibre', 'Meccan'], [6221, 4, 22, 1, 'الإخلاص', "Al-Ikhlaas", 'Sincerity', 'Meccan'], [6225, 5, 20, 1, 'الفلق', "Al-Falaq", 'The Dawn', 'Meccan'], [6230, 6, 21, 1, 'الناس', "An-Naas", 'Mankind', 'Meccan'], [6236, 1]];

//------------------ Juz Data ---------------------

QuranData.Juz = [
// [sura, aya]
[], [1, 1], [2, 142], [2, 253], [3, 93], [4, 24], [4, 148], [5, 82], [6, 111], [7, 88], [8, 41], [9, 93], [11, 6], [12, 53], [15, 1], [17, 1], [18, 75], [21, 1], [23, 1], [25, 21], [27, 56], [29, 46], [33, 31], [36, 28], [39, 32], [41, 47], [46, 1], [51, 31], [58, 1], [67, 1], [78, 1], [115, 1]];

//------------------ Hizb Data ---------------------

QuranData.HizbQaurter = [
// [sura, aya]
[], [1, 1], [2, 26], [2, 44], [2, 60], [2, 75], [2, 92], [2, 106], [2, 124], [2, 142], [2, 158], [2, 177], [2, 189], [2, 203], [2, 219], [2, 233], [2, 243], [2, 253], [2, 263], [2, 272], [2, 283], [3, 15], [3, 33], [3, 52], [3, 75], [3, 93], [3, 113], [3, 133], [3, 153], [3, 171], [3, 186], [4, 1], [4, 12], [4, 24], [4, 36], [4, 58], [4, 74], [4, 88], [4, 100], [4, 114], [4, 135], [4, 148], [4, 163], [5, 1], [5, 12], [5, 27], [5, 41], [5, 51], [5, 67], [5, 82], [5, 97], [5, 109], [6, 13], [6, 36], [6, 59], [6, 74], [6, 95], [6, 111], [6, 127], [6, 141], [6, 151], [7, 1], [7, 31], [7, 47], [7, 65], [7, 88], [7, 117], [7, 142], [7, 156], [7, 171], [7, 189], [8, 1], [8, 22], [8, 41], [8, 61], [9, 1], [9, 19], [9, 34], [9, 46], [9, 60], [9, 75], [9, 93], [9, 111], [9, 122], [10, 11], [10, 26], [10, 53], [10, 71], [10, 90], [11, 6], [11, 24], [11, 41], [11, 61], [11, 84], [11, 108], [12, 7], [12, 30], [12, 53], [12, 77], [12, 101], [13, 5], [13, 19], [13, 35], [14, 10], [14, 28], [15, 1], [15, 50], [16, 1], [16, 30], [16, 51], [16, 75], [16, 90], [16, 111], [17, 1], [17, 23], [17, 50], [17, 70], [17, 99], [18, 17], [18, 32], [18, 51], [18, 75], [18, 99], [19, 22], [19, 59], [20, 1], [20, 55], [20, 83], [20, 111], [21, 1], [21, 29], [21, 51], [21, 83], [22, 1], [22, 19], [22, 38], [22, 60], [23, 1], [23, 36], [23, 75], [24, 1], [24, 21], [24, 35], [24, 53], [25, 1], [25, 21], [25, 53], [26, 1], [26, 52], [26, 111], [26, 181], [27, 1], [27, 27], [27, 56], [27, 82], [28, 12], [28, 29], [28, 51], [28, 76], [29, 1], [29, 26], [29, 46], [30, 1], [30, 31], [30, 54], [31, 22], [32, 11], [33, 1], [33, 18], [33, 31], [33, 51], [33, 60], [34, 10], [34, 24], [34, 46], [35, 15], [35, 41], [36, 28], [36, 60], [37, 22], [37, 83], [37, 145], [38, 21], [38, 52], [39, 8], [39, 32], [39, 53], [40, 1], [40, 21], [40, 41], [40, 66], [41, 9], [41, 25], [41, 47], [42, 13], [42, 27], [42, 51], [43, 24], [43, 57], [44, 17], [45, 12], [46, 1], [46, 21], [47, 10], [47, 33], [48, 18], [49, 1], [49, 14], [50, 27], [51, 31], [52, 24], [53, 26], [54, 9], [55, 1], [56, 1], [56, 75], [57, 16], [58, 1], [58, 14], [59, 11], [60, 7], [62, 1], [63, 4], [65, 1], [66, 1], [67, 1], [68, 1], [69, 1], [70, 19], [72, 1], [73, 20], [75, 1], [76, 19], [78, 1], [80, 1], [82, 1], [84, 1], [87, 1], [90, 1], [94, 1], [100, 9], [115, 1]];

//------------------ Manzil Data ---------------------

QuranData.Manzil = [
// [sura, aya]
[], [1, 1], [5, 1], [10, 1], [17, 1], [26, 1], [37, 1], [50, 1]];

//------------------ Ruku Data ---------------------

QuranData.Ruku = [
// [sura, aya]
[], [1, 1], [2, 1], [2, 8], [2, 21], [2, 30], [2, 40], [2, 47], [2, 60], [2, 62], [2, 72], [2, 83], [2, 87], [2, 97], [2, 104], [2, 113], [2, 122], [2, 130], [2, 142], [2, 148], [2, 153], [2, 164], [2, 168], [2, 177], [2, 183], [2, 189], [2, 197], [2, 211], [2, 217], [2, 222], [2, 229], [2, 232], [2, 236], [2, 243], [2, 249], [2, 254], [2, 258], [2, 261], [2, 267], [2, 274], [2, 282], [2, 284], [3, 1], [3, 10], [3, 21], [3, 31], [3, 42], [3, 55], [3, 64], [3, 72], [3, 81], [3, 92], [3, 102], [3, 110], [3, 121], [3, 130], [3, 144], [3, 149], [3, 156], [3, 172], [3, 181], [3, 190], [4, 1], [4, 11], [4, 15], [4, 23], [4, 26], [4, 34], [4, 43], [4, 51], [4, 60], [4, 71], [4, 77], [4, 88], [4, 92], [4, 97], [4, 101], [4, 105], [4, 113], [4, 116], [4, 127], [4, 135], [4, 142], [4, 153], [4, 163], [4, 172], [5, 1], [5, 6], [5, 12], [5, 20], [5, 27], [5, 35], [5, 44], [5, 51], [5, 57], [5, 67], [5, 78], [5, 87], [5, 94], [5, 101], [5, 109], [5, 116], [6, 1], [6, 11], [6, 21], [6, 31], [6, 42], [6, 51], [6, 56], [6, 61], [6, 71], [6, 83], [6, 91], [6, 95], [6, 101], [6, 111], [6, 122], [6, 130], [6, 141], [6, 145], [6, 151], [6, 155], [7, 1], [7, 11], [7, 26], [7, 32], [7, 40], [7, 48], [7, 54], [7, 59], [7, 65], [7, 73], [7, 85], [7, 94], [7, 100], [7, 109], [7, 127], [7, 130], [7, 142], [7, 148], [7, 152], [7, 158], [7, 163], [7, 172], [7, 182], [7, 189], [8, 1], [8, 11], [8, 20], [8, 29], [8, 38], [8, 45], [8, 49], [8, 59], [8, 65], [8, 70], [9, 1], [9, 7], [9, 17], [9, 25], [9, 30], [9, 38], [9, 43], [9, 60], [9, 67], [9, 73], [9, 81], [9, 90], [9, 100], [9, 111], [9, 119], [9, 123], [10, 1], [10, 11], [10, 21], [10, 31], [10, 41], [10, 54], [10, 61], [10, 71], [10, 83], [10, 93], [10, 104], [11, 1], [11, 9], [11, 25], [11, 36], [11, 50], [11, 61], [11, 69], [11, 84], [11, 96], [11, 110], [12, 1], [12, 7], [12, 21], [12, 30], [12, 36], [12, 43], [12, 50], [12, 58], [12, 69], [12, 80], [12, 94], [12, 105], [13, 1], [13, 8], [13, 19], [13, 27], [13, 32], [13, 38], [14, 1], [14, 7], [14, 13], [14, 22], [14, 28], [14, 35], [14, 42], [15, 1], [15, 16], [15, 26], [15, 45], [15, 61], [15, 80], [16, 1], [16, 10], [16, 22], [16, 26], [16, 35], [16, 41], [16, 51], [16, 61], [16, 66], [16, 71], [16, 77], [16, 84], [16, 90], [16, 101], [16, 111], [16, 120], [17, 1], [17, 11], [17, 23], [17, 31], [17, 41], [17, 53], [17, 61], [17, 71], [17, 78], [17, 85], [17, 94], [17, 101], [18, 1], [18, 13], [18, 18], [18, 23], [18, 32], [18, 45], [18, 50], [18, 54], [18, 60], [18, 71], [18, 83], [18, 102], [19, 1], [19, 16], [19, 41], [19, 51], [19, 66], [19, 83], [20, 1], [20, 25], [20, 55], [20, 77], [20, 90], [20, 105], [20, 116], [20, 129], [21, 1], [21, 11], [21, 30], [21, 42], [21, 51], [21, 76], [21, 94], [22, 1], [22, 11], [22, 23], [22, 26], [22, 34], [22, 39], [22, 49], [22, 58], [22, 65], [22, 73], [23, 1], [23, 23], [23, 33], [23, 51], [23, 78], [23, 93], [24, 1], [24, 11], [24, 21], [24, 27], [24, 35], [24, 41], [24, 51], [24, 58], [24, 62], [25, 1], [25, 10], [25, 21], [25, 35], [25, 45], [25, 61], [26, 1], [26, 10], [26, 34], [26, 53], [26, 70], [26, 105], [26, 123], [26, 141], [26, 160], [26, 176], [26, 192], [27, 1], [27, 15], [27, 32], [27, 45], [27, 59], [27, 67], [27, 83], [28, 1], [28, 14], [28, 22], [28, 29], [28, 43], [28, 51], [28, 61], [28, 76], [29, 1], [29, 14], [29, 23], [29, 31], [29, 45], [29, 52], [29, 64], [30, 1], [30, 11], [30, 20], [30, 28], [30, 41], [30, 54], [31, 1], [31, 12], [31, 20], [32, 1], [32, 12], [32, 23], [33, 1], [33, 9], [33, 21], [33, 28], [33, 35], [33, 41], [33, 53], [33, 59], [33, 69], [34, 1], [34, 10], [34, 22], [34, 31], [34, 37], [34, 46], [35, 1], [35, 8], [35, 15], [35, 27], [35, 38], [36, 1], [36, 13], [36, 33], [36, 51], [36, 68], [37, 1], [37, 22], [37, 75], [37, 114], [37, 139], [38, 1], [38, 15], [38, 27], [38, 41], [38, 65], [39, 1], [39, 10], [39, 22], [39, 32], [39, 42], [39, 53], [39, 64], [39, 71], [40, 1], [40, 10], [40, 21], [40, 28], [40, 38], [40, 51], [40, 61], [40, 69], [40, 79], [41, 1], [41, 9], [41, 19], [41, 26], [41, 33], [41, 45], [42, 1], [42, 10], [42, 20], [42, 30], [42, 44], [43, 1], [43, 16], [43, 26], [43, 36], [43, 46], [43, 57], [43, 68], [44, 1], [44, 30], [44, 43], [45, 1], [45, 12], [45, 22], [45, 27], [46, 1], [46, 11], [46, 21], [46, 27], [47, 1], [47, 12], [47, 20], [47, 29], [48, 1], [48, 11], [48, 18], [48, 27], [49, 1], [49, 11], [50, 1], [50, 16], [50, 30], [51, 1], [51, 24], [51, 47], [52, 1], [52, 29], [53, 1], [53, 26], [53, 33], [54, 1], [54, 23], [54, 41], [55, 1], [55, 26], [55, 46], [56, 1], [56, 39], [56, 75], [57, 1], [57, 11], [57, 20], [57, 26], [58, 1], [58, 7], [58, 14], [59, 1], [59, 11], [59, 18], [60, 1], [60, 7], [61, 1], [61, 10], [62, 1], [62, 9], [63, 1], [63, 9], [64, 1], [64, 11], [65, 1], [65, 8], [66, 1], [66, 8], [67, 1], [67, 15], [68, 1], [68, 34], [69, 1], [69, 38], [70, 1], [70, 36], [71, 1], [71, 21], [72, 1], [72, 20], [73, 1], [73, 20], [74, 1], [74, 32], [75, 1], [75, 31], [76, 1], [76, 23], [77, 1], [77, 41], [78, 1], [78, 31], [79, 1], [79, 27], [80, 1], [81, 1], [82, 1], [83, 1], [84, 1], [85, 1], [86, 1], [87, 1], [88, 1], [89, 1], [90, 1], [91, 1], [92, 1], [93, 1], [94, 1], [95, 1], [96, 1], [97, 1], [98, 1], [99, 1], [100, 1], [101, 1], [102, 1], [103, 1], [104, 1], [105, 1], [106, 1], [107, 1], [108, 1], [109, 1], [110, 1], [111, 1], [112, 1], [113, 1], [114, 1]];

//------------------ Page Data ---------------------

QuranData.Page = [
// [sura, aya]
[], [1, 1], [2, 1], [2, 6], [2, 17], [2, 25], [2, 30], [2, 38], [2, 49], [2, 58], [2, 62], [2, 70], [2, 77], [2, 84], [2, 89], [2, 94], [2, 102], [2, 106], [2, 113], [2, 120], [2, 127], [2, 135], [2, 142], [2, 146], [2, 154], [2, 164], [2, 170], [2, 177], [2, 182], [2, 187], [2, 191], [2, 197], [2, 203], [2, 211], [2, 216], [2, 220], [2, 225], [2, 231], [2, 234], [2, 238], [2, 246], [2, 249], [2, 253], [2, 257], [2, 260], [2, 265], [2, 270], [2, 275], [2, 282], [2, 283], [3, 1], [3, 10], [3, 16], [3, 23], [3, 30], [3, 38], [3, 46], [3, 53], [3, 62], [3, 71], [3, 78], [3, 84], [3, 92], [3, 101], [3, 109], [3, 116], [3, 122], [3, 133], [3, 141], [3, 149], [3, 154], [3, 158], [3, 166], [3, 174], [3, 181], [3, 187], [3, 195], [4, 1], [4, 7], [4, 12], [4, 15], [4, 20], [4, 24], [4, 27], [4, 34], [4, 38], [4, 45], [4, 52], [4, 60], [4, 66], [4, 75], [4, 80], [4, 87], [4, 92], [4, 95], [4, 102], [4, 106], [4, 114], [4, 122], [4, 128], [4, 135], [4, 141], [4, 148], [4, 155], [4, 163], [4, 171], [4, 176], [5, 3], [5, 6], [5, 10], [5, 14], [5, 18], [5, 24], [5, 32], [5, 37], [5, 42], [5, 46], [5, 51], [5, 58], [5, 65], [5, 71], [5, 77], [5, 83], [5, 90], [5, 96], [5, 104], [5, 109], [5, 114], [6, 1], [6, 9], [6, 19], [6, 28], [6, 36], [6, 45], [6, 53], [6, 60], [6, 69], [6, 74], [6, 82], [6, 91], [6, 95], [6, 102], [6, 111], [6, 119], [6, 125], [6, 132], [6, 138], [6, 143], [6, 147], [6, 152], [6, 158], [7, 1], [7, 12], [7, 23], [7, 31], [7, 38], [7, 44], [7, 52], [7, 58], [7, 68], [7, 74], [7, 82], [7, 88], [7, 96], [7, 105], [7, 121], [7, 131], [7, 138], [7, 144], [7, 150], [7, 156], [7, 160], [7, 164], [7, 171], [7, 179], [7, 188], [7, 196], [8, 1], [8, 9], [8, 17], [8, 26], [8, 34], [8, 41], [8, 46], [8, 53], [8, 62], [8, 70], [9, 1], [9, 7], [9, 14], [9, 21], [9, 27], [9, 32], [9, 37], [9, 41], [9, 48], [9, 55], [9, 62], [9, 69], [9, 73], [9, 80], [9, 87], [9, 94], [9, 100], [9, 107], [9, 112], [9, 118], [9, 123], [10, 1], [10, 7], [10, 15], [10, 21], [10, 26], [10, 34], [10, 43], [10, 54], [10, 62], [10, 71], [10, 79], [10, 89], [10, 98], [10, 107], [11, 6], [11, 13], [11, 20], [11, 29], [11, 38], [11, 46], [11, 54], [11, 63], [11, 72], [11, 82], [11, 89], [11, 98], [11, 109], [11, 118], [12, 5], [12, 15], [12, 23], [12, 31], [12, 38], [12, 44], [12, 53], [12, 64], [12, 70], [12, 79], [12, 87], [12, 96], [12, 104], [13, 1], [13, 6], [13, 14], [13, 19], [13, 29], [13, 35], [13, 43], [14, 6], [14, 11], [14, 19], [14, 25], [14, 34], [14, 43], [15, 1], [15, 16], [15, 32], [15, 52], [15, 71], [15, 91], [16, 7], [16, 15], [16, 27], [16, 35], [16, 43], [16, 55], [16, 65], [16, 73], [16, 80], [16, 88], [16, 94], [16, 103], [16, 111], [16, 119], [17, 1], [17, 8], [17, 18], [17, 28], [17, 39], [17, 50], [17, 59], [17, 67], [17, 76], [17, 87], [17, 97], [17, 105], [18, 5], [18, 16], [18, 21], [18, 28], [18, 35], [18, 46], [18, 54], [18, 62], [18, 75], [18, 84], [18, 98], [19, 1], [19, 12], [19, 26], [19, 39], [19, 52], [19, 65], [19, 77], [19, 96], [20, 13], [20, 38], [20, 52], [20, 65], [20, 77], [20, 88], [20, 99], [20, 114], [20, 126], [21, 1], [21, 11], [21, 25], [21, 36], [21, 45], [21, 58], [21, 73], [21, 82], [21, 91], [21, 102], [22, 1], [22, 6], [22, 16], [22, 24], [22, 31], [22, 39], [22, 47], [22, 56], [22, 65], [22, 73], [23, 1], [23, 18], [23, 28], [23, 43], [23, 60], [23, 75], [23, 90], [23, 105], [24, 1], [24, 11], [24, 21], [24, 28], [24, 32], [24, 37], [24, 44], [24, 54], [24, 59], [24, 62], [25, 3], [25, 12], [25, 21], [25, 33], [25, 44], [25, 56], [25, 68], [26, 1], [26, 20], [26, 40], [26, 61], [26, 84], [26, 112], [26, 137], [26, 160], [26, 184], [26, 207], [27, 1], [27, 14], [27, 23], [27, 36], [27, 45], [27, 56], [27, 64], [27, 77], [27, 89], [28, 6], [28, 14], [28, 22], [28, 29], [28, 36], [28, 44], [28, 51], [28, 60], [28, 71], [28, 78], [28, 85], [29, 7], [29, 15], [29, 24], [29, 31], [29, 39], [29, 46], [29, 53], [29, 64], [30, 6], [30, 16], [30, 25], [30, 33], [30, 42], [30, 51], [31, 1], [31, 12], [31, 20], [31, 29], [32, 1], [32, 12], [32, 21], [33, 1], [33, 7], [33, 16], [33, 23], [33, 31], [33, 36], [33, 44], [33, 51], [33, 55], [33, 63], [34, 1], [34, 8], [34, 15], [34, 23], [34, 32], [34, 40], [34, 49], [35, 4], [35, 12], [35, 19], [35, 31], [35, 39], [35, 45], [36, 13], [36, 28], [36, 41], [36, 55], [36, 71], [37, 1], [37, 25], [37, 52], [37, 77], [37, 103], [37, 127], [37, 154], [38, 1], [38, 17], [38, 27], [38, 43], [38, 62], [38, 84], [39, 6], [39, 11], [39, 22], [39, 32], [39, 41], [39, 48], [39, 57], [39, 68], [39, 75], [40, 8], [40, 17], [40, 26], [40, 34], [40, 41], [40, 50], [40, 59], [40, 67], [40, 78], [41, 1], [41, 12], [41, 21], [41, 30], [41, 39], [41, 47], [42, 1], [42, 11], [42, 16], [42, 23], [42, 32], [42, 45], [42, 52], [43, 11], [43, 23], [43, 34], [43, 48], [43, 61], [43, 74], [44, 1], [44, 19], [44, 40], [45, 1], [45, 14], [45, 23], [45, 33], [46, 6], [46, 15], [46, 21], [46, 29], [47, 1], [47, 12], [47, 20], [47, 30], [48, 1], [48, 10], [48, 16], [48, 24], [48, 29], [49, 5], [49, 12], [50, 1], [50, 16], [50, 36], [51, 7], [51, 31], [51, 52], [52, 15], [52, 32], [53, 1], [53, 27], [53, 45], [54, 7], [54, 28], [54, 50], [55, 17], [55, 41], [55, 68], [56, 17], [56, 51], [56, 77], [57, 4], [57, 12], [57, 19], [57, 25], [58, 1], [58, 7], [58, 12], [58, 22], [59, 4], [59, 10], [59, 17], [60, 1], [60, 6], [60, 12], [61, 6], [62, 1], [62, 9], [63, 5], [64, 1], [64, 10], [65, 1], [65, 6], [66, 1], [66, 8], [67, 1], [67, 13], [67, 27], [68, 16], [68, 43], [69, 9], [69, 35], [70, 11], [70, 40], [71, 11], [72, 1], [72, 14], [73, 1], [73, 20], [74, 18], [74, 48], [75, 20], [76, 6], [76, 26], [77, 20], [78, 1], [78, 31], [79, 16], [80, 1], [81, 1], [82, 1], [83, 7], [83, 35], [85, 1], [86, 1], [87, 16], [89, 1], [89, 24], [91, 1], [92, 15], [95, 1], [97, 1], [98, 8], [100, 10], [103, 1], [106, 1], [109, 1], [112, 1], [115, 1]];

//------------------ Sajda Data ---------------------

QuranData.Sajda = [
// [sura, aya, type]
[], [7, 206, 'recommended'], [13, 15, 'recommended'], [16, 50, 'recommended'], [17, 109, 'recommended'], [19, 58, 'recommended'], [22, 18, 'recommended'], [22, 77, 'recommended'], [25, 60, 'recommended'], [27, 26, 'recommended'], [32, 15, 'obligatory'], [38, 24, 'recommended'], [41, 38, 'obligatory'], [53, 62, 'obligatory'], [84, 21, 'recommended'], [96, 19, 'obligatory']];

//bismillah char codes
var bismillahCharCodes = '1576,1616,1587,1618,1605,1616,32,1575,1604,1604,1617,1614,1607,1616,32,1575,1604,1585,1617,1614,1581,1618,1605,1614,1606,1616,32,1575,1604,1585,1617,1614,1581,1616,1610,1605,1616,32,';
var bismillahRegExp = new RegExp('^(' + bismillahCharCodes + ')(.*)', 'ig');

function charCodesAt(str) {
    return str.split('').map(function (char) {
        return char.charCodeAt();
    }).join(',');
}

function charCodesFrom(str) {
    return str.split(',').map(function (code) {
        return String.fromCharCode(code);
    }).join('');
}

function previousAyatIndex(ayat, Sura) {
    var suraNumber = ayat[0],
        ayatIndex = ayat[1] - 1,
        // aya start with 0
    prevAyat = Sura[suraNumber].ayas[ayatIndex - 1];

    if (prevAyat) {
        return [suraNumber, ayatIndex - 1];
    } else {
        return [suraNumber - 1, Sura[suraNumber - 1].ayas.length - 1];
    }
}

function previousAyat(ayat, Sura) {
    var prev = previousAyatIndex(ayat, Sura);
    return Sura[prev[0]].ayas[prev[1]];
}

function mapSura(sura, index) {
    var suraHasBismillah = false;

    // [start, ayas, order, rukus, name, tname, ename, type]
    var start = sura[0],
        count = sura[1],
        ayas = this.slice(start, start + count).map(function (_aya, i) {
        var aya = void 0,
            exec = void 0,
            hasBismillah = void 0;
        exec = bismillahRegExp.exec(charCodesAt(_aya));

        if (i === 0 && exec) {
            aya = charCodesFrom(exec[2]);
            suraHasBismillah = hasBismillah = true;
        } else {
            aya = _aya;
        }

        aya = {
            text: aya,
            sura: index,
            index: i + 1
        };

        if (hasBismillah) {
            aya.bismillah = true;
        }

        return aya;
    });

    return {
        ayas: ayas,
        bismillah: suraHasBismillah,
        order: sura[2],
        rukus: sura[3],
        name: sura[4],
        tname: sura[5],
        ename: sura[6],
        type: sura[7],
        index: index
    };
}

function processQuranText(quranText) {
    var Sura = QuranData.Sura.map(mapSura, quranText.split('\r\n'));

    QuranData.Sajda.forEach(function (sajda) {
        var suraNumber = sajda[0],
            ayatIndex = sajda[1] - 1;

        suraNumber && (Sura[suraNumber].ayas[ayatIndex].sajda = sajda[2]);
    });

    QuranData.Ruku.forEach(function (ruku, index) {
        var ayat = ruku.length > 0 && previousAyat(ruku, Sura);
        if (ayat) {
            ayat.ruku = index - 1;
        }
    });

    QuranData.Manzil.forEach(function (manzil) {
        var suraNumber = manzil[0],
            ayatIndex = manzil[1] - 1;

        if (suraNumber) {
            Sura[suraNumber].ayas[ayatIndex].manzil = true;
        }
    });

    return Object.assign({}, QuranData, {
        Sura: Sura
    });
}

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };
})();

var requestAnimFrame = window.requestAnimationFrame;

requestAnimFrame(function () {});

if (!window.Promise) {
    window.Promise = promise;
}

var doc = document;

var app = render(h(App, {
    store: store
}), doc.body, doc.getElementById('app'));

registerServiceWorker('service-worker.js', function init() {
    ajax('assets/data/quran-simple.txt').then(function (xhr) {
        store.dispatch({
            type: ACTION_LOAD,
            data: {
                quran: processQuranText(xhr.responseText)
            }
        });

        app.removeAttribute('hidden');
        doc.querySelector('.loader').setAttribute('hidden', true);
    }, function (e) {
        console.log(e);
    });
});

/* *********************************************
 * Router Config Start
 * ******************************************* */

var router = new Router({
    '(sura|page)\/(\\d+)': function suraPageD(type, _index) {
        var index = parseInt(_index, 10);
        var state = store.getState();
        if (index && index > 0) {
            if (!(state.pageIndex === index && state.pageType === type)) {
                store.dispatch({
                    type: ACTION_GOTO_INDEX,
                    data: {
                        type: type,
                        index: index
                    }
                });
            }
        } else {
            router.redirectTo(type + '/1');
        }
    },
    'sura\/(\\d+)\/aya\/(\\d+)': function suraDAyaD(sura, aya) {
        console.log('callback', sura, aya, this);
    }
}).execute();

observeStore(store, function (store$$1, oldState) {
    var storeState = store$$1.getState();
    var newState = {
        pageIndex: storeState.pageIndex,
        pageType: storeState.pageType
    };
    return objectEquals(oldState, newState) ? oldState : newState;
}, function (state) {
    router.redirectTo(state.pageType + '/' + state.pageIndex);
});

/* *********************************************
 * Router End
 * ******************************************* */

// attach Google fonts css
googleFonts('Amiri');

}());
//# sourceMappingURL=app.js.map
