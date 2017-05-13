function getRecurring (date, interval) {
  _date = new Date(date)
  switch (interval) {
    case "daily": return new Date(_date.setDate(_date.getDate() + 1))
    case "weekly": return new Date(_date.setDate(_date.getDate() + 7))
    case "biweekly": return new Date(_date.setDate(_date.getDate() + 14))
    case "monthly": return new Date(_date.setMonth(_date.getMonth() + 1))
    case "semiannually": return new Date(_date.setMonth(_date.getMonth() + 6))
    case "annually": return new Date(_date.setMonth(_date.getMonth() + 12))
  }
  throw new Error(interval + " is not a valid interval")
}

function cacheResponse(fn) {
  var cache = {}
  CACHES.push(cache)
  return function (path, forceReload) {
    return cache[path] = !forceReload && cache[path] || fn(path)
  }
}

function clearCache() {
  CACHES.forEach(function (cache) {
    for (var key in cache) delete cache[key];
  })
}

// function group(categories, items, sortMethod) {
//   return sortMethod(items).map(function (interval) {
//     return Object.assign({}, interval, {
//       sum: sumItems(interval.items),
//       items: filterByCategory(categories, interval.items).map(function (items) {
//         return Object.assign({}, items, {
//           sum: sumItems(items.items)
//         })
//       })
//     })
//   }).sort(function (a, b) {
//     return a.date.getTime() >= b.date.getTime()
//   })
// }

function group(categories, items, sortMethod) {
  return categories.map(function (category) {
    return sortMethod(items.filter(function (item) {
      return item.category == category.id
    }))
  })
}

function filterByCategory(categories, items) {
  return categories.map(function (category) {
    return {
      category: category,
      items: items.filter(function (item) {
        return item.category == category.id;
      })
    }
  })
}

function sortByDate(items, getDate, dates) {
  var item = items[0]
  items = items.slice(1)
  dates = dates.slice()
  if (!item) {
    return dates
  }

  var date = getDate(item.date)
  var month = dates.find(function (month) {
    return month.date.getTime() == date.getTime()
  })

  if (month) {
    month.items.push(item)
  } else {
    dates.push({
      date: date,
      items: [item]
    })
  }
  return sortByDate(items, getDate, dates)
}

function getMonthDate(date) {
  return (new Date((new Date(date)).getFullYear(), (new Date(date)).getMonth()))
}

function getDayDate(date) {
  return (new Date((new Date(date)).getFullYear(), (new Date(date)).getMonth(), (new Date(date)).getDate()))
}

// TODO: bad practice to partially apply a fn with a mutating param
// although slicing the array within the applied function works
sortByMonth = _.partialRight(sortByDate, getMonthDate, [])
sortByDay = _.partialRight(sortByDate, getDayDate, [])

function listDaysForMonth(date) {
  var month, day, days, i
  month = day = getMonthDate(date)
  days = []
  i = 1
  while (month.getMonth() == day.getMonth()) {
    days.push(day)
    day = new Date(getDayDate(month).setDate(i+=1))
  }
  return days
}

function calcDebits(categories, items) {
  return filterByCategory(categories, items).map(function (items) {
    return sumItems(items)
  })
}

function sumItems(items) {
  return items.reduce(function (m,n) {
    return m+n.amount;
  }, 0)
}

function orderCategories(categories) {
  return categories.sort(function (a, b) {
    return a >= b
  })
}