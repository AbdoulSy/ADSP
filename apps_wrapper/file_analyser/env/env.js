var dev =  {
  database: "Documents", // Each connection can specify its own database
  host: "localhost",     // The host against which queries will be run
  port: 8000,            // By default port 8000 accepts Client API requests
  user: "writer",        // Our newly-created user with at least the rest-writer role
  password: "stupid password",  // writer's password
  authType: "DIGEST"     // The default auth
};

// Another connection. Change the module.exports below to
// use it without having to change consuming code.
var test =  {
  database: "Documents",
  host: "acceptance.example.com",
  port: 9116,
  user: "app-writer",
  password: "********",
  authType: "DIGEST"
};

var triple = {
  database: "adsp-db", // Each connection can specify its own database
  host: "localhost",     // The host against which queries will be run
  port: 8000,            // By default port 8000 accepts Client API requests
  user: "writer",        // Our newly-created user with at least the rest-writer role
  password: "stupid password",  // writer's password
  authType: "DIGEST"     // The default auth
};

module.exports = {
  connection: dev,       // Export the development connection
  triple: triple
};