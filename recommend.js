// Given a target repo
// Request a list of all contributors for that repo
// For each contributor - track which repo's they have starred.
// Tally which repo has the most stars
// Return the top 5 repos

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

function getRepoRecommendations(repoOwner, repoName, cb){

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

getRepoRecommendations("lighthouse-labs", "laser_shark", function(err, contributors){
  if(err){
    console.error(err);
  };

  var results = {};
  var count = 0;
  var total = 0;
  var allPromises = [];

  contributors.forEach(function(value, index, array){
    var options = {
      url : value.starred_url.slice(0, -15),
      headers: {
      'User-Agent' : 'request',
      "Authorization" : "token " + process.env.GITHUB_TOKEN,
      },
      json : true
    }
    // console.log(options);
    var requestPromise = request(options);

    allPromises.push(requestPromise);
  });

  Promise.all(allPromises).then(function(result){
    result.forEach(function(response){
      console.log(response);
    });
  });

  // if(count === total - 1){
  //   var sortable = Object.keys(results).sort(function(a, b){
  //     return results[a] - results[b];
  //   });
  //   // console.log(sortable);
  // }
  // return results;

});


function getData() {
  return Promise((resolve, reject) => {

  });
}

function getContribStars(url){
  const options = {
      url : value.starred_url.slice(0, -15),
      headers: {
      'User-Agent' : 'request',
      "Authorization" : "token " + process.env.GITHUB_TOKEN,
      },
      json : true
    };



  return new Promise(function(resolve, reject){


contributors.forEach(function(value, index, array){
    // console.log(options);
    var requestPromise = request(options);

    allPromises.push(requestPromise);

  });

}

// function(err, response, body){
//       body.forEach(function(value, index, array){
//         if(results[body[index].full_name]){
//           results[body[index].full_name] += 1;
//         }else{
//           results[body[index].full_name] = 1;
//         }
//         console.log(results);
//         count++;
//         total = array.length;