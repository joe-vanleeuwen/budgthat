dbx = new Dropbox({accessToken: PERSONAL_DROPBOX_ACCESS_TOKEN})

listOrCreateFolder = cacheResponse(function (path) {
  return new Promise(function (resolve, reject) {
    dbx.filesListFolder({path: path})
      .then(function(response) {
        resolve(response.entries)
      })
      .catch(function(error) {
        if (error.status == 409) { // path/not_folder/
          dbx.filesCreateFolder({path: path, autorename: true})
            .then(function (response) {
              resolve(listOrCreateFolder(path, true))
            })
            .catch(function (error) {
              console.log("error", error)
            })
        }
      });
  })
})

downloadFile = cacheResponse(function (path) {
  return new Promise(function (resolve, reject) {
    dbx.filesDownload({path: path})
      .then(function(response) {
        var reader = new FileReader();
        reader.addEventListener("loadend", function(e) {
          return resolve({
            path: response.path_lower,
            data: JSON.parse(e.srcElement.result)
          })
        });
        reader.readAsText(response.fileBlob);
      })
  })
})

function uploadFile(file) {
  return new Promise(function (resolve, reject) {
    if (file.data) {
      // TODO: Check for if we aren't overriding??
      // TODO: Create backup file on Dropbox?
      var params = {
        contents: JSON.stringify(file.data),
        path: file.path,
        mode: {'.tag': 'overwrite'},
        autorename: false,
        client_modified: (new Date()).toISOString().split(".")[0]+"Z", // don't ask me...
        mute: true
      }
      dbx.filesUpload(params)
        .then(resolve)
        .catch(reject)
    } else {
      reject(new Error("No data to upload"))
    }
  })
}

function createCategory(file, category) {
  errors = validate(category,
    ["name", exists, isString],
    ["budget", exists, isNumber],
    ["percentage", conditonallyValidate(null, [isNumber, or(isGreaterThan(0), isLessThan(1), isOneOf([0,1]))])],
    ["budget", exists, isNumber, isGreaterThan(0)],
    ["payoff", conditonallyValidate(null, [isNumber, isGreaterThan(0)])],
    ["order", exists, isNumber]
    // TODO: payoff_function to calculate interest?
    // TODO: validate color?
  )
  if (errors.length) {
    errors.forEach(function (error) { throw new Error(error) })
  }

  if (!file.data.categories) {
    file.data.categories = {
      count: 0,
      items: []
    }
  }
  file.data.categories.count++
  file.data.categories.items.push(Object.assign({}, {
    id: file.data.categories.count,
  }, category))

  // TODO: do defaults
  // _.defaults({
  //   id: file.data.categories.count,
  //   archived_time: null,
  //   percentage: 0,
  //   balance: category.budget,
  //   color: "#eee", // TODO: select random color
  //   payoff: null,
  // }, category)

  return file
}

function createDebit(file, debit) {
  errors = validate(debit,
    ["name", exists, isString],
    ["amount", exists, isNumber],
    ["category", exists, isNumber],
    ["date", exists, isString],
    ["recurring", conditonallyValidate(null, isOneOf(RECURRING_INTERVALS))]
  )

  if (errors.length) {
    throw new Error(errors[0])
  }

  if (!file.data.debits) {
    file.data.debits = {
      count: 0,
      items: []
    }
  }
  file.data.debits.count++
  file.data.debits.items.push(debit)
  // TODO: add debit function
  return file
}

