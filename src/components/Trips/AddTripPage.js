import React, { Component } from "react";
import ControlledInput from "../ControlledInput/ControlledInput";
export default class AddTripPage extends Component {
  render() {
    return (
       
      <div>
        Add Trip
        <p>Name</p>
         <ControlledInput
                  tag="input"
                  type="text"
                  required={true}
                  />
        <p>Duration of stay</p>
        <ControlledInput
                  tag="input"
                  type="number"
                  required={true}
                  /> Days
      </div>
    );
  }
}
