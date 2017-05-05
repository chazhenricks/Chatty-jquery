var Chatty = (function(chatapp){

    chatapp.setUserColor = function(){
        document.body.setAttribute(`style`,
            `background-color:${$("#background-select").val()};
            color: ${$("#text-select").val()};`
        );
    }
    return chatapp;

})(Chatty || {});
