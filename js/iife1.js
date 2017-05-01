console.log("iife1");


var Chatty = (function(chatapp){

    var messagesArray = [];

    chatapp.xhrfunction = function (){
        var loadMessages = new XMLHttpRequest();
        loadMessages.open("GET", "startMessages.JSON");
        loadMessages.send();
        loadMessages.addEventListener("load", function(event){
        messagesArray = JSON.parse(event.target.responseText).messages;
        console.log("messagesArray", messagesArray);
        Chatty.writeToDom();
        });
    }


    //To get array - run Chatty.getMessages();
    chatapp.getMessages = function(){
        return messagesArray;
    };

    chatapp.addMessages = function(message){
        messagesArray.push(message);
    }

    chatapp.deleteMessages = function(index){
        messagesArray.splice(index, 1);
    }

    return chatapp;

})(Chatty || {});




