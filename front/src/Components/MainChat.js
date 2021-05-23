import React, {useState} from 'react';
import SideBars from './SideBars';

function MainChat(props) {
  const [messages, setMessages] = useState([]);

  const pushNewMessage = event => {
    if ((event.key === 'Enter' || event.key === 'NumpadEnter') &&
        event.target.value.length > 0) {
      setMessages([
        ...messages,
        {
          time: new Date().getTime(),
          userName: 'Dan28396',
          text: event.target.value,
        },
      ]);
      event.target.value = '';
    }
  };

  function parseTimestamp (time) {
    const date = new Date(time)
    return `${date.getHours()}:${date.getMinutes()}`
  }

  return (
      <div className="main_wrapper">
        <SideBars/>
        <div className="chat_wrapper">
          {messages.map((message) => {
            return (<div className="message_wrapper">
              <p className="message_time">{parseTimestamp(message.time)}</p>
              <p className="message_username">{message.userName}</p>
              <p className="message_text">{message.text}</p>
            </div>);
          })}
        </div>
        <div className="message_input_wrapper">
          <input className="message_input" type="text"
                 onKeyUp={(e) => pushNewMessage(e)}/>
        </div>
      </div>
  );
}

export default MainChat;
