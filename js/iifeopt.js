"use strict"
console.log("iifeopt");
var Chatty = (function (oldChatty) {
    // GATHERING EVENT LISTENERS
    var newMessage = $('#message-input');
    var clearLogButton = $('#clear-log');
    var userSelect = $('#user-select');
    // NAV CLEAR FUNCTION
    oldChatty.navClear = function () {
        // GETTING MESSAGEARRAY LENGTH
        var messageArray = Chatty.getMessages();
        // console.log(messageArray);
        newMessage.val = null;
        var selects = $('option');
        for (let i = 0; i < selects.length; i++) {
            selects[i].selected = false;
        }

        for (var j = 0; j < messageArray.length; j++) {
            // console.log(messageArray[j]);
            Chatty.deleteAllMessages();
        }
        Chatty.writeToDom();
        clearLogButton.attr("disabled", true);
    }

    // ENTER KYPRESS FUNCTION
    oldChatty.enterKeyPress = function () {
        newMessage.keypress(function(event) {
            var user = userSelect.val();
            if (event.keyCode === 13) {
                Chatty.addMessages(newMessage.val(), user);
                Chatty.writeToDom();
                newMessage.val(null);
            }
        });
    }

    // SELECT THEME FUNCTION
    oldChatty.selectTheme = function () {
        var themesSelect = $("#theme-select");

        switch (themesSelect.val()){
            case "1":
                document.body.classList.remove("darkTheme");
                break;
            case "2":
                document.body.classList.add("darkTheme");
                break;
            default:
                // console.log("Something is wrong");
        }
    }

    // Select Text Size Function
    oldChatty.selectTextSize = function () {
        var textSizeSelect = $("#text-size-select");
        var write = $("#write");
        switch (textSizeSelect.val()){
            case "a":
                write.removeClass("largeText");
                break;
            case "b":
                write.addClass("largeText");
                break;
            default:
                // console.log("Something is wrong");
        }
        oldChatty.chatView();
    }

    // DELETE MESSAGE BUTTON Event Listener
    oldChatty.deleteButton = function () {
        $('.delete').click([event],function(){
            console.log("cool man");
            var deleteMessage = event.target.closest(".row").querySelector(".message").innerHTML;
                var deleteDate = event.target.closest(".row").querySelector(".date").innerHTML;
                var deleteUser = event.target.closest(".row").querySelector(".user").innerHTML;
                console.log("deletes", deleteMessage, deleteDate, deleteUser);
                Chatty.deleteMessages(deleteMessage, deleteDate, deleteUser);
        });
    }

    // EDIT BUTTON EVENT LISTENER
    oldChatty.editButton = function() {
        $(".edit").click([event], function(){
            var originalMessage = event.target.closest(".row").querySelector(".message").innerHTML;
            $("#message-input").focus().val(originalMessage);
            $("#edit-btn").removeClass("hidden").click(function(){
                Chatty.editMessages(originalMessage, $('#message-input').val());
                $('#edit-btn').addClass("hidden");
                $('#message-input').val(null);
            });
        });
    }

    // Default Event Listeners
    oldChatty.defaultListeners = function () {
        $("#btn-selectTheme").click(Chatty.selectTheme);
        $("#btn-selectText").click(Chatty.selectTextSize);
        $("#clear-log").click(Chatty.navClear);
        $("#color-btn").click(Chatty.setUserColor)
    }

    oldChatty.optionsView = function (){
        $("#optionsClick").click(function(){
            $("#optionsView").removeClass("hidden");
            $("#chatLogView").addClass("hidden");
            $("#footerInput").addClass("hidden");
            $("#footer").addClass("footerHeight");
        });
    }

oldChatty.chatView = function(){
    $("#chatLogClick").click(function(){
        $("#chatLogView").removeClass("hidden");
        $("#optionsView").addClass("hidden");
        $("#footerInput").addClass("hidden");
        $("#footer").addClass("footerHeight");
    });
}

    return oldChatty
})(Chatty || {});



var something = $("#something")














