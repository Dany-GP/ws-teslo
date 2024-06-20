import { Manager, Socket } from "socket.io-client";

let socket: Socket;

export const connectToServer = (jwt: string) => {

    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            hola: 'mundo',
            authentication: jwt
        }
    });
    socket?.removeAllListeners();
    socket = manager.socket('/');
    
    addListeners();
}

const addListeners = () => {
    let serverStatusLabel = document.querySelector('#server-status')!;
    let clientsUl = document.querySelector('#clients-ul')!;
    let messagesUl = document.querySelector('#messages-ul')!;
    let messageForm: HTMLFormElement = document.querySelector('#message-form')!;
    let messageInput: HTMLInputElement = document.querySelector('#message-input')!;


    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'Connected';
        console.log("Connected");

    });


    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'Disconnected';
        console.log("Disconnected");

    });

    socket.on('clients-updated', (clients: string[]) => {
        console.log(clients);
        let clientsHTML = '';
        clients.forEach(x => {
            clientsHTML += `<li>${x}</li>`;
        })

        clientsUl.innerHTML = clientsHTML;

    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (messageInput.value.trim().length <= 0) return;

        console.log({ id: 'Yo', message: messageInput.value });

        socket.emit(
            'message-from-client'
            , { id: 'Yo', message: messageInput.value }
        );

        messageInput.value = '';


    });

    socket.on('message-from-server', (payload: any) => {
        console.log({ message: payload });
        const newMessage =
            `<li>
            <strong>${payload.fullName}</strong>
            <span>${payload.message}</span>
        </li>`;

        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append(li);
    })

}