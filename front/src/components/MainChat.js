import React, {useEffect, useState, useContext} from 'react';
import SideBars from './SideBars';
import {useHistory, useParams} from 'react-router-dom';
import {ChatContext} from '../context/ChatContext';
import {socket} from '../context/socket';

function MainChat(props) {
  const {name} = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const {room} = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!name) {
      history.push('/');
    }
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });
  }, []);

  useEffect(() => {
    if (room) {
      socket.emit('login', {name, room});
    }
  }, [room]);

  useEffect(() => {
    return history.listen(() => {
      socket.emit('logout');
    });
  }, [history]);

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
    return `${date.getHours() < 10 ?
        '0' + date.getHours() :
        date.getHours()}:${date.getMinutes() < 10 ?
        '0' + date.getMinutes() :
        date.getMinutes()}`;
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
          <input className="message_input" placeholder="Напишите сообщение..."
                 type="text"
                 onKeyUp={(e) => pushNewMessage(e)}/>
        </div>
      </div>
  );
}

export default MainChat;
