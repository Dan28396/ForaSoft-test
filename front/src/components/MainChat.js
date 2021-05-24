import React, {useEffect, useState, useContext} from 'react';
import SideBars from './SideBars';
import {useHistory, useParams} from 'react-router-dom';
import {SocketContext} from '../context/socketContext';

function MainChat(props) {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);
  const [name, setname] = useState(
      localStorage.getItem('name') || '');
  let {room} = useParams();

  const history = useHistory();

  useEffect(() => {
    if (!name) {
      history.push('/');
    }
    socket.emit('login', {name, room});
  }, []);

  useEffect(() => {
    socket.on('message', msg => {
      setMessages([...messages, msg]);
    });
  });

  const pushNewMessage = event => {
    if ((event.key === 'Enter' || event.key === 'NumpadEnter') &&
        event.target.value.length > 0) {
      socket.emit('sendMessage', {
        time: new Date().getTime(),
        name: name,
        text: event.target.value,
      });
      event.target.value = '';
    }
  };

  function parseTimestamp(time) {
    const date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}`;
  }

  return (
      <div className="main_wrapper">
        <SideBars/>
        <div className="chat_wrapper scrollable">
          {messages.map((message, index) => {
            return (<div className="message_wrapper" key={index}>
              <p className="message_time">{parseTimestamp(message.time)}</p>
              <p className="message_name">{message.name}</p>
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
