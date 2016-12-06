# ADSP: Application Development Surveillance Platform. (Spike, work in progress)
###############


### The Idea :
 Technologies that can make machines understand the data and its meaning have emerged
 and the complexity of developping these higly abstract concepts can be daunting, especially when working on
 everything at the same time.
 Let's leverage this new suite of technologies to help teams create project from the Abstract way downwards to help
 teams focus on the business logic, without having to worry about details that can slip up.

### Why ? :
 It is very hard for developers, the more skills and hats you wear, the harder it is to fully concentrate on anything really.
People thing about ideas, are not confident about their code as it might get thrown away later in the future, or everything might change.
Problems galore with delivering a good quality code, where time is wasted on testing for example, and it sometimes breaks an entire chain of code production.
To reduce strain in producing code, we need to take examples on big companies (like toyota) that created factories, where every piece of car that needed to be worked on, arrived at the correct time to the correct person, making the person think solely on doing a single thing on a single piece at the time, maximizing the production.
I'm trying to do the same thing but with computer programs, provide the piece of code that needs to be worked on at the right time and the right place to produce a good quality code.

### How :
 This Repository has several applications patched together, that would be split in a docker container.
 The first application is a *node.js* script that runs through a project directory and produce a dataset of all the files that are inside or should be inside.
 The second application is a *node.js* script that issues *SPARQL Queries* to Marklogic to extract metadata from the first node script.
 The third application is a Machine Learning application (Not yet implemented unfortunately) with a classifier in Python with skilearn and Tensorflow, classifying data (generated with the node scripts) with a decision tree.
 The current rules are as follows and can be combined.

 - empty project/file/directory
 - Test Driven Project/file
 - Behaviour Driven Project/file
 - Development Phase Project/file
 - Production Phase Project/file
 - Cleaning Phase Project/file
 - Commented File
 - Documented File
 - Owned File
 - Business Logic File
 - Pure Code File
 - Broken File
 - Broken Application
 - What's Next
 - Previous Task Completed

The Machine learning Application will keep watching files when a commit/file change is done, and will send the results both to it's own model to make its next predictions better, and to (Marklogic + Phoenix Trello) which will have lists and columns generated depending on the classification rules generated.

Lastly (Not yet implemented) a Game engine will read from the application heartbeat, git commit, or file save to make the user "see" the progress in a project.

## The Front-End Interface

### Go ADSP Web by [@abdoulsy](https://github.com/AbdoulSy/ADSP)
[![Build Status](https://travis-ci.org/bigardone/phoenix-trello.svg?branch=master)](https://travis-ci.org/bigardone/phoenix-trello)

![`board`](http://web.abdoulsy.eu/images/alpha.png)


## The Ontology
 I've written the ontology using Protégé, the ontology is a set of RDF Triples written both in jsonld and in turtle, through protege's interface :

![Imgur Generated Protege img](http://web.abdoulsy.eu/images/delta.png)


### Requirements

#### Native Install
You will need [Go](http://golang.org) Installed on your machine
With the GoPath updated to include this project
You will also need [Node.JS](http://nodejs.org) 6+ installed
You also need [Marklogic](http://marklogic.com) 8+ installed.

#### Using containers
You will need [Docker](http://docker.com) Installed along with Docker compose.
Just browse to the source code and run

    docker-compose up


### The Ontology
Using the : as main ADSP Prefix in a basic triple.

:ADSP rdfs:type :Project means (in RDF Triple):

<http://aria.abdoulsy.eu/Ontology/ADSP/Web_Project/0.0.1/#ADSP> http://www.w3.org/2000/01/rdf-schema#type <http://aria.abdoulsy.eu/Ontology/ADSP/Web_Project/0.0.1/#Project> .

Which means that *My definition* of *ADSP* has a *standard rdfs type* of *My definition* of Project.

I've created a Ontology (A Collection of triples such as this) That shall be populated with everything I know about web development and Team management, so that a program, through consulting a Triple Store with SPARQL Queries can ask the correct questions about the metadata generated from the code being watched.

#### Rules and Conventions

a :Project if :Versionned through :Git :has_conventions .
For Example,

    :ADSP :has_convention :Git_conventions;
          :has_convention :ES6_conventions;
          :has_convention :DRY_conventions;
          :has_convention :NPM_conventions .

    :ADSP :has_owner :Abdoul_Sy .
    :Abdoul_Sy rdfs:type :Team_Member .
    :Team_Member owl:SubclassOf :Contact .
    :Abdoul_Sys :has_phone_number :Abdoul_Phone_Numbers .

    :Error owl:SubClassOf :Problem .
    :Problem :must_be_sent_to :Team_Members .


as a related Example:

    :NPM_conventions :has_rule :must_have_package_json.
    :NPM_conventions :has_rule :must_have_test_script.

### How the system Works:

By Using the Ontology as unstructured Data base for intelligence gathering, I also have small script to generate metadata from actual Code files and Project directories, with a simple watcher for when a file changes.
The script will browse through a :Git_Convention Project and will fetch as much data as possible, from jshint and so forth, and will try and predict tasks that need to be done given the current state of the project.
I've modified the phoenix trello to be able to generate trello cards and lists given the results of the SPARQL queries I'm making with Madrklogic.


### Installation instructions
To start your ADSP app From your machine:
  0. clone the repository somewhere.
  1. Ensure your marklogic installation is working, the app is running
  2. go to the admin console and import the contents of ./apps_wrapper/management/marklogic (2 databases)
  3. Ensure the ADSP path is added to the go path
  4. Ensure node js is installed (try node -v)
  5. Browse to the ./apps_wrapper/file_analyser and run `npm install` in install the packages
  6. From ./apps_wrapper/file_analyser run node start
  7. Browse to ./apps_wrapper/go_apps/github.com/AbdoulSy/web folder and run `gulp serve` or `gulp watch` on development


Now you can visit [`localhost:8080`](http://localhost:8080) from your browser.

Enjoy!

### Testing
Not yet implemented;
will use Go Testing library for the go application
And mocha/chai/selenium to test the js application

### License

See [LICENSE](LICENSE).
