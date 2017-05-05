"use strict"
console.log("iifeopt");
var Chatty = (function (oldChatty) {
    // GATHERING EVENT LISTENERS
    var newMessage = document.getElementById('message-input');
    var themeSelect = document.getElementById('theme-select');
    var textSizeSelect = document.getElementById('text-size-select');
    var clearLogButton = document.getElementById('clear-log');
    var userSelect = document.getElementById('user-select');
    // NAV CLEAR FUNCTION
    oldChatty.navClear = function () {
        // GETTING MESSAGEARRAY LENGTH
        var messageArray = Chatty.getMessages();
        // console.log(messageArray);
        newMessage.value = null;
        var selects = document.getElementsByTagName('option');
        for (let i = 0; i < selects.length; i++) {
            selects[i].selected = false;
        }

        for (var j = 0; j < messageArray.length; j++) {
            // console.log(messageArray[j]);
            Chatty.deleteAllMessages();
        }
        Chatty.writeToDom();
        clearLogButton.setAttribute("disabled", true);
    }

    // ENTER KYPRESS FUNCTION
    oldChatty.enterKeyPress = function () {
        newMessage.addEventListener("keypress", function(event) {
            var user = userSelect.value;
            if (event.keyCode === 13) {
                Chatty.addMessages(newMessage.value, user);
                Chatty.writeToDom();
                newMessage.value = null;
            }


        });
    }

    // SELECT THEME FUNCTION
    oldChatty.selectTheme = function () {
        var themesSelect = document.getElementById("theme-select");
        switch (themesSelect.value){
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
        var textSizeSelect = document.getElementById("text-size-select");
        var write = document.getElementById("write");
        switch (textSizeSelect.value){
            case "a":
                write.classList.remove("largeText");
                break;
            case "b":
                write.classList.add("largeText");
                break;
            default:
                // console.log("Something is wrong");
        }
        oldChatty.chatViewInnerEL();
    }

    // DELETE MESSAGE BUTTON Event Listener
    oldChatty.deleteButton = function () {
        var messageDeleteButtons = document.getElementsByClassName('delete');
        for (var i = 0; i < messageDeleteButtons.length; i++) {

            messageDeleteButtons.item(i).addEventListener("click", function(event) {
                var deleteMessage = event.target.closest(".row").querySelector(".message").innerHTML;
                var deleteDate = event.target.closest(".row").querySelector(".date").innerHTML;
                var deleteUser = event.target.closest(".row").querySelector(".user").innerHTML;
                console.log("deletes", deleteMessage, deleteDate, deleteUser);
                Chatty.deleteMessages(deleteMessage, deleteDate, deleteUser);
            });
        }
    }


    // EDIT BUTTON EVENT LISTENER
    oldChatty.editButton = function() {
        var editMessage = document.getElementsByClassName("edit");
        for (var i = 0; i < editMessage.length; i++){
            editMessage.item(i).addEventListener("click", function(){
                var originalMessage = event.target.closest(".row").querySelector(".message").innerHTML;
                var inputBox = document.getElementById("message-input");
                var editButton = document.getElementById("edit-btn");
                inputBox.focus();
                inputBox.value = originalMessage;
                editButton.classList.remove("hidden");
                editButton.addEventListener("click", function(event){
                    Chatty.editMessages(originalMessage, inputBox.value);
                    editButton.classList.add("hidden");
                    inputBox.value = null;
                })
            });
        }
    }

    // Default Event Listeners
    oldChatty.defaultListeners = function () {
        var themesBtn = document.getElementById('btn-selectTheme');
        var textBtn = document.getElementById("btn-selectText");
        var clearLogButton = document.getElementById('clear-log');
        var colorBtn = document.getElementById("color-btn");


        colorBtn.addEventListener("click", Chatty.setUserColor);
        themesBtn.addEventListener("click", Chatty.selectTheme);
        textBtn.addEventListener("click", Chatty.selectTextSize);
        clearLogButton.addEventListener("click", Chatty.navClear);
    }

    oldChatty.optionsView = function (){
        var optionsClick = document.getElementById("optionsClick");
        var footerInput = document.getElementById("footerInput");
        var footer = document.getElementById("footer");
        optionsClick.addEventListener("click", function(){
            var optionsView = document.getElementById("optionsView");
            var chatView = document.getElementById("chatLogView");
            // console.log("options view clicked");
            optionsView.classList.remove("hidden");
            chatView.classList.add("hidden");
            footerInput.classList.add("hidden");
            footer.classList.add("footerHeight");
        })
    }

    oldChatty.chatView = function (){
        var chatLogClick = document.getElementById("chatLogClick");
        var footerInput = document.getElementById("footerInput");
        chatLogClick.addEventListener("click", oldChatty.chatViewInnerEL);
    }

    oldChatty.chatViewInnerEL = function (){
        var optionsView = document.getElementById("optionsView");
        var chatView = document.getElementById("chatLogView");
        var footer = document.getElementById("footer");
        // console.log("chat view clicked");
        optionsView.classList.add("hidden");
        chatView.classList.remove("hidden");
        footerInput.classList.remove("hidden");
        footer.classList.remove("footerHeight");
    }

    return oldChatty
})(Chatty || {});


