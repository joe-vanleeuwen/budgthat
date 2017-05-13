function table(month, categories, items) {
  return {
    tag: "table",
    styles: {
      minWidth: "100%",
    },
    children: [{
      tag: "thead",
      children: [{
        tag: "tr",
        children: [{
          tag: "th",
          value: MONTH_NAMES[month.getMonth()]
        }].concat(
          categories.map(function(category) {
            return {
              tag: "th",
              value: category.name,
              styles: {
                backgroundColor: category.color
              }
            }
          })
        )
      }]
    }, {
      tag: "tbody",
      children: listDaysForMonth(month).map(function (day) {
        return {
          tag: "tr",
          children: [{
            tag: "td",
            value: day.getDate(),
          }].concat(
            group(categories, items, sortByDay).map(function (item) {
              var items = item.find(function (items) {
                return items.date.getTime() == day.getTime()
              })
              return {
                tag: "td",
                children: items && items.items.map(debit)
              }
            })
          )
        }
      })
    }]
  }
}