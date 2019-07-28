import React, { Component } from "react";
import ControlledInput from "../ControlledInput/ControlledInput";
import pt from "prop-types";
import ValidationErrors from '../ValidationErrors/ValidationErrors'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
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
      tripNameValid:true,
      numOfDaysValid: true,
      formValid: true,
      validationMessages:{
        name: null,
        numofdays:null
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
          fieldErrors.name = 'Trip name is required';
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
      case "numofdays":
        if(value=== ''){
        fieldErrors.numofdays = 'Trip duration is required';
          hasError = true;
        }
        else {
          fieldErrors.numofdays = '';
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
  
    });
  };
  componentDidMount(){
    if(this.props.trip.id===-1){
      this.setState({
        tripNameValid:null,
      numOfDaysValid: null,
      formValid: null,

      })
    }
  }
  render() {

    const { name, numofdays } = this.state.trip;

    return (
      <div className='edit-trip'>
        <div className='action-buttons' >
        <button disabled={!this.state.formValid}  onClick={ev => this.props.onSaveTrip(this.state.trip)}>
        <Icon icon="save" /> 
          Save
        </button>
        <button onClick={ev=>this.props.cancelButton()}>  <Icon icon="window-close" /> Cancel</button>
        </div>

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
              onChange={value => this.onChange("numofdays", value)}
              tag="input"
              type="number"
              min="1"
              required={true}
              initialValue={numofdays}
              //   editMode={editMode}
            />
    <ValidationErrors hasError={!this.state.numOfDaysValid} message={this.state.validationMessages.numofdays} />

        </form>
        
      </div>
    );
  }
}
