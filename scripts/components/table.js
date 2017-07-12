function table(props) {
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
          value: MONTH_NAMES[props.month.getMonth()]
        }].concat(
          props.categories.map(function(category) {
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
      children: listDaysForMonth(props.month).map(function (day) {
        return {
          tag: "tr",
          children: [{
            tag: "td",
            value: day.getDate(),
          }].concat(
            group(props.categories, props.items, sortByDay).map(function (item) {
              var items = item.find(function (items) {
                return items.date.getTime() == day.getTime()
              })
              return {
                tag: "td",
                children: [{
                  component: DebitForm,
                  handleClick: function (e) {
                      console.log("CLICKED!!", e)
                    }
                }].concat(items && items.items.map(function (item) {
                  return {
                    component: Debit,
                    item: item,
                    // category:
                  }
                }))
              }
            })
          )
        }
      })
    }]
  }
}