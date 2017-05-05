console.log("iife1");


var Chatty = (function(chatapp){
    var messagesArray = [];
    var datesArray = [];
    var usersArray = [];
    var pushData = function(JSONarray) {
        for (var i=0; i< JSONarray.length;i++){
            messagesArray.push(JSONarray[i].text);
            datesArray.push(Chatty.setDate());
            usersArray.push(JSONarray[i].user);
        }
    }

    chatapp.xhrfunction = function (){

        $.ajax({
            url:"https://kachatstrophe.firebaseio.com/messages.json",
        })
        .done(pushData)
        .done(Chatty.enterKeyPress)
        .done(Chatty.writeToDom)
        .done(Chatty.defaultListeners)
        .done(Chatty.optionsView)
        .done(Chatty.chatView);


        // var loadMessages = new XMLHttpRequest();
        // loadMessages.open("GET", "https://kachatstrophe.firebaseio.com/messages.json");
        // loadMessages.send();
        // loadMessages.addEventListener("load", function(event){
        //     console.log("the data has loaded!");

        //     var data = JSON.parse(event.target.responseText);
            // pushData(data);
            // var dataArray = [];

            // if(typeof data === "object"){
            //     console.log("data typeof", data)
            //     for(message in data){
            //         dataArray.push(data[message]);
            //     }
            // }
            // pushData(dataArray);

        //     // console.log("data", data);
        //     // console.log("message", data[0].text);
        //     // console.log("date", data[0].date);
        //     // console.log("user", data[0].user);

        //     Chatty.enterKeyPress();
        //     Chatty.writeToDom()
        //     Chatty.defaultListeners();
        //     Chatty.optionsView();
        //     Chatty.chatView();
        // });

    }

    //To get array - run Chatty.getMessages();
    chatapp.getMessages = function(){
        return messagesArray;
    };

    chatapp.getDate = function(){
        return datesArray;
    }

    chatapp.getUsers = function() {
        return usersArray;
    }

    chatapp.addMessages = function(message, user){
        messagesArray.push(message);
        usersArray.push(user);
        datesArray.push(Chatty.setDate())
        chatapp.messageLimit();


            var newObject = {
                    "date": Chatty.setDate(),
                    "text": message,
                    "user": user
                    }

            $.ajax({
                url: "https://kachatstrophe.firebaseio.com/messages.json",
                method: "POST",
                data: JSON.stringify(newObject)
            })
            .done(function(response) {
                console.log("response from Firebase:", response);
            })
    }


    chatapp.deleteAllMessages = function() {
        messagesArray = [];
        datesArray = [];
        usersArray = [];
    }

    chatapp.deleteMessages = function(message, date, user){
        var indexMessage = messagesArray.indexOf(message);
        messagesArray.splice(indexMessage, 1);
        datesArray.splice(indexMessage,1);
        usersArray.splice(indexMessage, 1);
        // console.log("Arrays after splice", messagesArray, datesArray, usersArray);
        Chatty.writeToDom();
    }

    chatapp.editMessages = function(originalMessage, newMessage){
        var indexMessage = messagesArray.indexOf(originalMessage);
        messagesArray.splice(indexMessage, 1, newMessage);
        Chatty.writeToDom();
    }

    return chatapp;

})(Chatty || {});




