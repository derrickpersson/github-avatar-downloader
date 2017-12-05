var request = require('request');
var token = require('./secrets.js');
var fs = require('fs');

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
    console.log('Downloads Finished!');
  })
};

var repoOwner = process.argv[2];
var repoName = process.argv[3];

getRepoContributors(repoOwner, repoName, function(err, body){
  if(!repoOwner || !repoName){
    console.log("Please input a RepoOwner and RepoName");
    return false;
  }
  if(err){
    console.log("Errors: ", err);
    return false;
  }
  body.forEach(function(item){
    var filePath = "./avatars/" + item.login + ".jpg";
    downloadImageByURL(item.avatar_url, filePath);
  });
})

function downloadImageByURL(URL, filePath){

  // Take URL
  // Make a 'get' request
  request.get(URL)
         .on('error', function(err){
          console.log(err);
         })
  // Save file to a file path location
         .pipe(fs.createWriteStream(filePath));
};