/* jshint esversion: 6 */
var Git = require('nodegit');
module.exports = function(callback) {
  var res = [];

  // Open the repository directory.
  Git.Repository.open('../../.git')
  // Open the master branch.
  .then(function(repo) {
    return repo.getMasterCommit();
  })
  // Display information about commits on master.
  .then(function(firstCommitOnMaster) {
    // Create a new history event emitter.
    var history = firstCommitOnMaster.history();

    // Create a counter to only show up to 9 entries.
    var count = 0;

    // Listen for commit events from the history.
    history.on('commit', function(commit) {
      // Disregard commits past 9.
      if (++count >= 9) {
        callback(res);
        return;
      }

      let cm = {
        sha: commit.sha(),
        author: author.name() + ' <' + author.email() + '>',
        date: commit.date(),
        message: commit.message(),
      };


      res.push(cm);
    });



    // Start emitting events.
    history.start();
  });
};

