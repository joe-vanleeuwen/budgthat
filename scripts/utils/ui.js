function createComponent(tag, value, children /*options*/) {
  return {
    tag: tag,
    value: value,
    children: children
  }
}

var createHTML = function (node) {
  node.el = document.createElement(node.tag)
  node.el.innerHTML = node.value || ""

  if (node.styles) {
    for (var k in node.styles) {
      node.el.style[k] = node.styles[k]
    }
  }

  if (node.onClick) {
    node.el.addEventListener("click", node.onClick)
  }

  if (node.children) {
    node.children.forEach(function (child) {
      node.el.appendChild(createHTML(child).el)
    })
  }
  return node
}

var DOM = (function() {
  function Component(props) {
    this.props = props
    // _.extend(this, props)
    this.init()
    this._render(this.render())
    return this
  }

  // Component.prototype._init = function () {
  //   this.init()
  // }

  Component.prototype.init = function() {
    this.state = {}
  }

  Component.prototype._render = function(options) {
    if (!this.el) {
      this.el = document.createElement(options.tag)
    }
    this.el.innerHTML = options.value || ""

    if (options.styles) {
      for (var k in options.styles) {
        this.el.style[k] = options.styles[k]
      }
    }

    if (options.onClick) {
      // TODO: cache events so they can be removed? Or, just make sure not to add the event the second time
      addEventListener(this.el, "click", options.onClick.bind(this))
    }

    if (options.children) {
      options.children.forEach(function (child, i) {
        // TODO: determin if children have been removed and remove them...
        // if (child._key) {
        //   child.render()
        // } else {
        //   this.el.appendChild((create(_.extend(child, {_key: i}))).el)
        // }
        this.el.appendChild((create(_.extend(child, {_key: i}))).el)
      }.bind(this))
    }
  }

  Component.prototype.render = function () {
    return this.props
  }

  Component.prototype.remove = function() {
    if (props.onClick) {
      this.el.removeEventListener("click", props.onClick)
    }
  }

  Component.prototype.setState = function (state) {
    this.state = _.defaults(state, this.state)
    this._render(this.render())
  }

  function addEventListener(el, event, listener) {
    el.addEventListener(event, listener)
  }

  function create(props) {
    return props.component ? new props.component(props) : new Component(props)
  }

  return {
    Component: Component,
    create: create,
  }
})()








