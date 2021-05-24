import React, {useState} from 'react';

const ChatContext = React.createContext();

const ChatProvider = ({children}) => {
  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [room, setRoom] = useState('');

  return (
      <ChatContext.Provider value={{name, room, setName, setRoom}}>
        {children}
      </ChatContext.Provider>
  );
};

export {ChatContext, ChatProvider};
