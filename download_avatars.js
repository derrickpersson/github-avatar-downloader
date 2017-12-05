var request = require('request');
var token = require('./secrets.js');

function getRepoContributors(repoOwner, repoName, cb){
  var options = {
    url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent' : 'request'
      },
    Authorization : token,
    json : true
  }

  request(options, function(err, response, body){
    cb(err, body);
  })
};

getRepoContributors("jquery", "jquery", function(err, body){
  if(err){
    console.log("Errors: ", err);
    return false;
  }
  body.forEach(function(item){
    console.log(item.avatar_url);
  });
})