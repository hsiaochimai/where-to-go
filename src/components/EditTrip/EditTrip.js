import React, { Component } from "react";
import ControlledInput from "../ControlledInput/ControlledInput";
import pt from "prop-types";
export default class EditTrip extends Component {
  static propTypes = {
    onSaveTrip: pt.func.isRequired,
    trip: pt.object.isRequired
  };
  constructor(props) {
    super(props);
    const { trip } = this.props;
    this.state = {
      trip: { ...trip },
      validationMessages:{
        name: null,
        numOfDays:null
      }
    };
  }
  validateField = (fieldName, value) => {


    switch (fieldName) {
      case "name":
        if (value === '')
          this.setState({
            validationMessages: {
              name: 'name can not be empty'
            }
          })
        break;
      case "numOfDays":
        if(value=== '')
        this.setState({
          validationMessages: {
            numOfDays: 'you must type a number'
          }
        })
        //TODO setState with proper validation messages
        break;

      default:
        break;
    }
  };
  onChange = (fieldName, value) => {
    this.validateField(fieldName, value);
    const changedTrip = { ...this.state.trip, [fieldName]: value };
    this.setState({ trip: changedTrip }, () => {
      console.log("state changed:", JSON.stringify(this.state.trip, 2, 2));
    });
  };
  render() {
    console.log(`edit trip`, this.state);
    const { name, numOfDays } = this.state.trip;

    return (
      <div className='edit-trip'>
        <form className='edit-trip-form flex-column'>
            <label>Trip name:</label>
            <ControlledInput
              onChange={value => this.onChange("name", value)}
              tag="input"
              type="text"
              required={true}
              initialValue={name}
              //   editMode={editMode}
            />
         
         
            <label>Number of Days:</label>
            <ControlledInput
              onChange={value => this.onChange("numOfDays", value)}
              tag="input"
              type="number"
              min="1"
              required={true}
              initialValue={numOfDays}
              //   editMode={editMode}
            />
          
        </form>
        <button  onClick={ev => this.props.onSaveTrip(this.state.trip)}>
          Save
        </button>
        <button onClick={ev=>this.props.cancelButton()}>Cancel</button>
      </div>
    );
  }
}
