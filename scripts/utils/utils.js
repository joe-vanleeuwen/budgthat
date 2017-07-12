var _ = {}

_.partial = function() {
  var args = Array.prototype.slice.call(arguments)
  var fn = args[0]
  var rest = args.slice(1)
  return function () {
    var args = Array.prototype.slice.call(arguments)
    return fn.apply(this, rest.concat(args))
  }
}

_.partialRight = function() {
  var args = Array.prototype.slice.call(arguments)
  var fn = args[0]
  var rest = args.slice(1)
  return function () {
    var args = Array.prototype.slice.call(arguments)
    return fn.apply(this, args.concat(rest))
  }
}

_.defaults = function(obj, defaultValues) {
  var _values = {}
  for (k in defaultValues) {
    if (typeof obj[k] == 'undefined') {
      _values[k] = defaultValues[k]
    }
  }
  return Object.assign({}, obj, _values)
}

_.extend = function(obj, extendValues) {
  if (!obj) {
    return extendValues
  }
  for (k in extendValues) {
    if (typeof obj[k] == 'undefined') {
      obj[k] = extendValues[k]
    }
  }
  return obj
}