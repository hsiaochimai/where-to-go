import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import LoginPage from './components/LoginPage/LoginPage'
import {
  faMapMarkedAlt, faEdit, faSave, faTrash,
  faSuitcase, faWindowClose
} from '@fortawesome/free-solid-svg-icons';
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import './App.css';
import whereToGoContext from './components/whereToGoContext/whereToGoContext';
import LandingPage from './components/LandingPage/LandingPage';
import AddTripPage from './components/Trips/AddTripPage';
import TripPage from './components/Trips/TripPage';
import ds from './STORE/dataService'

library.add(
  faEdit, faSave, faTrash,
  faMapMarkedAlt, faSuitcase, faWindowClose
)
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
    
    }) //trips, places or user
  }

  doLogout = () => {
    ds.doLogout()
    this.setState({ user: null })
    history.push('/login')
  }

  render() {
    const contextValue = {
      ...this.state,
      set: this.contextSetter,
      doLogout: this.doLogout,

    }
    return (
      <div className="App flex-column" >
        <whereToGoContext.Provider value={contextValue}>

          <Router history={history}>

            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/" component={LoginPage} />
              <Route path='/dashboard'
                component={TripPage} />
              <Route path='/home'
                component={LandingPage} />
              <Route path='/add-trip'
                component={AddTripPage} />
            </Switch>

          </Router>
        </whereToGoContext.Provider>
      </div>
    );
  }
}

export default App;
