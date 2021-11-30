import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { answer, user, admin, suggestion, suggestions }, name }) => {
  console.log(answer, user, admin)
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === "me") {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(answer)}</p>
          </div>
        </div>
      )
      : (
        <div className="messageContainer justifyStart">
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(answer)}</p>

            {
              suggestion && <div>
                <h3 style={{ color: "black" }}>suggestions....</h3>
                {
                  suggestions.map(i =>
                    <div><p style={{ color: "black" }}>{i.question}</p></div>
                  )
                }
              </div>
            }
          </div>
          <p className="sentText pl-10 ">{user}</p>
        </div>
      )
  );
}

export default Message;