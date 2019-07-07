import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { NavTab } from "react-router-tabs";
import HomePage from "../HomePage/HomePage";
import AddTripPage from "../Trips/AddTripPage";
import './Dashboard.css'
export default class Dashboard extends Component {
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
        </nav>
        <div className="tabs">
          <Switch>
            <Route
              exact
              path={`${path}`}
              render={() => <Redirect replace to={`${path}/home`} />}
            />
            <Route path={`${path}/home`} exact component={HomePage} />
            <Route path={`${path}/add-trip`} exact component={AddTripPage} />
          </Switch>
        </div>
      </div>
    );
  }
}
