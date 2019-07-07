import React, {Component} from 'react';
import LoginForm from './components/LoginForm/LoginForm'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import './App.css';
import whereToGoContext from './components/whereToGoContext/whereToGoContext'
import Dashboard from './components/Dashboard/Dashboard';
import Store from '../src/STORE/Store';
class App extends Component {
  state = {
    trips: [],
    places: []
};
componentDidMount() {
  // fake date loading from API call
  setTimeout(() => this.setState(Store), 600);
}
render(){
  const contextValue={
    trips:this.state.trips,
    places:this.state.places
  }
  return (
    <div className="App">
      <whereToGoContext.Provider value={contextValue}>
      <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/" component={LoginForm} />
              <Route path='/dashboard'
                component={Dashboard} />
            </Switch>
          </BrowserRouter>
          </whereToGoContext.Provider>
    </div>
  );
}
}

export default App;
