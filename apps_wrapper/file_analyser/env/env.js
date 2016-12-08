var dev =  {
  database: process.env.DOCUMENTS_DB_NAME, // Each connection can specify its own database
  host: process.env.DOCUMENTS_DB_HOST, // The host against which queries will be run
  port: process.env.DOCUMENTS_DB_PORT, // By default port 8000 accepts Client API requests
  user: process.env.DOCUMENTS_DB_USER, // Our newly-created user with at least the rest-writer role
  password: process.env.DOCUMENTS_DB_PASSWORD, // writer's password
  authType: process.env.DOCUMENTS_DB_AUTHTYPE // The default auth
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
  database: process.env.TRIPLE_DB_NAME, // Each connection can specify its own database
  host: process.env.TRIPLE_DB_HOST, // The host against which queries will be run
  port: process.env.TRIPLE_DB_ENV, // By default port 8000 accepts Client API requests
  user: process.env.TRIPLE_DB_USER, // Our newly-created user with at least the rest-writer role
  password: process.env.TRIPLE_DB_PASSWORD,// writer's password
  authType: process.env.TRIPLE_DB_AUTHTYPE // The default auth
};

module.exports = {
  connection: dev, // Export the development connection
  triple: triple
};
