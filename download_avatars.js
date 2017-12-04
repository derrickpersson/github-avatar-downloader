var request = require('request');

function getRepoContributors(repoOwner, repoName, cb){

};

getRepoContributors("jquery", "jquery", function(err, result){
  console.log("Errors: ", err);
  console.log("Result: ", result);
})