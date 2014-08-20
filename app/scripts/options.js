'use strict';

var submitButton = document.getElementById('submit');
submitButton.addEventListener('click', saveChanges);

chrome.storage.sync.get('yoUsername', function(data){
  console.log("GET:", data.yoUsername);
  document.getElementById('currentUser').innerHTML = data.yoUsername;
});

function saveChanges() {
  console.log('saving...');
  // Get a value saved in a form.
  var yoUsername = document.getElementById('yoUsername').value.toUpperCase();
  // Check that there's some code there.
  if (!yoUsername) {
    message('Error: No value specified');
    return;
  }
  // Save it using the Chrome extension storage API.
  chrome.storage.sync.set({'yoUsername': yoUsername}, function() {
    console.log('SET:', {'yoUsername': yoUsername});
    document.getElementById('currentUser').innerHTML = yoUsername;
    // Notify that we saved.
    message('Settings saved');
  });

  // Send username to Heroku app
  var req = new XMLHttpRequest();
  req.open("GET", 'http://yoshervinshaikh.herokuapp.com/?username=' + yoUsername + '&extension=yes', false);
  req.send(null);
  console.log(req.responseText);
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
  console.log("Changes", changes);
  if(changes['yoUsername'] !== null){
    document.getElementById('currentUser').innerHTML = changes['yoUsername'].newValue;
    console.warn("Username changed from:", changes['yoUsername'].oldValue + ", to:", changes['yoUsername'].newValue);
  }
});