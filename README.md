# ADSP: Application Development Surveillance Platform. (Spike, work in progress)
###############


### The Idea :
 Technologies that can make machines understand the data and it's meaning have emerged
 and the complexity of developping these higly abstract concepts can be daunting, especially when working on
 everything at the same time.
 Let's leverage this new suite of technologies to help teams create project from the Abstract way downwards to help
 teams focus on the business logic, without having to worry about details that can slip up.
 
### Why ? :
 It is very hard for developers, the more skills and hats you wear, the harder it is to fully concentrate on anything really.
People thing about ideas, are not confident about their code as it might get thrown away later in the future, or everything might change.
Problems galore with delivering a good quality code, and it sometimes breaks an entire chain of code production.
To reduce strain in producing code, we need to take examples on big companies (like toyota) that created factories, where every piece of car that needed to be worked on, arrived at the correct time to the correct person, making the person think solely on doing a single thing on a single piece at the time, maximizing the production.
I'm trying to do the same thing but with computer programs, provide the piece of code that needs to be worked on at the right time and the right place to produce a good quality code.

### How :
 This Repository has several applications pathed together, that would be split in a docker container.
 The first application is a *node.js* script that runs through a project directory and produce a dataset of all the files that are inside or should be inside.
 The second application is a *node.js* script that issues *SPARQL Queries* to Marklogic to extract metadata from the first node script.
 The third application is a Machine Learning application with a classifier in Python with skilearn and Tensorflow, classifying data (generated with the node scripts) with a decision tree.
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

## The Front-End Interface


### Phoenix Trello by [@bigardone](https://github.com/bigardone/phoenix-trello) 
[![Build Status](https://travis-ci.org/bigardone/phoenix-trello.svg?branch=master)](https://travis-ci.org/bigardone/phoenix-trello)


[Trello](http://trello.com) tribute done with [Elixir](https://github.com/elixir-lang/elixir), [Phoenix Framework](https://github.com/phoenixframework/phoenix), [Webpack](https://github.com/webpack/webpack), [React](https://github.com/facebook/react) and [Redux](https://github.com/rackt/redux).

![`board`](http://codeloveandboards.com/images/blog/trello_tribute_pt_1/sign-in-a8fa19da.jpg)


## The Ontology
 I've written the ontology using Protégé, the ontology is a set of RDF Triples written both in jsonld and in turtle, through protege's interface :

[Imgur Generated Protege img](http://i.imgur.com/PGzv4Jn.png)


### Requirements
You need to have **Elixir v1.3** and **PostgreSQL** installed.
You also need marklogic installed.

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
    :Contact :has_phone_number :Abdoul_Phone_Numbers .
    
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
To start your Phoenix Trello app:

  1. Install dependencies with `mix deps.get`
  2. Ensure webpack is installed. ie: `npm install -g webpack`
  3. Install npm packages with `npm install`
  4. Create and migrate your database with `mix ecto.create && mix ecto.migrate`
  5. Run seeds to create demo user with `mix run priv/repo/seeds.exs`
  6. Start Phoenix endpoint with `mix phoenix.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Enjoy!

### Testing
Integration tests with [Hound](https://github.com/HashNuke/hound) and [Selenium ChromeDriver](https://github.com/SeleniumHQ/selenium/wiki/ChromeDriver). Instructions:

  1. Install **ChromeDriver** with `npm install -g chromedriver`
  2. Run **ChromeDriver** in a new terminal window with `chromedriver &`
  3. Run tests with `mix test`

If you don't want to run integration tests just run `mix test --exclude integration`.

### License

See [LICENSE](LICENSE).
