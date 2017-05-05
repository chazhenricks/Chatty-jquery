var Chatty = (function(chatapp) {
    var write = $("#write");
    var clearLogButton = $('#clear-log');

    chatapp.writeToDom = function() {
        var messages = Chatty.getMessages();
        var dates = Chatty.getDate();
        var users = Chatty.getUsers();
        write.html("");
        for (var i = 0; i < messages.length; i++) {
            var newMessage =

                `<div class="individualMsg">
				<div class="row">
					<div class="col s9 grey-text text-darken-3">
						<p class="message">${messages[i]}</p>
						<p class="user">-${users[i]}</p>
						<p class="date">${dates[i]}</p>
					</div>
					<div class="col s3 buttons">
						<a class="delete waves-effect waves-light btn">Delete</a>
						<a class="edit waves-effect waves-light btn">Edit</a>
					</div>
				</div>
			</div>`;
            write.append(newMessage);
        }
        Chatty.deleteButton();
        Chatty.editButton();
        Chatty.scrollBottom();
        clearLogButton.removeAttr("disabled");
    }
    chatapp.messageLimit = function() {
        var messages = Chatty.getMessages();
        // console.log("messages", messages);
        switch (true) {
            case (messages.length > 20):
                console.log("There are more than 20 messages");
                var msgToDelete = messages[0];
                Chatty.deleteMessages(msgToDelete);
                break;
            default:
                console.log("There are fewer than 20 messages");
                break;
        }
    }
    chatapp.scrollBottom = function() {
        var chatLog = $("#chat-log");
        // console.log("chatLog", chatLog);
        chatLog[0].scrollTop = chatLog[0].scrollHeight;
    }
    return chatapp;
})(Chatty || {});
