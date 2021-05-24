import './App.css';
import MainChat from './components/MainChat';
import Login from './components/Login'
import {BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <div className='home_wrapper'>
          <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/:room' component={MainChat}/>
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
