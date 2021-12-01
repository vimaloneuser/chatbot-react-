import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

const ENDPOINT = 'https://cardboard-admin-api.project-demo.info:4000/';

let socket;

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('join', { token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImVtYWlsIjoidmltYWxwKzhAZ21haWwuY29tIiwiY2xpZW50SWQiOjEyLCJyb2xlIjoicGF0aWVudCIsImlhdCI6MTYzODM2OTI0NCwiZXhwIjoxNjM4NDEyNDQ0fQ.WXMmjoCI184p8jDDLlu7vy4Yy6ZJt6POOVY1HA-tdMo" },
      res => {
        console.log(res)
        if (res.error) {
          alert(res.error);
        }
        setRoomId(res.roomId);
      });
  }, []);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    setMessages([...messages, { user: "me", answer: message }]);
    if (message) {
      socket.emit('sendMessage', { message: message, roomId }, () => setMessage(''));
    }
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
