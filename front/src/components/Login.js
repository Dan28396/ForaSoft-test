import React, {useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {ChatContext} from '../context/ChatContext';
import {checkBeforeSubmit} from '../utils';

function Login(props) {
  const {name, setName} = useContext(ChatContext);
  const history = useHistory();

  const redirectToRoom = (event, buttonClicked) => {
    if (checkBeforeSubmit(event, buttonClicked)) {
      if (name.length > 0) {
        history.push(`/${name}`);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('name', name);
  }, [name]);

  return (
      <div className="main_wrapper login">
        <div className="enter_username_wrapper">
          <div className="username_input_wrapper">
            <h3>Please, specify name and press Enter key.</h3>
            <div className="input_text_wrapper">
              <input className="message_input" value={name}
                     onChange={(e) => setName(e.target.value)}
                     onKeyUp={(e) => redirectToRoom(e)}/>
              <svg viewBox="0 0 24 24" className="send_icon_img"
                   onClick={(e) => redirectToRoom(e, true)}>
                <path fill="#fff"
                      d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Login;
