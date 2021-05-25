import React, {useEffect, useState, useContext, useRef} from 'react';
import SideBars from './SideBars';
import {useHistory, useParams} from 'react-router-dom';
import {ChatContext} from '../context/ChatContext';
import {socket} from '../context/socket';
import {checkBeforeSubmit} from '../utils';

function MainChat(props) {
  const {name} = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const {room} = useParams();
  const history = useHistory();
  const chatWrapperRef = useRef();

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

  useEffect(
      () => {
        chatWrapperRef.current.scrollTop = chatWrapperRef.current.offsetHeight;
      }, [messages]);

  const pushNewMessage = (event, buttonClicked) => {
    if (checkBeforeSubmit(event, buttonClicked)) {
      if (input.length > 0) {
        socket.emit('sendMessage', {
          time: new Date().getTime(),
          name: name,
          text: input,
        });
        setInput('');
      }
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
        <div className="chat_wrapper scrollable" ref={chatWrapperRef}>
          {messages.map((message, index) => {
            return (<div className="message_wrapper" key={index}>
              <p className="message_time">{parseTimestamp(message.time)}</p>
              <p className="message_name">{message.name}</p>
              <p className="message_text">{message.text}</p>
            </div>);
          })}
        </div>
        <div className="message_input_wrapper">
          <div className="input_text_wrapper">
            <input className="message_input" placeholder="Напишите сообщение..."
                   type="text" value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyUp={(e) => pushNewMessage(e)}/>
            <svg viewBox="0 0 24 24" className="send_icon_img"
                 onClick={(e) => pushNewMessage(e, true)}>
              <path fill="#fff"
                    d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
            </svg>
          </div>
        </div>
      </div>
  );
}

export default MainChat;
