import React, {useState, useEffect} from 'react';
import {socket} from '../context/socket';

function UsersBar(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('updateUsers', users => {
      setUsers(users);
    });
  });

  return (
      <>
        <div className="users_list_wrapper">
          <h1>Room users:</h1>
          <div className="users_list scrollable">
            {users.map((user, index) => {
              return (
                  <p key={index} className="users_list_item">{user.name}</p>
              );
            })}
          </div>
        </div>
      </>
  );
}

export default UsersBar;
