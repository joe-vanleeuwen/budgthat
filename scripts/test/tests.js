testData = [
  {
    draft: {
      tag: "table",
      children: [{
        tag: "thead",
      }]
    },
    expects: "<table><thead></thead></table>"
  },
  {
    draft: {
      tag: "table",
      children: [{
        tag: "thead",
        value: "Hello"
      }]
    },
    expects: "<table><thead>Hello</thead></table>"
  },
  {
    draft: {
      tag: "table",
      children: [{
        tag: "thead",
        children: [
          {
            tag: "th",
          },
        ],
      }]
    },
    expects: "<table><thead><th></th></thead></table>"
  },
  {
    draft: {
      tag: "table",
      children: [{
        tag: "thead",
        children: [
          {
            tag: "th",
          },
          {
            tag: "th",
          }
        ],
      }]
    },
    expects: "<table><thead><th></th><th></th></thead></table>"
  },
  {
    draft: {
      tag: "table",
      children: [{
        tag: "thead",
        children: [
          {
            tag: "th",
          },
          {
            tag: "th",
            value: "Groceries"
          }
        ],
      }, {
        tag: "tbody",
        children: [
          {
            tag: "tr",
          }
        ]
      }]
    },
    expects: "<table><thead><th></th><th>Groceries</th></thead><tbody><tr></tr></tbody></table>"
  }
]


function testCreateHTML(testData) {
  var failed = testData.find(function (data) {
    return data.expects != createHTML(data.draft).el.outerHTML
  })
  window.failed = failed
  console.log("failed", failed)
  if (failed) {
    console.log("------------ Expected ------------")
    console.log(createHTML(failed.draft))
    console.log("------------ To Equal ------------")
    console.log(failed.expects)
  }
}

testCreateHTML(testData)