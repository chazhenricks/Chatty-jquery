// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB06_2wSIRanpudSgeDEEFlJkOmXunD58E",
    authDomain: "kachatstrophe.firebaseapp.com",
    databaseURL: "https://kachatstrophe.firebaseio.com",
    projectId: "kachatstrophe",
    storageBucket: "kachatstrophe.appspot.com",
    messagingSenderId: "871012873861"
  };
  firebase.initializeApp(config);

$(document).ready(function() {
    $('select').material_select();
  });

$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });

console.log("main.js loaded");


Chatty.xhrfunction();

