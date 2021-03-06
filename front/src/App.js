import './App.css';
import MainChat from './components/MainChat';
import Login from './components/Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ChatProvider} from './context/ChatContext';
import {InfoBarProvider} from './context/InfoBarContext';

function App() {
  return (
      <ChatProvider>
        <InfoBarProvider>
          <Router>
            <div className="home_wrapper">
              <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/:room" component={MainChat}/>
              </Switch>
            </div>
          </Router>
        </InfoBarProvider>
      </ChatProvider>
  );
}

export default App;
