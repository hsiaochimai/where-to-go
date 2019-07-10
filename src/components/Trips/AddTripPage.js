import React, { Component } from "react";
import ControlledInput from "../ControlledInput/ControlledInput";
export default class AddTripPage extends Component {
  render() {
    return (
       
      <div>
        Add Trip
        
         <ControlledInput
                  tag="input"
                  type="text"
                  required={true}
                  />
      
      </div>
    );
  }
}
