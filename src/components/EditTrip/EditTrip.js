import React, { Component } from "react";
import ControlledInput from "../ControlledInput/ControlledInput";
import pt from "prop-types";
import ValidationErrors from '../ValidationErrors/ValidationErrors'
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
      tripNameValid:null,
      numOfDaysValid: null,
      formValid: null,
      validationMessages:{
        name: null,
        numOfDays:null
      }
    };
  }
  validateField = (fieldName, value) => {
const fieldErrors={...this.state.validationMessages}
let hasError= false
    switch (fieldName) {
      case "name":
        value=value.trim()
        if (value ===0){
          fieldErrors.name = 'Folder name is required';
          hasError = true;
        }
      
          else{
            if (value.length < 3) {
              fieldErrors.name = 'Trip name must be at least 3 characters'
              hasError = true;
          } else {
              fieldErrors.name = '';
              hasError = false;
          }
          }
          this.setState({
            validationMessages: fieldErrors,
            tripNameValid: !hasError
        }, this.formValid);

        break;
      case "numOfDays":
        if(value=== ''){
        fieldErrors.numOfDays = 'Trip duration is required';
          hasError = true;
        }
        else {
          fieldErrors.numOfDays = '';
          hasError = false;
      }
      this.setState({
        validationMessages: fieldErrors,
        numOfDaysValid: !hasError
    }, this.formValid);
        //TODO setState with proper validation messages
        break;

      default:
        break;
    }
    
  };
  formValid() {
    this.setState({
        formValid: this.state.tripNameValid && this.state.numOfDaysValid
    })
}
  onChange = (fieldName, value) => {
    const changedTrip = { ...this.state.trip, [fieldName]: value };
    this.setState({ trip: changedTrip }, () => {this.validateField(fieldName, value)
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
      <ValidationErrors hasError={!this.state.tripNameValid} message={this.state.validationMessages.name} />

         
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
    <ValidationErrors hasError={!this.state.numOfDaysValid} message={this.state.validationMessages.numOfDays} />

        </form>
        <button disabled={!this.state.formValid}  onClick={ev => this.props.onSaveTrip(this.state.trip)}>
          Save
        </button>
        <button onClick={ev=>this.props.cancelButton()}>Cancel</button>
      </div>
    );
  }
}
