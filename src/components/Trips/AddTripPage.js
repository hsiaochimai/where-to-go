import React, { Component } from "react";
import ControlledInput from "../ControlledInput/ControlledInput";
import whereToGoContext from '../whereToGoContext/whereToGoContext'
export default class AddTripPage extends Component {
    static contextType = whereToGoContext
  constructor() {
    super();
    this.state = {
      id: '',
      name: "",
      numOfDays: null,
      user_id: null,
      completed: false
    };
  }
  onChange = (fieldName, value) => {


    const changedTrip = { ...this.state, [fieldName]: value }
    this.setState(
      changedTrip,
      () => {

      }
    );
  };
  render() {
      console.log(this.context)
    return (
      <div>
        Add Trip
        <p>Name</p>
        <ControlledInput tag="input" type="text" required={true}onChange={value => this.onChange("name", value)} />
        <p>Duration of stay</p>
        <ControlledInput tag="input" type="number" required={true} onChange={value => this.onChange("numOfDays", value)} /> Days
      </div>
    );
  }
}
