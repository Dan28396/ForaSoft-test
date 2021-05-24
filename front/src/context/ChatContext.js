import React, {useState} from 'react';

const ChatContext = React.createContext();

const ChatProvider = ({children}) => {
  const [name, setName] = useState(localStorage.getItem('name') || '');

  return (
      <ChatContext.Provider value={{name, setName}}>
        {children}
      </ChatContext.Provider>
  );
};

export {ChatContext, ChatProvider};
