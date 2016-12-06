# ADSP: File Analyser Folder
###############


### The Folder :
 This Folder Holds node.js scripts along with an express server
 All that necessary to do full reflexion on a project files

### The Contents :
 - Bin/
    Most of the js scripts are located in this folder
 - Config/
    This folder should be use to configurate the applications, it is not used at the moment
- env/
    This env file is the bare minimum to issue a marklogic connection, it holds the credentials and the database to use
- Node Modules (node_modules)/
    This is a node_modules file to install all dependencies
- Out/
    The Default folder where the documentation is generated
- Dockerfile
    The Dockerfile necessary to deploy the express server as a standalone container or meant to be used in a docker compose manner
- index.js
    The entry point for the express server, this is the file executed when running node start
- meta.json
    A file downloaded when creating an ADSP Session for the system to effectively and securely track the progress of the person (not implemented)
- package.json
    The packagse.json file
