# ADSP: Application Development Surveillance Platform. (Spike, work in progress)
###############


### The Idea:
 Technologies that can make machines understand the data and it's meaning have emerged
 and the complexity of developping these higly abstract concepts can be daunting, especially when working on
 everything at the same time.
 Let's leverage this new suite of technologies to help teams create project from the Abstract way downwards to help
 teams focus on the business logic, without having to worry about details that can slip up.

### How:
 Using a little bit of Web Semantics (and later on AI) technologies.
 Such as RDF Reasoning in turtle and Marklogic as a triple store, a web assets analyser in node and Perl, 
 and a Modified Trello clone in Phoenix as a Front End, the App should be Able to suggest at any time, what to do next,
 Who should do it if available, and resolves itself when the code is conform to the task's rules.

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
