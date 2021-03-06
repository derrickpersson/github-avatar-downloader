// Requiring these basic packages:
//  Request => allows us to make requests to APIs
//  Token => own private token (please use your own)
//  fs => FileStructure to write/read files
//  DotEnv => secure secret file

require('dotenv').config();
var request = require('request');
var fs = require('fs');
var mkdirp = require('mkdirp');

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
    if(body.message === 'Not Found'){
      console.log("Incorrect repoOwner or repoName");
      return false;
    }else if(body.message === "Bad credentials"){
      console.log("Please check your GitHub token credentials and try again.");
      return false;
    }
    cb(err, body);

// Notification to user that the program has finished running. If adjusting this program for additional
// use cases, ideal to change out the below console.log.

  })
};

var repoOwner = process.argv[2];
var repoName = process.argv[3];

  // First condition checks for if repoOwner OR repoName are blank (i.e. undefined)
  // Then output an error message asking for a RepoOwner and RepoName.
  // Second condition checks if they have given more than 2 inputs.
  // Third condition checks for the .env file to ensure it has been configured correctly.

  if(!repoOwner || !repoName){
    console.log("Please input a RepoOwner and RepoName");
    return process.exit(1);
  }else if(process.argv.slice(2).length > 2){
    console.log("Please check your number of inputs and try again");
    return process.exit(1);
  }else if(!process.env.GITHUB_TOKEN){
    console.log("Please ensure you have set up your Github token in your .env file");
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
    mkdirp('./avatars', function(err){
      if(err){
        console.error(err);
      }
    });
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