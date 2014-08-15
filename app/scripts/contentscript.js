'use strict';

console.log('Content script!');

var username = null;
checkForParticipants();

chrome.storage.sync.get('yoUsername', function(data){
  // console.log("GET:", data.yoUsername);
  username = data.yoUsername;
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  console.log("Changes", changes);
  if(changes['yoUsername'] !== null){
    username = changes['yoUsername'].newValue;
    console.warn("Username changed from:", changes['yoUsername'].oldValue + ", to:", username);
  }
});

function checkForParticipants(){
  var numParticipants = document.getElementsByClassName('participants').length;
  if(numParticipants === 0){
    setTimeout(checkForParticipants, 100);
  } else if(username !== undefined){
    console.log("Someone joined! Sending a YO to", username);

    //curl --data "api_token=b9592bb7-8505-d615-160b-a2dcbf818449&username=sherv8" http://api.justyo.co/yo/
    var request = new XMLHttpRequest();
    request.open("POST", 'http://api.justyo.co/yo/', false);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send('api_token=b9592bb7-8505-d615-160b-a2dcbf818449&username=' + username);
    console.log(request.responseText);
  }
}