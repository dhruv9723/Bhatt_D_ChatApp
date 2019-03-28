import ChatMessage from './modules/ChatMessage.js';



const socket = io();


function logConnect({sID, message}) { 
    console.log(sID, message);
    vm.socketID = sID;
}


function appendMessage(message) {
    vm.messages.push(message);

}

// start vue or create
const vm = new Vue({
    data: {
        socketID: "",
        nickname: "",
        message: "",
        messages: []
    },

    methods: {
        dispatchMessage() {
            // message event from client side
            socket.emit('some text', { content: this.message, name: this.nickname || "Unknown"});

            // to reset the field
                this.message = "";

        }
    },

    components: {
        newmessage: ChatMessage
    }

}).$mount(`#app`);

socket.on('connected', setUserId);

socket.addEventListener('chat message', appendMessage);

socket.addEventListener('disconnect', appendMessage); 