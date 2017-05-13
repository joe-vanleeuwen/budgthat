function stubDataGenerator() {
  var file = {data: {}}
  var categoryNames = ["Groceries", "Shopping", "House", "Medical", "Hobbies", "Vacation", "Auto"]
  var colors = ["red", "green", "blue", "cyan", "purple", "orange", "yellow"]
  categoryNames.forEach(function (categoryName, i) {
    createCategory(file, {
      name: categoryName,
      budget: getRandom(50, 400),
      percentage: null,
      payoff: null,
      order: i,
      color: colors[getRandom(0, colors.length)]
    })
  })
  ;(new Array(file.data.categories.items.length * 1)).fill().forEach(function (item) {
    createDebit(file, {
      name: "Coming soon",
      amount: getRandom(1, 300),
      category: getRandom(0, file.data.categories.items.length + 1),
      date: (new Date(2017, 4, getRandom(1, 32))).toISOString(),
      recurring: null
    })
  })
  return file
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


file = {
  data: JSON.parse('{"categories":{"count":2,"items":[{"id":1,"name":"Shopping","percentage":0,"budget":50,"balance":50,"color":"yellow","archived_time":null},{"id":2,"name":"Shopping","percentage":0,"budget":50,"balance":50,"color":"yellow","archived_time":null}]},"debits":{"count":2,"items":[{"name":"Plants","amount":29.46,"location":"","category":1,"recurring":"monthly"},{"name":"food","amount":23.21,"category":1,"date":"2017-05-05T15:15:51.206Z","recurring":null}]}}')
}




// in categories ->
//  id :: Number :: duh
//  name :: String :: name of category
//  percentage :: Number :: percent of <interval[weekly, biweekly, monthly, etc...]> income
//  allowance :: Number :: hard dollar amount (prefer allowance over percentage when present)
//  balance :: Number :: positive or negative number (dynamice, or calculated when category is updated?)
//  color :: String :: a hex or rgb

// in debits ->
//  amount :: Number :: positive number
//  name :: String :: name of debit
//  location :: String :: where debit took place
//  category :: Number :: ID (or object reference?) of category
//  type :: Number :: (optional) id of a preset type of debit
//  date :: String :: when the debit occurred
//  recurring :: String :: options are daily, weekly, biweekly, monthly, semiannually, annually if this debit is recurring (i.e. a fixed amount every week) this will be used to calculate beginning and frequency of debit

// in credits ->
//  amount :: Number :: positive number
//  name :: String :: name of credit
//  date :: String :: when the credit occurred
//  recurring :: String :: options are daily, weekly, biweekly, monthly, semiannually, annually if this credit is recurring (i.e. a fixed amount every week) this will be used to calculate frequency of credit after date