/* global Primus, feathers, document, window, $ */

const socket = new Primus('http://localhost:3030');
const app = feathers();
app.configure(feathers.primus(socket));

const messages = app.service('messages');

async function populateMessageList() {
    idToDelete = '';
    idToUpdate = '';
    const list = (await fetchMessages()).data;

    const messageListEl = document.getElementById('message-list');
    let innerTxt = '';
    if (list.length === 0) {
        innerTxt = '<span class="no-messages">No messages...</span>';
    }
    else {
        innerTxt = '<ul class="message-list">';
        for (let msg of list) {
            const msgTime = (new Date(msg.createdAt)).toLocaleTimeString();
            const imgUsr = `<img src="/assets/${msg.user}.jpg" class="rounded-circle user-picture-thumb-msg" />`;
            innerTxt += `
                <li class="message">
                    <span class="msg-user">${imgUsr}</span>
                    <span class="msg-time">${msgTime}</span>
                    ${msg.user === user ? // eslint-disable-next-line indent
                        '<div class="msg-update" onclick="showUpdateMsg(\'' + msg._id + '\')">&nbsp</div>' : // eslint-disable-next-line indent
                        '<div class="msg-update-blank">&nbsp</div>'} 
                    ${msg.user === user ? // eslint-disable-next-line indent
                        '<div class="msg-delete" onclick="showDeleteMsg(\'' + msg._id + '\')">&nbsp</div>' : // eslint-disable-next-line indent
                        '<div class="msg-delete-blank">&nbsp</div>'}    
                    <div class="msg-text">${msg.text}</span>
                </li>`;
        }
        innerTxt += '</ul>';
    }
    messageListEl.innerHTML = innerTxt;
}

async function fetchMessages() {
    const messageList = await messages.find({ query: { 
        $limit: 1000,
        $sort: { createdAt: 1 }
    } });
    return messageList;
}

// eslint-disable-next-line no-unused-vars
async function sendMessage() {
    const messageBox = document.getElementById('message-box');
    const text = messageBox.value;
    if (!text) return;

    await messages.create({text, user});
    messageBox.value = '';
}

// eslint-disable-next-line no-unused-vars
async function showUpdateMsg(id) {
    const txtUpdateEl = document.getElementById('textToUpdate');
    idToUpdate = id;
    const msg = await messages.get(idToUpdate); 
    txtUpdateEl.value = msg.text;
    $('#modalUpdate').modal('show');
}

// eslint-disable-next-line no-unused-vars
async function confirmUpdate() {
    const txtUpdateEl = document.getElementById('textToUpdate');
    const text = txtUpdateEl.value;
    await messages.patch(idToUpdate, {text});
    txtUpdateEl.value = '';
    $('#modalUpdate').modal('hide');
}

// eslint-disable-next-line no-unused-vars
function showDeleteMsg(id) {
    idToDelete = id;
    $('#modalDelete').modal('show');
}

// eslint-disable-next-line no-unused-vars
async function confirmDel() {
    await messages.remove(idToDelete);
    $('#modalDelete').modal('hide');
}

// eslint-disable-next-line no-unused-vars
function selectUser(name) {
    user = name;
    window.localStorage.setItem('chatUser', user);
    document.getElementById('user-picture').src = `/assets/${user}.jpg`;
    populateMessageList();
    $('#modalSelectUser').modal('hide');
}

function getUser() {
    const name = window.localStorage.getItem('chatUser');
    if (!name) {
        changeUser();
    }
    else {
        user = name;
        document.getElementById('user-picture').src = `/assets/${user}.jpg`;
    }
}

function changeUser() {
    user = '';
    document.getElementById('user-picture').src = '/assets/generic.png';
    $('#modalSelectUser').modal('show');
}

messages.on('created', message => {
    // eslint-disable-next-line no-console
    console.log('Message sent', message);
    populateMessageList();
});

messages.on('patched', message => {
    // eslint-disable-next-line no-console
    console.log('Message updated', message);
    populateMessageList();
});

messages.on('removed', message => {
    // eslint-disable-next-line no-console
    console.log('Message removed', message);
    populateMessageList();
});

// Get user
let user = '';
getUser();

let idToDelete = '';
let idToUpdate = '';
