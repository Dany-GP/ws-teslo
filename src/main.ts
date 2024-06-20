import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>

    <input id="jwtToken" placeholder="Json web Token"/>
    <button id="btn-connect">Connect</button>
    <br/>
    <span id="server-status">Offline</span>

    <ul id="clients-ul">

    </ul>

    <form id="message-form">
      <input placeholder="message" id="message-input" />
    </form>

    <h3>Messages</h3>

    <ul id="messages-ul">
    </ul>

  </div>
`

const inputJwt = document.querySelector<HTMLInputElement>("#jwtToken")!;
const btn = document.querySelector("#btn-connect")!;

btn.addEventListener('click', () => {


  if(inputJwt.value.trim().length <= 0) return alert('Enter a valid JWT');

  connectToServer(inputJwt.value);
})


//connectToServer();