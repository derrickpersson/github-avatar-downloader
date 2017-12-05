// Requiring these basic packages:
//  Request => allows us to make requests to APIs
//  Token => own private token (please use your own)
//  fs => FileStructure to write/read files
//  DotEnv => secure secret file

require('dotenv').config();
var request = require('request');
var fs = require('fs');

// Main function:
// Takes the repoOwner as string
//           repoName as string
//           cb as callback function
// Will download all the contributors' avatar profiles to a folder called 'avatars'
// within the current directory

function getRepoContributors(repoOwner, repoName, cb){

  // You will need your own token to run this, as it requries authorization. (Technically not required, but to make additional requests
  // you need to be authorized)

  var options = {
    url : "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent' : 'request',
      "Authorization" : "token " + process.env.GITHUB_TOKEN,
      },
    json : true
  }

// Request is made here to GitHub

  request(options, function(err, response, body){
    cb(err, body);

// Notification to user that the program has finished running. If adjusting this program for additional
// use cases, ideal to change out the below console.log.

  })
};

var repoOwner = process.argv[2];
var repoName = process.argv[3];

  // If repoOwner OR repoName are blank (i.e. undefined)
  // Then output an error message asking for a RepoOwner and RepoName.

  if(!repoOwner || !repoName){
    console.log("Please input a RepoOwner and RepoName");
    return process.exit(1);
  }

getRepoContributors(repoOwner, repoName, function(err, contributors){

  // If receiving an error from the request, console.log the error.

  if(err){
    console.log("Errors: ", err);
    return false;
  }

  // Check if Contributors is an array.

  if(!Array.isArray(contributors)){
    return false;
  };

  // For each item within the body download the image

  contributors.forEach(function(contributor){
    downloadImageByURL(contributor.avatar_url, "./avatars/" + contributor.login + ".jpg");
  });

    console.log('Downloads Finished!');
})

function downloadImageByURL(URL, filePath){

  // Take URL & make a 'get' request

  request.get(URL)
         .pipe(fs.createWriteStream(filePath))
         .on('error', function(err){
          console.log(err);
         });

};