import React, {useState} from 'react';
import UsersBar from './UsersBar';

function SideBars(props) {
  const [usersSidebar, setUsersSidebar] = useState(false);
  const [videoSidebar, setVideoSidebar] = useState(false);

  const showUsersSidebar = () => {
    if (videoSidebar) {
      setVideoSidebar(!videoSidebar);
    }
    setUsersSidebar(!usersSidebar);
  };
  const showVideoSidebar = () => {
    if (usersSidebar) {
      setUsersSidebar(!usersSidebar);
    }
    setVideoSidebar(!videoSidebar);
  };

  return (
      <>
        <div className="bar_wrapper">
          <button className="menu_btn" onClick={showUsersSidebar}>
            <svg className="users_menu_btn_img" viewBox="0 0 24 24">
              <path fill="#fff"
                    d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"/>
            </svg>
          </button>
          <button className="menu_btn" onClick={showVideoSidebar}>
            <svg className="menu_btn_img" viewBox="0 0 24 24">
              <path fill="#fff"
                    d="M15,8V16H5V8H15M16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5V7A1,1 0 0,0 16,6Z"/>
            </svg>
          </button>
        </div>
        <nav className={usersSidebar ?
            'nav_menu nav_left active' :
            'nav_menu nav_left'}>
          <UsersBar/>
        </nav>
        <nav className={videoSidebar ?
            'nav_menu nav_right active' :
            'nav_menu nav_right'}>
        </nav>
      </>
  );
}

export default SideBars;
