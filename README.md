# Budgthat
A budgeting tool for personal finances using vanilla JS and a Dropbox JSON file as a backend.

### Why "Budgthat"?
Because no one will look at this repo so I don't need a good name. And because I like this awful name even though it's difficult to say and is stupid.  

### Dropbox
JS documentation: http://dropbox.github.io/dropbox-sdk-js/index.html

You'll need to create a new app: https://www.dropbox.com/developers/apps  
Make sure to generate an access token.

### settings.js
settings.js is ignored by git. This is where personal settings are currently stored.

Example settings.js file:
```
PERSONAL_DROPBOX_ACCESS_TOKEN = "***********************************************"
DEFAULT_DIR = "budgthat"
DEFAULT_FILE = "data.txt"
```

`PERSONAL_DROPBOX_ACCESS_TOKEN` is the generated access token for your app on Dropbox.  
`DEFAULT_DIR` is whatever name you want for the folder Budgthat will use.  
`DEFAULT_FILE` is whatever name you want for the file Budgthat will use as the JSON file.

There is no need to create the `DEFAULT_DIR` and `DEFAULT_FILE` on your app in Dropbox as Budgthat will automatically generate those based on the settings.js file.
