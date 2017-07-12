var DOM = (function() {
  class Component {
    constructor(props) {
      this.props = props
      this.state = {}
      this._children = []
      this.listeners = {}
      // this.observer()
    }

    // observer() {
    //   var observer = new MutationObserver(function(mutations) {
    //     mutations.forEach(function(mutation) {
    //       console.log(mutation.type, mutation);
    //       mutation.addedNodes.forEach(function (node) {

    //       })
    //     })
    //   })

    //   var config = {
    //     attributes: true,
    //     childList: true,
    //     characterData: true,
    //     subtree: true
    //   }
       
    //   // pass in the target node, as well as the observer options
    //   observer.observe(this.el, config);
    // }

    _render() {
      var options = _.defaults(this.render(), this.props)
      this.el = this.el || options.el || document.createElement(options.tag)

      this.el.innerHTML = options.value || ""

      if (options.styles) {
        for (var k in options.styles) {
          this.el.style[k] = options.styles[k]
        }
      }

      // if (options.class) {
      //   this.el.className = 
      // }

      ["id", "type", "for"].forEach((attribute)=> {
        if (options[attribute]) {
          this.el[attribute] = options[attribute]
        }
      })

      if (options.onClick) {
        // TODO: cache events so they can be removed? Or, just make sure not to add the event the second time
        this.addEventListener("click", options.onClick)
      } else if (this.previousProps && this.previousProps.onClick) {
        this.removeEventListener("click", this.previousProps.onClick)
      }

      if (options.children) {
        options.children.forEach(function (child, i) {
          // TODO: determine if children have been removed and remove them...
          // if (child._key) {
          //   child.render()
          // } else {
          //   this.el.appendChild((create(_.extend(child, {_key: i}))).el)
          // }
          // this.el.appendChild((create(_.extend(child, {_key: i}))).el)
          if (child) {
            var _child = create(_.extend(child, {_key: i}))
            _child._render()
            this.el.appendChild(_child.el)
            this._children.push(_child)
          }
        }.bind(this))
      }
      this.previousProps = options
    }

    render() {
      return this.props
    }

    remove() {
      if (props.onClick) {
        this.el.removeEventListener("click", props.onClick)
      }
    }

    setState(state) {
      this.state = _.defaults(state, this.state)
      this._render(this.render())
    }

    addEventListener(event, listener) {
      var listener = listener.bind(this)
      if (this.listeners[event]) {
        var cached = this.listeners[event].filter(function (cachedEvent) {
          return cachedEvent == listener
        })
        if (!cached) {
          this.listeners[event].push(listener)
          this.el.addEventListener(event, listener)
        }
      } else {
        this.listeners[event] = [listener]
        this.el.addEventListener(event, listener)
      }
    }

    removeEventListener(event) {
      this.listeners[event] && this.listeners[event].forEach((fn)=> {
        this.el.removeEventListener(event, fn)
      })
    }
  }

  // Component.prototype._init = function () {
  //   this.init()
  // }

  function create(props) {
    return props.component ? new props.component(props) : new Component(props)
  }

  return {
    Component: Component,
    create: create,
  }
})()








