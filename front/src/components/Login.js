import React, {useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {ChatContext} from '../context/ChatContext';

function Login(props) {
  const {name, setName} = useContext(ChatContext);
  const history = useHistory();

  const redirectToRoom = event => {
    if ((event.key === 'Enter' || event.key === 'NumpadEnter') &&
        event.target.value.length > 0) {
      history.push(`/${name}`);
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
            <input className="message_input" value={name}
                   onChange={(e) => setName(e.target.value)}
                   onKeyUp={(e) => redirectToRoom(e)}/>
          </div>
        </div>
      </div>
  );
}

export default Login;
