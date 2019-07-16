import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import LoginPage from './components/LoginPage/LoginPage'
import { 
  faMapMarkedAlt,  faEdit,   faSave,  faTrash,
   faSuitcase, faWindowClose
} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import './App.css';
import whereToGoContext from './components/whereToGoContext/whereToGoContext'
import store from './STORE/store';
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/NavBar/NavBar';
import AddTripPage from './components/Trips/AddTripPage';
import TripPage from './components/Trips/TripPage';

library.add(
  faEdit,   faSave,  faTrash, 
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
                component={TripPage} />
                <Route path='/home'
                component={LandingPage} />
                <Route path='/add-trip'
                component={AddTripPage} />
            </Switch>

          </BrowserRouter>
        </whereToGoContext.Provider>
      </div>
    );
  }
}

export default App;
