Imagine the programming of the future.
Think that now, a developer can do the work of 1000s of people with much less efforts than 20 years ago.
And that always was the trend, a company goes ahead of the curve once they can achieve as much as other companies with
less resources and less efforts.
Just Recently, developers started having the name DevOps, because they developped applications that could manage the operations with simple programming.
Companies Have gained a significant amount of time using devOps rather than only devs and only ops, and they gain money by hiring less people.

Now Let's project this pattern in the future. what would be the limit of efficiency a company could have.
A single developer producing as much as a company, where even the project management becomes embedded and unoptrusive to the creativity of such person.
where the sum of people working on a project would produce exponentially.

ADSP is a step towards that,
ADSP is a step towards devMagement.

Imagine a director/ projet manager/ developer writing on a special notepad.

For my Project: at this milestone,
I want an application in es6, with css3, and graphs
that will CRUD articles to be shown in a blog with a api in golang manageable by an admin
using the latest standards
I want Abdoul, Chris, Thirsten to work on it.
The performanes should be great when reading articles.
I hope the project will will be done on the 23rd.

And just before your eyes, a board will be generated, handling the commits and file changes
where reports of the progress could be easily shown, how far are you from the best es6, css3, and graph standards.
with security and time management for all three people, where these people will just have to create code on directories,
not even worry about the commits messages, and just by following the automatically generated cards -> just like a game.
the application will become more and more complex in some parts, but the developer will have free choice in creating its code.
and ultimately when the dashboard shows green everywhere the application is complete.


How to do it
=============

Using a fact extraction classifier like Smartlogic
the sentences inputted will be analysed along with our ADSP Ontology,
with these facts
the results of the classification stored in marklogic could be analysed by ADSP with SPARQL queries to create new Environment variables and will generate :
- A Web dashboard
- A nodeJs server to be downloaded locally
- Several Marklogic Databases with forests included
- A jsonld card to be stored locally for credentials

(at the moment I'm doing this locally, as I don't have fact extraction)

Every input to the system will be either a commit, or a file change (the process is continuous and local)
For each commit:
- the directory tree, will be saved for changes
- for each code file, the comments will be analysed, along with a doc parsing where testing and code coverage are added
- the application depending on the conventions will generate cards
    - if the file is empty
    - if the file is not documented enough
    - if the coverage of test is not enough
    - if the file's code is not clean enough for production
- at the same time the TODO comments will be pulled and analysed and generate cards
- todos could be mapped to test results (even if they don't exist yet) and automatically be solved
- for all those generated cards, they will resolve themselves with commits and store new actions in a Monthly Reporter

- For the dashboard, the files will be classified with something like scikit-learn, to determine, a working application
- work in progress, broken file, invalid conventions, eventual problem
- if possible a prediction algorithm could do predictions on the time completion depending on the current, and previous classifications
- the system will also measure the velocity of the team people and affect a score, like in a game
- and will be able to show visualisations
- last but not least. all generated code will be stored as a Marklogic document, and linked to our Dashboard search bar
where you could type a concept, and find Todos in a function/file . or find the files talking about a concept or a problem
and using a visualisation you could find all the related documentations, articles and tutorials talking about the resolution of the problem before you even type a line of code
through previous project and the initial seed.

Looks like science Fiction.
Well at 50 % it is - remember this is only a two/three week demo application but if approved I will contnue working on it.




All of this in an unobtrusive manner, only for main-production will problems block a total commit.
