var FOLDER_PATH = '/' + DEFAULT_DIR
var FILE_PATH = '/' + DEFAULT_DIR + '/' + DEFAULT_FILE

function init(forceReload) {
  return new Promise(function (resolve, reject) {
    listOrCreateFolder(FOLDER_PATH, forceReload)
      .then(function (entries) {
        var entry = entries.find(function (entry) {
          return entry.path_lower == FILE_PATH
        })
        if (!entry) {
          var file = {
            path: FILE_PATH,
            data: {}
          }
          uploadFile(file)
            .then(function (response) {
              downloadFile(FILE_PATH, forceReload).then(resolve)
            })
        } else {
          downloadFile(FILE_PATH, forceReload).then(resolve)
        }
      })
  })
}

// init().then(function (file) {
//   console.log("file", file)
//   var container = document.getElementById("app")
//   container.innerHTML = createHTML(table(new Date(), file.data.categories.items, file.data.debits.items))
// })

var generatedData = stubDataGenerator().data
var container = document.getElementById("app")
// container.appendChild(createHTML(table(new Date(), generatedData.categories.items, generatedData.debits.items)).el)
container.appendChild(DOM.create(table({
  month: new Date(),
  categories: generatedData.categories.items,
  items: generatedData.debits.items
})).el)

/*
 * Thoughts: 
 * - Link a source to debits. Only certian sources can be used for cetain expenses...
 *
 *
 */

