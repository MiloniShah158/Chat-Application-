//add socket  library in index.html file also and call library here 
const socket = io()

let name;
do {
    name = prompt('please enter your name :')
} while (!name)

//this returns the first element within the document that matches the specified selector (css,html)
let textarea = document.querySelector('#textarea')
    // in e the value will save like(hy rakesh)
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }

})

function sendMessage(message) {
    let msg = {
            user: name,
            message: message.trim()
        }
        //append
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    //send to server 
    socket.emit('message', msg)
}

let messagearea = document.querySelector('.message_area')

function appendMessage(msg, type) {
    //for dynamically add
    let mainDiv = document.createElement('div')
    let classname = type
    mainDiv.classList.add(classname, 'message')
    let markup = `
      <h4> ${ msg.user } </h4> 
      <p> ${ msg.message } </p>
      `

    mainDiv.innerHTML = markup
    messagearea.appendChild(mainDiv)
}

//recieve  messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messagearea.scrollTop = messagearea.scrollHeight
}