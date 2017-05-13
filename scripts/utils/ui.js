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








