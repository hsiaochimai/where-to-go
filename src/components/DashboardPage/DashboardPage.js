import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { NavTab } from "react-router-tabs";
import TripPage from "../Trips/TripPage";
import AddTripPage from "../Trips/AddTripPage";
import './Dashboard.css'
import { checkLoginAndRedirect } from '../../helpers'

// import './Dashboard.css'
export default class DashboardPage extends Component {
  componentDidMount = async () => {

    //if not logged in then redirect to login
    if (! await checkLoginAndRedirect(this.props.history)) {
      return
    }
  }

  render() {
    const { path } = this.props.match;
    return (
      <div className="navBar">
        <nav className="links">
          <NavTab to={`${path}/home`} className="link">
            Home
          </NavTab>
          <NavTab to={`${path}/add-trip`} className="link">
            Add Trip
          </NavTab>
          <NavTab>Logout</NavTab>
        </nav>
        <div className="tabs">
          <Switch>
            <Route
              exact
              path={`${path}`}
              render={() => <Redirect replace to={`${path}/home`} />}
            />
            <Route path={`${path}/home`} exact component={TripPage} />
            <Route path={`${path}/add-trip`} exact component={AddTripPage} />
            <Route path={`${path}/home/trip/:tripid`} exact component={TripPage} />
         
          </Switch>
        </div>
      </div>
    );
  }
}
