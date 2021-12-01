import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

const ENDPOINT = 'https://cardboard-admin-api.project-demo.info:4000/';

let socket;

const Chat = () => {
  const [active, setactive] = useState(1);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('join', { name: "Vimal" }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, []);

  useEffect(() => {
    socket.on('message', message => {
      console.log(message,"ssjsjj")
      setMessages(messages => [...messages, message]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    setMessages([...messages, { user: "me", answer: message }]);
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  const changeClient = (number) => {
    socket.emit('changeClient', number, () => setMessage(''));
    setactive(number);
  }
console.log(messages)
  return (
    <div className="outerContainer">
      <div className="container">
        {/* <div style={{ display: "flex" }}>
          <button onClick={() => changeClient(1)} className={`btn ${active === 1 && "btnBack"}`} >Client 1</button>
          <button onClick={() => changeClient(2)} className={`btn ${active === 2 && "btnBack"}`} >Client 2</button></div> */}
        <InfoBar room={"1"} />
        <Messages messages={messages} name={"you"} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;
