import React, { Component } from 'react';
import LoginPage from './components/LoginPage/LoginPage'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import './App.css';
import whereToGoContext from './components/whereToGoContext/whereToGoContext'
import DashboardPage from './components/DashboardPage/DashboardPage';
import store from './STORE/store';
class App extends Component {
  state = {
    user: null,
    trips: [],
    places: []
  };
  componentDidMount() {
    // fake date loading from API call
    // setTimeout(() => this.setState(store), 600);
  }

  contextSetter = (obj) => {
    this.setState(obj, () => {
      console.log('setter:', obj)
    }) //trips, places or user
  }

  render() {
    const contextValue = {
      ...this.state,
      set: this.contextSetter,

    }
    return (
      <div className="App" >
        <whereToGoContext.Provider value={contextValue}>
          <BrowserRouter>

            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/" component={LoginPage} />
              <Route path='/dashboard'
                component={DashboardPage} />
            </Switch>

          </BrowserRouter>
        </whereToGoContext.Provider>
      </div>
    );
  }
}

export default App;
