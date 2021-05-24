import React, {useState} from 'react';

const InfoBarContext = React.createContext();

const InfoBarProvider = ({children}) => {
  const [users, setUsers] = useState('');

  return (
      <InfoBarContext.Provider value={{users, setUsers}}>
        {children}
      </InfoBarContext.Provider>
  );
};

export {InfoBarContext, InfoBarProvider};
