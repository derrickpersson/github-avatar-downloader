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
  })
};

// getRepoContributors("jquery", "jquery", function(err, body){
//   if(err){
//     console.log("Errors: ", err);
//     return false;
//   }
//   body.forEach(function(item){
//     console.log(item.avatar_url);
//   });
// })

function downloadImageByURL(URL, filePath){
  // Take URL
  // Make a 'get' request
  // Save file to a file path location
  request.get(URL)
         .on('error', function(err){
          console.log(err);
         })
         .pipe(fs.createWriteStream(filePath));
};

downloadImageByURL("https://avatars1.githubusercontent.com/u/43004?v=4", "./avatars/test.png")