/* global Primus, feathers, document */

const socket = new Primus('http://localhost:3030');
const app = feathers();
app.configure(feathers.primus(socket));

const messages = app.service('messages');

messages.on('created', message => {
    // eslint-disable-next-line no-console
    console.log('Message sent', message);
    populateMessageList(message);
});

async function populateMessageList() {
    const list = (await fetchMessages()).data;

    const messageListEl = document.getElementById('message-list');
    let innerTxt = '';
    if (list.length === 0) {
        innerTxt = '<span class="no-messages">No messages...</span>';
    }
    else {
        innerTxt = '<ul>';
        for (let msg of list) {
            innerTxt += `<li>${msg.text}</li>`;
        }
        innerTxt += '</ul>';
    }
    messageListEl.innerHTML = innerTxt;
}

async function fetchMessages() {
    const messageList = await messages.find();
    return messageList;
}

// eslint-disable-next-line no-unused-vars
async function sendMessage() {
    const messageBox = document.getElementById('message-box');
    const text = messageBox.value;
    if (!text) return;

    await messages.create({text});
    messageBox.value = '';
}

// Populate list with existing messages
populateMessageList();