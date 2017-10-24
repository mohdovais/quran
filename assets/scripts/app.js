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


//# sourceMappingURL=preact.esm.js.map

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


















// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js

var freeGlobal = typeof global$1 == 'object' && global$1 && global$1.Object === Object && global$1;

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

var Symbol$1 = root.Symbol;

var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

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
  var isOwn = hasOwnProperty$1.call(value, symToStringTag$1),
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

var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype;
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

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
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
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

function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

function xml2json(xml) {

    var i, j, l, item, nodeName, attribute, old;

    // Create the return object
    var obj = Object.create(null);

    if (xml.nodeType == 1) {
        // element
        // do attributes
        if (xml.attributes.length > 0) {
            for (j = 0, l = xml.attributes.length; j < l; j++) {
                attribute = xml.attributes.item(j);
                obj[attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) {
        // text
        obj = Number(xml.nodeValue) || xml.nodeValue;
    }

    // loop children
    if (xml.hasChildNodes()) {
        l = xml.childNodes.length;
        // If just one text node inside
        if (l === 1 && xml.childNodes[0].nodeType === 3) {
            obj = xml.childNodes[0].nodeValue;
        } else {
            for (i = 0; i < l; i++) {
                item = xml.childNodes.item(i);
                // ignore white space
                if (item.nodeType === 3) {
                    continue;
                }
                nodeName = item.nodeName;
                if (typeof obj[nodeName] == "undefined") {
                    obj[nodeName] = xml2json(item);
                } else {
                    if (typeof obj[nodeName].push == "undefined") {
                        old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xml2json(item));
                }
            }
        }
    }

    i = j = l = item = nodeName = attribute = old = null;
    return obj;
}

function fetchXML(url) {
    return fetch(url).then(function (response) {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.text();
    }).then(function (text) {
        return new window.DOMParser().parseFromString(text, "text/xml");
    }).then(function (xml) {
        return xml2json(xml);
    });
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

// To do so, we use this function.






////"٠١٢٣٤٥٦٧٨٩"
function toArabicNumber(num) {
    return String(num).split('').reduce(function (acc, n) {
        return acc += '\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669'.substr(parseInt(n), 1);
    }, '');
}

function flattenSura(suras) {
    return suras.reduce(function (acc, sura) {
        return acc.concat(sura.aya.map(function (obj) {
            return Object.assign({
                sura: parseInt(sura.index, 10)
            }, obj, {
                index: parseInt(obj.index)
            });
        }));
    }, []);
}

function mergeMeta(ayas, meta) {
    var p = 1;
    var r = 1;
    return ayas.map(function (aya, index, array) {
        var nextAya = array[index + 1];
        var page = meta.pages.page[p];
        var ruku = meta.rukus.ruku[r];
        var isRuku = false;
        var sajda = meta.sajdas.sajda.find(function (s) {
            return s.sura == aya.sura && s.aya == aya.index;
        });

        if (page && aya.sura == page.sura && aya.index == page.aya) {
            p++;
        }

        if (ruku && nextAya.sura == ruku.sura && nextAya.index == ruku.aya) {
            isRuku = ruku.index;
            r++;
        }

        return Object.assign(Object.create(null), {
            page: p,
            sajda: sajda && sajda.type || false,
            ruku: isRuku
        }, aya);
    });
}

var TYPE_PAGE = 'page';
var TYPE_SURA = 'sura';
var ACTION_LOAD = 'LOAD';
var ACTION_GOTO_INDEX = 'GOTO_INDEX';

var SURA_AR = 'سورة‎‎';
var BISMILLAH_AR = 'سورة‎‎ البقرة';

function getPages(suraList) {
    return suraList.map(function (page) {
        return {
            text: page.name + ' ' + page.tname,
            value: page.index
        };
    });
}

function reducerSura(currentState, action) {
    var index = action.data.index === undefined ? 1 : parseInt(action.data.index, 10);
    //if (action.type !== ACTION_LOAD && currentState.type === TYPE_SURA && currentState.index === index) {
    //return currentState;
    //} else {


    var suraList = currentState.meta.suras.sura;
    var newState = {
        type: TYPE_SURA,
        index: index,
        verse: currentState.quran.filter(function (aya) {
            return aya.sura === index;
        })
    };

    //if (action.type === ACTION_LOAD || currentState.type !== TYPE_SURA) {
    newState.maxPage = suraList.length;
    newState.pages = getPages(suraList);
    //}

    return Object.assign({}, currentState, newState);
    //}
}

function getPages$1(count) {
    var pages = [];
    for (var i = 1; i <= count; i++) {
        pages.push({
            text: i,
            value: i
        });
    }
    return pages;
}

function reducerPage(currentState, action) {
    var index = action.data.index === undefined ? 1 : parseInt(action.data.index, 10);
    var count = currentState.meta.pages.page.length;

    //if (currentState.index === index && currentState.type === TYPE_PAGE) {
    // return currentState;
    //} else {
    var newState = {
        type: TYPE_PAGE,
        index: index,
        verse: currentState.quran.filter(function (aya) {
            return aya.page === index;
        })

        //if (action.type === ACTION_LOAD || currentState.type !== TYPE_PAGE) {
    };var pages = getPages$1(count);
    newState.pages = pages;
    newState.maxPage = count;
    //}

    return Object.assign({}, currentState, newState);
    //}
}

var initialState = {
    type: TYPE_SURA,
    types: [{
        text: 'Sura',
        value: TYPE_SURA
    }, {
        text: 'Page',
        value: TYPE_PAGE
    }],
    index: 1,
    verse: [],
    pages: [],
    maxPage: 0,
    quran: [],
    meta: {
        pages: {
            page: []
        },
        suras: {
            sura: []
        }
    }
};

function applyState(state, data) {
    return Object.assign({}, state, {
        meta: data.meta || {},
        quran: data.quran || []
    });
}

function gotoIndex(state, action) {
    var type = action.data && action.data.type || state.type;
    switch (type) {
        case TYPE_PAGE:
            return reducerPage(state, action);
        case TYPE_SURA:
            return reducerSura(state, action);
        default:
            return state;
    }
}

function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case 'LOAD':
            state = applyState(state, action.data);
            action = {
                data: {
                    index: state.index,
                    type: state.type
                }
            };
        case 'CHANGE_TYPE':
        case 'GOTO_INDEX':
            return gotoIndex(state, action);
        default:
            return state;
    }
}

function gotoIndex$1(index) {
    return {
        type: 'GOTO_INDEX',
        data: {
            index: index
        }
    };
}

var Filter = function (_Component) {
    inherits(Filter, _Component);

    function Filter(props) {
        classCallCheck(this, Filter);

        var _this = possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, props));

        var store = props.store;
        _this.state = store && store.getState() || {};
        return _this;
    }

    // after the component gets mounted to the DOM


    createClass(Filter, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var me = this,
                store = me.props.store;

            me.unsubscribe = store && store.subscribe(function () {
                me.setState(function (prevState, props) {
                    return store && store.getState() || {};
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
            event.preventDefault();
            if (index > 0 && index <= this.state.maxPage) {
                this.props.store.dispatch(gotoIndex$1(index));
            }
        }
    }, {
        key: 'onSelectionChange',
        value: function onSelectionChange(event) {
            var index = parseInt(event.target.value, 10);
            this.gotoIndex(index, event);
        }
    }, {
        key: 'onTypeChange',
        value: function onTypeChange(event) {
            var type = event.target.value;
            this.props.store.dispatch({
                type: 'CHANGE_TYPE',
                data: {
                    type: type,
                    index: 1
                }
            });
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
        key: 'getOptions',
        value: function getOptions(pages, selectedIndex) {
            var _pages = pages || [];
            return _pages.map(function (page, i) {
                return h(
                    'option',
                    { value: page.value, selected: selectedIndex === i },
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
                index = (state.index || 1) - 1,
                options$$1 = me.getOptions(state.pages, index),
                types = me.getTypes(state.types, state.type);

            return h(
                'form',
                { onSubmit: me.handleSubmit.bind(me) },
                h(
                    'fieldset',
                    null,
                    h(
                        'legend',
                        null,
                        state.type
                    ),
                    h(
                        'button',
                        { disabled: index < 1, onClick: me.previous.bind(me) },
                        'Previous ',
                        state.type
                    ),
                    h(
                        'select',
                        { onChange: me.onTypeChange.bind(me), 'aria-label': 'Select type' },
                        types
                    ),
                    h(
                        'select',
                        { disabled: state.maxPage < 2, onChange: me.onSelectionChange.bind(me), 'aria-label': 'Select page' },
                        options$$1
                    ),
                    h(
                        'button',
                        { disabled: state.index >= state.maxPage, onClick: me.next.bind(me) },
                        'Next ',
                        state.type
                    )
                )
            );
        }

        // prior to removal from the DOM

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unsubscribe && this.unsubscribe();
        }
    }]);
    return Filter;
}(Component);

var Header = function (_Component) {
    inherits(Header, _Component);

    function Header() {
        classCallCheck(this, Header);
        return possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
    }

    createClass(Header, [{
        key: 'render',
        value: function render$$1(props) {
            return h(
                'header',
                null,
                h(Filter, { store: props.store })
            );
        }
    }]);
    return Header;
}(Component);

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
            var text = props.children[0];
            var className = props.className;
            return h(
                'svg',
                { viewBox: '0 0 1250 1625', 'class': className },
                h(
                    'g',
                    { stroke: strokeColor, 'stroke-width': '30' },
                    h('circle', { r: '605', cx: '633', cy: '822', fill: fillColor }),
                    h('circle', { r: '510', cx: '633', cy: '822', fill: bgColor })
                ),
                h('path', { 'stroke-width': '30', stroke: strokeColor, fill: fillColor, d: 'M625 29.833c-103.84 178.52-196.29 123.51-353.51 236.32-72.27 51.866-146.27 134.606-229.57 148.02 40.92 54.082 105.585 76.11 201.66 30.11h.041c107.37 116.17 142.759-192.06 381.379 10.33 238.62-202.39 274.009 105.84 381.379-10.33h.04c96.076 46 160.741 23.972 201.661-30.11-83.3-13.414-157.3-96.154-229.57-148.02-157.22-112.81-249.67-57.8-353.51-236.32z'
                }),
                h('circle', { fill: strokeColor, r: '69', cx: '620', cy: '266' }),
                h('path', { fill: strokeColor, d: 'M774.852 255.602a15.002 15.002 0 0 0-4.367 29.16c74.866 27.215 111.261 45.649 161.848 81.652a15.002 15.002 0 1 0 17.394-24.441c-52.253-37.19-92.918-57.752-168.992-85.406a15.002 15.002 0 0 0-5.883-.965zm-309.518 0a15.002 15.002 0 0 1 4.367 29.16c-74.866 27.215-111.261 45.649-161.848 81.652a15.002 15.002 0 1 1-17.394-24.441c52.254-37.19 92.918-57.752 168.992-85.406a15.002 15.002 0 0 1 5.883-.965z'
                }),
                h('path', { 'stroke-width': '30', stroke: strokeColor, fill: fillColor, d: 'M625 1595.167c-103.84-178.52-196.29-123.51-353.51-236.32-72.27-51.866-146.27-134.606-229.57-148.02 40.92-54.082 105.585-76.11 201.66-30.11h.041c107.37-116.17 142.759 192.06 381.379-10.33 238.62 202.39 274.009-105.84 381.379 10.33h.04c96.076-46 160.741-23.972 201.661 30.11-83.3 13.414-157.3 96.154-229.57 148.02-157.22 112.81-249.67 57.8-353.51 236.32z'
                }),
                h('circle', { r: '69', cx: '620', cy: '1358', fill: strokeColor }),
                h('path', { fill: strokeColor, d: 'M774.852 1369.398a15.002 15.002 0 0 1-4.367-29.16c74.866-27.215 111.261-45.649 161.848-81.652a15.002 15.002 0 1 1 17.394 24.441c-52.253 37.19-92.918 57.752-168.992 85.406a15.002 15.002 0 0 1-5.883.965zm-309.518 0a15.002 15.002 0 0 0 4.367-29.16c-74.866-27.215-111.261-45.649-161.848-81.652a15.002 15.002 0 1 0-17.394 24.441c52.254 37.19 92.918 57.752 168.992 85.406a15.002 15.002 0 0 0 5.883.965z'
                }),
                h(
                    'text',
                    { x: '620', y: '970', 'font-size': '500', 'text-anchor': 'middle' },
                    text
                )
            );
        }
    }]);
    return SvgAya;
}(Component);

/**
 * Ruku
 * outline: '#19435c'
 * Inner: '#d2d9f5'
 * bgColor: '#a1c8e5';
 */

var Aya = function (_Component) {
    inherits(Aya, _Component);

    function Aya() {
        classCallCheck(this, Aya);
        return possibleConstructorReturn(this, (Aya.__proto__ || Object.getPrototypeOf(Aya)).apply(this, arguments));
    }

    createClass(Aya, [{
        key: 'render',
        value: function render$$1() {
            var aya = this.props.attr;
            var verseClass = 'verse' + (aya.sajda ? ' sajda' : '');
            var id = 's' + aya.sura + '-a' + aya.index;
            var bgColor = aya.ruku ? '#d2d9f5' : null;
            return h(
                'span',
                { 'class': verseClass, id: id },
                aya.text,
                h(
                    SvgAya,
                    { className: 'aya-count', bgColor: bgColor },
                    toArabicNumber(aya.index)
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
        key: 'render',
        value: function render$$1() {
            var hundredPercent = '100%';
            var viewBox = '0 0 570.4 128.4';
            return h(
                'svg',
                {
                    width: hundredPercent,
                    height: hundredPercent,
                    viewBox: viewBox,
                    role: 'img',
                    'aria-labelledby': 'desc',
                    className: this.props.className },
                h(
                    'desc',
                    null,
                    this.props.desc
                ),
                h('path', {
                    fill: this.props.fill,
                    d: 'M12.8 39.2C11.731 46.131 7.462 51.063 0 54v-.4c4-2.4 6.4-4.938 7.2-7.6-3.738.264-6 .932-6.8 2 .531-3.2 1.462-5.469 2.8-6.8.531-.537 3.731-1.2 9.6-2zm193.6 21.2c0 4-.8 7.462-2.4 10.398-1.6 3.464-4 5.201-7.2 5.201-2.137 0-3.737-.139-4.8-.399v4c0 5.331-.669 8.662-2 10-10.669 12.262-20.669 18.4-30 18.4-4 0-7.069-1.869-9.2-5.601-1.869-2.938-2.8-6.27-2.8-10 0-6.138 1.462-13.737 4.4-22.8-3.2 2.399-8.538 7.331-16 14.8-8.269 8-14.269 13.601-18 16.8-6.938 5.332-12.538 8-16.8 8-3.2 0-6-1.537-8.4-4.6-2.4-3.068-3.6-6.601-3.6-10.601 0-4.801 1.6-10.938 4.8-18.399-.538.262-1.2.399-2 .399-1.869 0-3.469-.139-4.8-.399v4c0 5.331-.538 8.53-1.6 9.6-12.538 12.263-22.669 18.4-30.4 18.4-4 0-7.069-1.601-9.2-4.802-2.137-3.198-3.2-7.067-3.2-11.6 0-1.6.662-5.137 2-10.6 1.331-5.47 2-10.2 2-14.2 0-3.2-.4-6.27-1.2-9.2-3.2-.8-6.4-3.069-9.6-6.8-3.2-3.737-5.337-5.601-6.4-5.601-1.337 0-3.469 2.264-6.4 6.801A97.645 97.645 0 0 0 18 61.996c6.131 3.2 9.2 10.131 9.2 20.799h-2a82.35 82.35 0 0 1-8.4-4.395c-2.668-1.868-4-4.669-4-8.399-6.137 2.932-9.2 6.932-9.2 12 0 .531 2.6 6.662 7.8 18.399 5.2 11.73 7.8 21.063 7.8 28h-.8c-.538-4.27-3.6-12.138-9.2-23.602C4.131 94.131 1.6 86.4 1.6 81.6c0-6.938 4.131-13.338 12.4-19.2 1.063-3.469 3.731-8.137 8-14C26.8 41.462 30.663 38 33.6 38c1.063 0 3.6 2.4 7.6 7.2-.538-1.338-.8-2.669-.8-4 0-3.469 1.2-6.4 3.6-8.8 2.4-2.4 5.331-3.601 8.8-3.601 2.663 0 7.863 1.264 15.6 3.801 7.731 2.53 14.531 3.8 20.4 3.8l-4.8 8c-3.737.531-9.737 2.931-18 7.2-7.2 3.73-13.2 5.6-18 5.6h-1.6c1.332 3.731 2 7.731 2 12 0 3.463-.469 7.332-1.4 11.6-.938 4.265-1.4 6.663-1.4 7.201 0 8.531 3.462 12.799 10.4 12.799 5.063 0 10.931-2.668 17.6-8a159.19 159.19 0 0 0 12-10.799c0-1.869-1.069-4.801-3.2-8.801a92.014 92.014 0 0 0-3.6-7.199l2.8-6.8c2.4 3.731 4.131 6.262 5.2 7.599 1.863 1.863 3.863 2.802 6 2.802 2.663 0 4.8-1.068 6.4-3.2 0-4-.269-7.869-.8-11.601l-6.8-42.399c-.269-2.663-.8-4.663-1.6-6l2-5.601L99.2 14v2.4l-3.6-3.6c-.269.538-.269 1.069 0 1.601l6 40.399c.262 1.063.4 2.933.4 5.601 0 8-2.138 12.931-6.4 14.8-2.669 5.863-4 11.063-4 15.6 0 2.4.931 4.663 2.8 6.802 2.131 2.399 4.663 3.6 7.6 3.6 4.8 0 10.931-3.6 18.4-10.8a1334.436 1334.436 0 0 0 20-18.8c5.063-4.271 10-7.869 14.8-10.801-1.338-.536-3.338-2-6-4.399-3.738-2.938-5.6-6.27-5.6-10 0-6.137 3.331-9.2 10-9.2 12.8 0 26.663 2.262 41.6 6.8l-5.2 8c-4.8 1.601-13.469 5.063-26 10.4 1.331 2.132 2.8 7.2 4.4 15.2-7.2 0-10.8-2.139-10.8-6.4 0-.537.131-1.469.4-2.8.263-1.337.4-2.27.4-2.8-1.069.8-2.668 1.861-4.8 3.198-2.669 8.531-4 14.933-4 19.201 0 8.531 3.6 12.799 10.8 12.799 7.731 0 17.6-6.268 29.6-18.799-.269-1.869-1.337-4.801-3.2-8.801a54.095 54.095 0 0 1-3.6-6.8l2.4-7.2c2.4 4 4.262 6.531 5.6 7.599 1.6 1.863 3.6 2.802 6 2.802 2.662 0 4.8-1.068 6.4-3.2-.269-4-.669-7.869-1.2-11.601l-6.4-42c-.538-2.931-1.069-5.063-1.6-6.399l2-5.601 6.8 13.2v2.4L200 12.8c-.269.801-.269 1.47 0 2l6 40c.263 1.062.4 2.931.4 5.6zM27.6 24.8c0 4.531-1.469 6.801-4.4 6.801-2.669 0-4-1.47-4-4.4 0-1.869.4-4.131 1.2-6.8 1.6-3.2 2.4-5.063 2.4-5.601.531 2.139.663 3.601.4 4.4 2.931 1.6 4.4 3.469 4.4 5.6zm-1.2 1.6c-1.069-1.337-2.668-2.27-4.8-2.8-1.069 1.063-1.6 1.73-1.6 2 0 1.6.931 2.4 2.8 2.4 1.331 0 2.531-.538 3.6-1.6zm10.8 66l-2.8 4.398c-1.6.531-3.337.933-5.2 1.201-2.938 1.063-4.4 2.263-4.4 3.601 1.332 5.331 2 9.063 2 11.199 0 4.801-.137 7.601-.4 8.399 0-2.938-.538-6.8-1.6-11.6-1.068-4.802-1.6-7.869-1.6-9.2 0-2.399.862-4 2.6-4.8 1.731-.802 3.4-1.47 5-2-1.068-.802-2-1.2-2.8-1.2l-2.4 2v-2a30.572 30.572 0 0 0 2-3c.531-.938 1.2-1.399 2-1.399 1.6.001 4.131 1.463 7.6 4.401zm3.2-20l-3.2 6.398-6.8-3.198 2.4-5.6-6-3.201 2.8-6.398 7.2 3.2L34 69.2l6.4 3.2zm34-30.8c-1.6-.27-5.337-1.2-11.2-2.801C58.4 37.2 54.662 36.4 52 36.4c-6.138 0-9.2 2.263-9.2 6.8 0 1.862.663 3.731 2 5.6 1.063 1.063 2.4 1.601 4 1.601 3.731 0 8-1.069 12.8-3.2 7.731-3.47 12-5.339 12.8-5.601zM78 72c-4 10.131-9.069 15.2-15.2 15.2-4.537 0-6.8-2.137-6.8-6.4 0-3.469 2.931-7.067 8.8-10.799-1.068-.801-2.137-1.201-3.2-1.201-1.337 0-2.669.663-4 2v-1.6c1.331-2.938 3.2-4.4 5.6-4.4 4 0 7.2.531 9.6 1.602L68 70.799c-1.869.531-3.938 1.732-6.2 3.602-2.269 1.862-3.4 3.462-3.4 4.8 0 2.4 2.131 3.6 6.4 3.6 2.932 0 5.863-1.6 8.8-4.799 1.331-2.14 2.8-4.14 4.4-6.002zm7.2-54.4c0 3.199-1.069 4.8-3.2 4.8-1.069 0-2.138-.531-3.2-1.601-.8 2.139-2 3.2-3.6 3.2-1.869 0-2.8-1.2-2.8-3.6v-4.8c-.538.538-1.2 1.337-2 2.399v-1.6c.531-1.331 1.863-3.063 4-5.2-.8 5.6-.269 8.4 1.6 8.4 1.331 0 2-.932 2-2.801 0-.8-.269-2.399-.8-4.8L78.4 9.6c.8 1.337 1.332 3.337 1.6 6 0 1.869.663 2.8 2 2.8.8 0 1.2-.663 1.2-2L82 11.2l1.6-2.8c1.063 3.469 1.6 6.538 1.6 9.2zM108 86.4c-.269 3.73-1.6 5.601-4 5.601s-3.6-1.201-3.6-3.601c0-3.469 1.863-7.469 5.6-12-1.869 4.263-2.8 7.331-2.8 9.2 0 1.861.662 2.8 2 2.8 1.331 0 2.131-.669 2.4-2h.4zm8-23.2c0 5.599-.669 9.863-2 12.8h-.8c.262-5.869 0-12-.8-18.399l-7.2-45.2c-.269-2.663-.8-4.663-1.6-6l2-5.601 6.8 13.2v2.4l-3.2-3.601c-.269.538-.269 1.069 0 1.601l6.4 42.8c.262 1.331.4 3.331.4 6zm18-50c0 1.068-.4 2.27-1.2 3.6-.8-.8-1.469-1.199-2-1.199-1.337 0-2.4 1.869-3.2 5.6-.538 2.4-.938 5.063-1.2 8-.8-2.138-2.137-4.938-4-8.4-.269 1.339-1.069 2-2.4 2-2.138 0-3.2-1.199-3.2-3.6 0-2.932.932-4.4 2.8-4.4 2.4 0 4.531 2.801 6.4 8.4 1.6-9.6 3.6-14.4 6-14.4 1.331-.001 2 1.468 2 4.399zm.4 22.4c-1.069 7.199-5.2 12.131-12.4 14.8l-.4-.4c4-2.399 6.4-4.938 7.2-7.6-3.737.263-6 .931-6.8 2 .531-3.2 1.462-5.469 2.8-6.8.531-.537 3.731-1.2 9.6-2zm-.4 24.8l-3.2 6.398L124 63.6l3.2-6.4 6.8 3.2zm7.2 42.8c0 3.731-1.338 5.601-4 5.601-2.4 0-3.6-1.199-3.6-3.601 0-3.469 1.862-7.469 5.6-12h.4c-2.138 4.263-3.2 7.332-3.2 9.2 0 1.862.663 2.8 2 2.8 1.332 0 2.131-.668 2.4-2h.4zm7.2-85.6c0 3.199-.668 6.8-2 10.8.263-2.137.4-4.531.4-7.2 0-4.8-1.469-8.531-4.4-11.2l.4-4.8c1.863 1.068 3.263 2.938 4.2 5.6.931 2.669 1.4 4.937 1.4 6.8zm33.2 31.6c-7.469-3.2-16.138-4.8-26-4.8-4.8 0-8 .531-9.6 1.6 0 .531 1.731 2.063 5.2 4.601 3.462 2.53 6.4 5 8.8 7.399 5.6-2.669 12.8-5.6 21.6-8.8zM190.4 4c0 1.601-.469 3.47-1.4 5.601-.938 2.137-2.069 3.736-3.4 4.8 1.6-3.2 2.4-5.462 2.4-6.8-13.6 4.269-26 11.469-37.2 21.6.263-1.338.531-2.669.8-4 4.531-4.531 10.6-8.8 18.2-12.8C177.4 8.4 184.263 5.6 190.4 4zm-10 70.4c.531 2.132 0 3.331-1.6 3.601-.8.263-2-.27-3.6-1.601-1.069 1.862-2.8 4.398-5.2 7.601-2.938 3.462-6.8 5.601-11.6 6.399l-3.6.8c3.731-1.869 7.863-4.537 12.4-8 3.731-2.938 6.262-5.869 7.6-8.8 1.063-2.138 2-3.337 2.8-3.602 1.331-.266 2.262.933 2.8 3.602zm3.2-47.6c0 3.2-1.069 4.801-3.2 4.801-1.069 0-2.137-.669-3.2-2-.8 2.131-2 3.199-3.6 3.199s-2.538-1.067-2.8-3.199v-5.2c-.537.8-1.068 1.6-1.6 2.399v-1.2c.262-1.337 1.462-3.063 3.6-5.2-.8 5.332-.269 8 1.6 8 1.332 0 2-.8 2-2.4 0-.8-.269-2.53-.8-5.2l1.6-2c.531 1.069.931 2.938 1.2 5.601 0 1.863.663 2.8 2 2.8.8 0 1.2-.538 1.2-1.6 0-.27-.4-2-1.2-5.2l1.6-3.2c1.063 3.468 1.6 6.668 1.6 9.599zm-4 48.8c-1.069-1.601-2.269-2-3.6-1.2 1.6 1.062 2.8 1.462 3.6 1.2zM216 92c0 2.662-.8 4-2.4 4-1.069 0-2.269-.399-3.6-1.201-4.538 8.265-12.938 12.265-25.2 12h-.4v-.399c12-2.938 20.131-7.069 24.4-12.399-1.337-.538-2-1.338-2-2.399 0-.802.4-1.738 1.2-2.802.8-1.067 1.462-1.6 2-1.6l-.4-1.6.4-.4c.531 0 1.462.531 2.8 1.6v.4c2.131 2.4 3.2 4 3.2 4.8zm4.4-28.8c0 5.599-.668 9.863-2 12.8h-.8c.262-5.869-.138-12-1.2-18.399l-6.8-45.2c-.538-2.663-1.069-4.663-1.6-6L210 .8l6.8 13.2v2.4l-3.2-3.601a3.543 3.543 0 0 0-.4 1.601l6.8 42.8c.263 1.331.4 3.331.4 6zM211.6 90c0-.538-.269-.801-.8-.801-1.068 0-1.869.4-2.4 1.2.531.8 1.332 1.331 2.4 1.601 0-.27.131-.601.4-1 .262-.4.4-.738.4-1zm358.8-14.8c0 3.731-.869 6.801-2.602 9.2-1.736 2.398-3.668 3.6-5.799 3.6-4 0-6.8-2.538-8.4-7.601-1.067 5.063-3.337 7.601-6.8 7.601-3.2 0-5.337-2.139-6.398-6.399-2.139 5.063-5.869 7.6-11.2 7.6-1.869 0-3.4-.737-4.602-2.199-1.198-1.469-1.8-3.139-1.8-5v-2c-37.6 11.73-76 17.601-115.2 17.601-18.938 0-37.469-1.601-55.6-4.802-17.338-2.668-30.27-6.268-38.8-10.799 0 3.73-.139 7.462-.4 11.199H312c-3.2-2.137-5.2-4.668-6-7.6a110.407 110.407 0 0 1-.6-6c-.139-1.869-1.802-2.802-5-2.802-2.938 0-7.938 4.265-15 12.802-7.069 8.53-12.469 12.8-16.2 12.8-2.138 0-4-1-5.6-3s-2.4-4.737-2.4-8.2c0-1.869.4-4.137 1.2-6.8-1.337.531-2.668.8-4 .8-5.337 0-8.8-3.6-10.4-10.8-.538 8.8-4.538 13.2-12 13.2-3.2 0-5.6-1.738-7.2-5.2-1.068-2.669-1.469-5.737-1.2-9.2 0-.537.262-2.4.8-5.6.263-2.669.4-5.069.4-7.2-1.869 2.663-3.2 6.132-4 10.398-.537 2.933-1.068 5.863-1.6 8.802-1.069 4.8-2.8 7.198-5.2 7.198-1.869 0-3.469-1.536-4.8-4.6-1.338-3.068-2-6.338-2-9.8 0-3.737.262-7.868.8-12.4l.8.4a51.025 51.025 0 0 0-.4 6.398c0 9.063 1.863 13.602 5.6 13.602 1.331 0 2.531-2 3.6-6 1.862-6.669 2.931-10.538 3.2-11.601 1.863-4.536 4.263-7.6 7.2-9.199v5.199c-1.069 6.932-1.6 11.201-1.6 12.801 0 5.861 2.131 8.8 6.4 8.8 2.663 0 5-1.069 7-3.2 2-2.137 3-4.668 3-7.6L244 54l2-5.6c1.331 2.663 2.131 4.8 2.4 6.399.8 4.531 1.462 9.2 2 14 1.6 6.663 4.531 10 8.8 10 2.662 0 4.531-1.067 5.6-3.198-1.337-2.938-2.668-5.869-4-8.802-1.869-4.799-2.938-8.536-3.2-11.198l-1.2-2.801 1.6-5.6 5.6 8.8v2c-.8-.538-1.6-1.2-2.4-2-.269.531-.269.8 0 .8 3.731 8.531 5.6 14.4 5.6 17.601 0 4.8-1.068 8-3.2 9.601-.8 2.662-1.2 4.662-1.2 6 0 3.73 1.863 5.601 5.6 5.601 3.462 0 8.663-4.338 15.6-13 6.93-8.669 12.4-13 16.4-13 1.331 0 3.2.8 5.6 2.399l2-4.801c3.731 5.331 14.8 10.261 33.2 14.799 21.063 4.799 45.2 7.199 72.4 7.199 18.398 0 38.662-1.6 60.8-4.8 19.2-2.938 36.531-6.538 52-10.8-.537.8-.8 1.729-.8 2.8 0 1.601.531 3.063 1.6 4.398 1.063 1.332 2.263 2 3.602 2 2.661 0 5.462-1.337 8.398-4L544 73.6l.4.4v1.601c0 3.729 1.331 5.6 4 5.6 1.331 0 2.8-1.199 4.398-3.6 1.862-3.2 3.2-5.068 4-5.601h.4v1.601c0 2.131.73 4.063 2.2 5.8 1.463 1.73 2.863 2.6 4.2 2.6 2.663 0 4-1.068 4-3.201 0-2.398-2-7.198-6-14.398-4.269-7.737-6.537-12.4-6.8-14a48.52 48.52 0 0 0-1.2-2.2c-.537-.938-.8-1.538-.8-1.8l1.2-6 8 8.399V50.4l-3.6-1.601v.801c2.131 3.199 4.262 6.399 6.398 9.6 3.735 6.662 5.604 12 5.604 16zm-355.6 18c-.537-.537-1.337-1.469-2.4-2.8l-.8 2c.8.531 1.6.8 2.4.8h.8zM262.4 0c0 1.337-.538 3.069-1.6 5.2-1.068 2.137-2.137 3.869-3.2 5.2 1.6-3.2 2.4-5.601 2.4-7.2-16.538 5.337-30.538 13.2-42 23.6 0-1.337.263-2.8.8-4.399 4.531-4.262 11.463-8.8 20.8-13.601 8.8-4.531 16.4-7.463 22.8-8.8zm-16.8 93.6c0 1.331-.538 2.662-1.6 4-.538-.802-1.2-1.2-2-1.2-1.337 0-2.4 1.73-3.2 5.2a84.252 84.252 0 0 1-1.2 8c-.538-1.869-1.869-4.669-4-8.4-.269 1.6-.938 2.4-2 2.4-2.4 0-3.6-1.338-3.6-4 0-2.669 1.063-4 3.2-4 2.131 0 4.262 2.8 6.4 8.399 1.331-9.601 3.331-14.399 6-14.399 1.331 0 2 1.331 2 4zm.8-59.2c0 3.2-1.2 4.8-3.6 4.8-.8 0-1.869-.669-3.2-2-.538 2.131-1.738 3.2-3.6 3.2-1.6 0-2.538-1.069-2.8-3.2V32c-.538.8-1.069 1.601-1.6 2.4v-1.6c.531-1.067 1.731-2.668 3.6-4.8-.538 5.331 0 8 1.6 8 1.332 0 2-.938 2-2.8 0-.538-.269-2.138-.8-4.8l1.6-2c.8 1.063 1.2 2.931 1.2 5.6.263 1.862 1.063 2.8 2.4 2.8.8 0 1.2-.536 1.2-1.6 0-.269-.4-2-1.2-5.2l1.2-3.2c1.331 3.463 2 6.662 2 9.6zm10-4.4c0 3.2-.668 6.8-2 10.8.263-2.137.4-4.536.4-7.199 0-4.801-1.469-8.538-4.4-11.2l.4-5.2c1.6 1.337 2.932 3.337 4 6 1.062 2.661 1.6 4.93 1.6 6.799zM278 63.2c0 5.599-.538 9.863-1.6 12.8h-.8c.262-5.869-.138-12-1.2-18.399l-6.8-45.2c-.538-2.663-1.069-4.663-1.6-6L268 .8l6.8 13.2v2.4l-3.2-3.601a3.543 3.543 0 0 0-.4 1.601l6.8 42.8v6zm25.6 27.599c.264 2.4-.269 3.732-1.6 4-.8 0-2.138-.536-4-1.6-1.067 1.863-2.669 4.263-4.8 7.2-3.2 3.462-7.2 5.73-12 6.8l-3.2.4c3.462-1.601 7.463-4.139 12-7.601 4-3.201 6.662-6.27 8-9.201 1.063-2.137 1.862-3.337 2.4-3.6 1.331.003 2.4 1.203 3.2 3.602zM301.2 19.2c0 1.068-.4 2.27-1.2 3.6-.8-.8-1.469-1.199-2-1.199-1.338 0-2.399 1.736-3.2 5.199-.537 2.933-.938 5.601-1.199 8-.537-1.868-1.869-4.536-4-8-.27 1.332-1.068 2-2.399 2-2.138 0-3.2-1.199-3.2-3.6 0-2.932.931-4.4 2.8-4.4 2.4 0 4.531 2.801 6.4 8.4 1.6-9.6 3.6-14.4 6-14.4 1.329 0 1.998 1.469 1.998 4.4zm1.2 22l-2.802 4.4c-1.6.53-3.336 1.063-5.199 1.6-2.938.8-4.399 2-4.399 3.6 1.331 5.063 2 8.663 2 10.801 0 4.8-.138 7.6-.399 8.399 0-2.938-.537-6.737-1.601-11.399-1.067-4.669-1.601-7.669-1.601-9 0-2.669.863-4.4 2.601-5.2a47.971 47.971 0 0 1 5-2c-1.338-.538-2.399-.8-3.2-.8.264 0-.537.53-2.398 1.6l.398-2c.531-.8 1.133-1.8 1.801-3 .662-1.2 1.399-1.8 2.199-1.8 1.599-.001 4.132 1.599 7.6 4.799zm.4 50.8c-1.067-1.601-2.269-2-3.6-1.201 1.331 1.063 2.531 1.463 3.6 1.201zm8.4-10.8c-.8-.537-2-1.737-3.602-3.6 0 1.331.332 2.861 1 4.6.663 1.731 1.4 2.6 2.2 2.6.265-.001.402-1.2.402-3.6zM516.8 98c-1.337 0-2.269-.801-2.8-2.399-1.869 2.399-3.6 3.6-5.2 3.6-.537 0-1.398-.4-2.6-1.199-1.2-.802-1.938-1.202-2.2-1.202-1.338 0-3.869.802-7.6 2.4-4.802 2.131-8.67 3.731-11.602 4.801-5.868 1.861-12.269 2.799-19.2 2.799l-.398-.8c5.862 0 11.73-1.201 17.6-3.601 3.2-1.069 7.731-3.2 13.602-6.399 4.262-2.399 7.331-3.601 9.198-3.601.531 0 1.332.531 2.4 1.601 1.063 1.063 2 1.601 2.8 1.601 1.063 0 2.263-1.338 3.602-4l1.198-.802c-.269 2.133.4 3.201 2 3.201.802 0 1.602-1.338 2.4-4l.8-.399c0 5.599-1.337 8.399-4 8.399zm31.6-72.8c0 1.063-.538 2.4-1.602 4-.8-1.069-1.469-1.6-2-1.6-1.337 0-2.398 1.861-3.2 5.6a91.339 91.339 0 0 1-1.198 7.6c-.802-1.868-2.139-4.536-4-8-.271 1.332-1.069 2-2.4 2-2.138 0-3.2-1.199-3.2-3.6 0-2.938.933-4.4 2.8-4.4 2.4 0 4.531 2.801 6.4 8.4 1.6-9.6 3.6-14.4 6-14.4 1.6 0 2.4 1.469 2.4 4.4zM545.2 56c0 4.8-1.469 7.2-4.4 7.2-2.669 0-4-1.469-4-4.4 0-1.868.531-4.137 1.602-6.8 1.6-3.2 2.398-5.068 2.398-5.6.531 2.131.663 3.6.4 4.399 2.662 1.601 4 3.332 4 5.201zm-1.2 2c-1.068-1.337-2.669-2.399-4.8-3.2-.8 1.332-1.2 2.132-1.2 2.4 0 1.331.932 2 2.8 2 1.331 0 2.4-.4 3.2-1.2zm20 38l-2.8 6.399-6.8-3.602 2.8-6.398L564 96z' })
            );
        }
    }]);
    return Bismillah;
}(Component);

var Sura = function (_Component) {
    inherits(Sura, _Component);

    function Sura() {
        classCallCheck(this, Sura);

        var _this = possibleConstructorReturn(this, (Sura.__proto__ || Object.getPrototypeOf(Sura)).call(this));

        _this.state.verse = [];
        return _this;
    }

    createClass(Sura, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var me = this;
            me.setState({
                verse: []
            });
            window.requestAnimationFrame(me.stepState.bind(me));
        }

        // before new props get accepted of already rendered

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            this.componentDidMount();
        }
    }, {
        key: 'render',
        value: function render$$1(props, state) {
            var me = this;
            return h(
                'article',
                { lang: 'ar' },
                me.getHeader(me.state.verse[0], me.props.meta),
                me.getVerse(me.state.verse)
            );
        }
    }, {
        key: 'getHeader',
        value: function getHeader(firstAya, meta) {

            if (!firstAya) {
                return;
            }

            var h2 = void 0;
            var h3 = void 0;
            var h4 = void 0;
            var title = firstAya.sura === undefined ? {} : meta.suras.sura[firstAya.sura - 1];
            var svgTitle = 'assets/images/sura-title/' + firstAya.sura + '.svg';
            var altTitle = SURA_AR + ' ' + title.name;

            if (firstAya.index === 1) {
                h2 = h(
                    'h2',
                    null,
                    h('img', { src: svgTitle, alt: altTitle })
                );
                h3 = h(
                    'h3',
                    null,
                    title.tname,
                    ' | ',
                    title.ename,
                    ' | ',
                    title.type
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
            return verse.reduce(function (accum, aya, index) {
                return aya.sura === 1 && aya.index === 1 ? accum : accum.concat(h(Aya, { attr: aya }));
            }, []);
        }
    }, {
        key: 'stepState',
        value: function stepState() {
            var me = this;
            var count = me.state.verse.length + 50;
            var data = me.props.data || [];
            me.setState({
                verse: data.slice(0, count)
            });

            if (count < data.length) {
                window.requestAnimationFrame(me.stepState.bind(me));
            }
        }
    }]);
    return Sura;
}(Component);

var Content = function (_Component) {
    inherits(Content, _Component);

    function Content(props) {
        classCallCheck(this, Content);
        return possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));
    }

    // after the component gets mounted to the DOM


    createClass(Content, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var me = this,
                store = me.props.store;

            me.unsubscribe = store.subscribe(function () {
                me.setState(function (prevState, props) {
                    return store.getState();
                });
            });
        }

        /**
         * 
         * @param {Array} verse 
         */

    }, {
        key: 'getVerse',
        value: function getVerse(verse, meta) {

            var groups = verse.reduce(function (accum, aya) {
                var ayat = accum[aya.sura] || (accum[aya.sura] = []);
                ayat.push(aya);
                return accum;
            }, {});

            return Object.keys(groups).reduce(function (accum, groupName) {
                accum.push(h(Sura, { data: groups[groupName], meta: meta }));
                return accum;
            }, []);
        }
    }, {
        key: 'render',
        value: function render$$1(props, state) {
            var ayat = this.getVerse(state.verse || [], state.meta);
            return h(
                'main',
                null,
                ayat
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

    function Footer(props) {
        classCallCheck(this, Footer);

        var _this = possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));

        var me = _this,
            store = props.store,
            newState = store && store.getState() || {};

        me.setState(newState);

        return _this;
    }

    // after the component gets mounted to the DOM


    createClass(Footer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var me = this,
                store = me.props.store,
                newState = store && store.getState() || {};

            me.unsubscribe = store && store.subscribe(function () {
                me.setState(function (prevState, props) {
                    return newState;
                });
            });
        }
    }, {
        key: 'render',
        value: function render$$1(props, state) {
            return h(
                'footer',
                null,
                state.type,
                ' ',
                state.index,
                ' of ',
                state.maxPage
            );
        }

        // prior to removal from the DOM

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var unsubscribe = this.unsubscribe;
            unsubscribe && unsubscribe();
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

__$styleInject(":lang(ar) {\n    direction: rtl;\n    font-family: Amiri, serif;\n}\n\nsection{\n    max-width: 1200px;\n    margin: 0 auto;\n}\n\narticle {\n    line-height: 2.5em;\n    font-size: 1.5em;\n    padding: 1em;\n}\n\narticle header {\n    text-align: center;\n    /*padding: 0 0 1em 0;*/\n}\n\narticle header * {\n    line-height: 1;\n    padding: 0;\n    margin: 0;\n}\n\narticle header h2 {\n    font-size: 2em; \n}\n\narticle h2 img{\n    max-width: 100%;\n    max-height: 90px;\n}\n\narticle header h3 {\n    font-size: 0.7em;\n    color: #5C3219;\n    font-weight: 300;\n}\n\n/*\narticle header h4{\n    font-size: 0.7em;\n    padding-top: 1em;\n}\n\narticle h4 img{\n    width: 240px;\n    max-width: 100%;\n}\n*/\n.bismillah{\n    width: 240px;\n    max-width: 100%;\n    margin-top: 1em;\n}\n\n.verse {\n    border-bottom: 1px dotted #5c1712;\n}\n\n.sajda {\n    color: red;\n}\n\n.ayaNumber {\n    background: url(assets/images/ayah.svg) 50% 50% no-repeat;\n    padding: 0.8em 1em;\n    font-size: 0.5em;\n    margin: 0 1em;\n    vertical-align: top;\n}\n\n.aya-count{\n    width: 1.5em;\n    vertical-align: middle;\n    margin: 0 0.5em;\n}\n\n.ayaNumber.ruku {\n    background: url(assets/images/ruku.svg) 50% 50% no-repeat;\n}\n\n\n\n\n\n\n\n\nfooter {\n    text-align: center;\n    padding: 1em;\n}", undefined);

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

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob();
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  };

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    };

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue+','+value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) { items.push(name); });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) { items.push(value); });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) { items.push([name, value]); });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'omit';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  };

  function decode(body) {
    var form = new FormData();
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=');
        var name = split.shift().replace(/\+/g, ' ');
        var value = split.join('=').replace(/\+/g, ' ');
        form.append(decodeURIComponent(name), decodeURIComponent(value));
      }
    });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = 'status' in options ? options.status : 200;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : 'OK';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);
      var xhr = new XMLHttpRequest();

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        resolve(new Response(body, options));
      };

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'));
      };

      xhr.open(request.method, request.url, true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob';
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value);
      });

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  };
  self.fetch.polyfill = true;
})(typeof self !== 'undefined' ? self : undefined);

var Router = function () {
    function Router(routes) {
        classCallCheck(this, Router);

        this.routes = {};
        this.addRoutes(routes);
        window.addEventListener('hashchange', this.onHashChange.bind(this));
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
            var i = void 0,
                match = void 0;
            for (i in this.routes) {
                var route = this.routes[i];
                if (match = route.regex.exec(hash)) {
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
    }]);
    return Router;
}();

if (!window.Promise) {
    window.Promise = promise;
}

var store = createStore(reducer);
var loader = document.querySelector('.loader');

/* *********************************************
 * Router Config Start
 * ******************************************* */

var router = new Router({
    '(sura|page)\/(\\d+)': function suraPageD(type, _index) {
        var index = parseInt(_index, 10);
        if (index && index > 0) {
            var state = state = store.getState();
            if (!(state.index === index && state.type === type)) {
                store.dispatch({
                    type: ACTION_GOTO_INDEX,
                    data: {
                        type: type,
                        index: index
                    }
                });
            }
        } else {
            this.redirectTo(type + '/1');
        }
    },
    'sura\/(\\d+)\/aya\/(\\d+)': function suraDAyaD(sura, aya) {
        console.log('callback', sura, aya, this);
    }
}).execute();

store.subscribe(function () {
    var state = store.getState();
    router.redirectTo(state.type + '/' + state.index);
});

/* *********************************************
 * Router End
 * ******************************************* */

var app = render(h(App, {
    store: store
}), document.body, document.getElementById('app'));

function hidePreloader() {
    app.removeAttribute('hidden');
    loader.setAttribute('hidden', true);
}

function init() {
    promise.all([fetchXML('assets/data/quran-simple.xml'), fetchXML('assets/data/quran-data.xml')]).then(function (responses) {
        var verse = flattenSura(responses[0].quran.sura);
        var meta = responses[1].quran;

        store.dispatch({
            type: ACTION_LOAD,
            data: {
                quran: mergeMeta(verse, meta),
                meta: meta
            }
        });

        hidePreloader();
    }, function (e) {
        console.log(e);
    });
}

init();

/*

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        "use strict"
        navigator.serviceWorker
        .getRegistration()
        .then(function (registration) {
            if (registration && registration.active) {
                //registration.unregister()
            }

            if (!registration || !navigator.serviceWorker.controller) {
                navigator.serviceWorker
                    .register('service-worker.js')
                    .then(function () {
                        window.location.reload();
                    });
            } else {
                init();
            }
        });
    });
} else {
    init();
}

*/

// attach Google fonts css
(function (document, nodeType, existingNode, node) {
    existingNode = document.getElementsByTagName(nodeType)[0];
    node = document.createElement(nodeType);
    node.rel = 'stylesheet';
    node.href = 'https://fonts.googleapis.com/css?family=Amiri';
    node.type = 'text/css';
    existingNode.parentNode.insertBefore(node, existingNode);
})(document, 'link');

}());
//# sourceMappingURL=app.js.map
