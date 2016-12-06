# ADSP: Apps Wrapper Folder
###############


### The Folder :
 This Folder Holds Apps, The apps inside could be served from anywhere they will communicate with each other through API calls
 Do try and create as many small apps that can be described in one sentence, have a clear input and a clear output. try to prevent any side effects

### The Contents :
 - File Analyser (file_analyser)
    This is a small express.js server launching script from api calls, the server is set up to listen to its own code right now.
 - Go Apps (go_apps)
    This folder holds the source code, the libraries and the package binaries necessary for the ADSP web Go app
    The structure mimics the one you would usually find in a GOPATH folder
- Management
    All the metadata, the database and forest dumps, the ontologies, and the classification stuff are in there, this folder is one of the least structured folders
