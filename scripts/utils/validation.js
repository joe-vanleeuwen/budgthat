function validate() {
  var args = Array.prototype.slice.call(arguments)
  var data = args[0]
  var fields = args.slice(1)
  return fields.map(function (field) {
    var fieldName = field[0]
    var validators = field.slice(1)
    return validators.map(function (validator) {
      return validator(fieldName, data[fieldName])
    }).reduce(function (m,n) { return n ? m.concat(n) : m }, [])
  }).reduce(function (m,n) { return n ? m.concat(n) : m }, [])
}

function conditonallyValidate(values, validators) {
  return function (key, value) {
    if (isOneOf([].concat(values))(key, value)) {
      return [].concat(validators).map(function (validator) {
        return validator(key, value)
      }).find(function (error) { return error })
    }
  }
}

function or() {
  var validators = Array.prototype.slice.call(arguments)
  return function (key, value) {
    var errors = validators.filter(function (validator) {
      return validator(key, value)
    })
    if (errors.length == validators.length) return errors[0]
  }
}

function exists(key, value) {
  if (value == undefined) {
    return key + " does not exist"
  }
}

function isString(key, value) {
  if (typeof value != "string") {
    return key + " must be a string"
  }
}

function isNumber(key, value) {
  if (typeof value != "number") {
    return key + " must be a number"
  }
}

function isOneOf(options) {
  return function (key, value) {
    var match = options.find(function (option) {
      return value === option
    })
    if (typeof match == "undefined") {
      return key + " must be one of " + options.map(function (option) {
        return option + "" 
      }).join(", ")
    }
  }
}

function isEqualTo(_value) {
  return function (key, value) {
    if (_value != value) {
      return key + " must equal " + _value
    }
  }
}

function isLessThan(_value) {
  return function (key, value) {
    if (_value < value) {
      return key + " must be less than " + _value
    }
  }
}

function isGreaterThan(_value) {
  return function (key, value) {
    if (_value > value) {
      return key + " must be greater than " + _value
    }
  }
}
