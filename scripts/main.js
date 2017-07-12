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

// target = document.getElementById("app")
// var observer = new MutationObserver(function(mutations) {
//   mutations.forEach(function(mutation) {
//     console.log(mutation.type, mutation);
//   });    
// });

// var config = { attributes: true, childList: true, characterData: true, subtree: true };
 
// // pass in the target node, as well as the observer options
// observer.observe(target, config);

// init().then(function (file) {
//   console.log("file", file)
//   var container = document.getElementById("app")
//   container.innerHTML = createHTML(table(new Date(), file.data.categories.items, file.data.debits.items))
// })

var generatedData = stubDataGenerator().data

DOM.create({
  el: document.getElementById("app"),
  children: [
    table({
      month: new Date(),
      categories: generatedData.categories.items,
      items: generatedData.debits.items
    })
  ]
})._render()



/*
 * Thoughts: 
 * - Link a source to debits. Only certian sources can be used for cetain expenses...
 */

