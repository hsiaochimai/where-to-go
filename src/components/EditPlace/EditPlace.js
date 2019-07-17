import React, { Component } from "react";
import ControlledInput from "../ControlledInput/ControlledInput";
import ValidationErrors from "../ValidationErrors/ValidationErrors";
import ds from "../../STORE/dataService";
import './EditPlace.css'
const { savePlace } = ds;
export default class EditPlace extends Component {
  constructor(props) {
    super(props);
    const { place } = this.props;

    this.state = {
      pristineForm: true,
      place: { ...place },
      nameValid: true,
      addressValid: true,
      cityValid: true,
      transportationValid: true,
      notesValid: true,
      formValid: false,
      validationMessages: {
        name: null,
        address: null,
        city: null,
        transportation: null,
        notes: null
      }
    };
  }

  componentDidMount() {
    const { place } = this.state
    // Object.keys(place).forEach(k=>{})
    for (let key in place) {
      console.log(`validate ${key}, ${place[key]}`)
      this.validateField(key, place[key])
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(`componentWillReceiveProps`)
    return

    if (nextProps.place !== this.props.place) {
      this.setState({ place: nextProps.place });
    }
    if (nextProps.place.id || this.props.place.id === -1) {
      console.log(`hello`)
      this.setState({
        nameValid: null,
        addressValid: null,
        cityValid: null,
        transportationValid: null,
        notesValid: null,
        formValid: null,

      }, () => { })
    } else {
      this.setState({
        nameValid: true,
        addressValid: true,
        cityValid: true,
        transportationValid: true,
        notesValid: true,
        formValid: true,

      }, () => { })
    }

  }
  validateField = (fieldName, value) => {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;
    console.log(fieldName, value);
    typeof value === "string" && (value = value.trim());
    switch (fieldName) {
      case "name":
        if (value === 0) {
          fieldErrors.name = "Place name is required";
          hasError = true;
        } else {
          if (value.length < 3) {
            fieldErrors.name = "Place name must be at least 3 characters";
            hasError = true;
          } else {
            fieldErrors.name = "";
            hasError = false;
          }
        }
        this.setState(
          {
            validationMessages: fieldErrors,
            nameValid: !hasError
          },
          this.formValid
        );

        break;
      case "city":
        if (value === '') {
          fieldErrors.city = "City is required";
          hasError = true;
        } else {
          fieldErrors.city = "";
          hasError = false;
        }
        this.setState(
          {
            validationMessages: fieldErrors,
            cityValid: !hasError
          },
          this.formValid
        );
        //TODO setState with proper validation messages
        break;
      case "street_address":
        if (value === '') {
          fieldErrors.address = "address is required";
          hasError = true;
        } else {
          fieldErrors.address = "";
          hasError = false;
        }
        this.setState(
          {
            validationMessages: fieldErrors,
            addressValid: !hasError
          },
          this.formValid
        );
        //TODO setState with proper validation messages
        break;
      case "transportation":
        if (!value) {
          fieldErrors.transportation = "transportation is required";
          hasError = true;
        } else {
          fieldErrors.transportation = "";
          hasError = false;
        }
        this.setState(
          {
            validationMessages: fieldErrors,
            transportationValid: !hasError
          },
          this.formValid
        );
        //TODO setState with proper validation messages
        break;
      case "notes":
        if (!value) {
          fieldErrors.notes = "notes is required";
          hasError = true;
        } else {
          fieldErrors.notes = "";
          hasError = false;
        }
        this.setState(
          {
            validationMessages: fieldErrors,
            notesValid: !hasError
          },
          this.formValid
        );
        //TODO setState with proper validation messages
        break;
      default:
        break;
    }
  };
  formValid() {
    this.setState({
      formValid:
        this.state.nameValid &&
        this.state.addressValid &&
        this.state.cityValid &&
        this.state.transportationValid &&
        this.state.notesValid
    });
  }
  onChange = (fieldName, value) => {
    const changedPlace = { ...this.state.place, [fieldName]: value };
    this.setState({
      pristineForm: false,
      place: changedPlace
    }, () => {
      this.validateField(fieldName, value);
      console.log("state changed:", JSON.stringify(this.state.place, 2, 2));
    });
  };

  render() {

    console.log(`editplace`, this.props)
    const {
      name,
      street_address,
      city,
      transportation,
      notes
    } = this.state.place;
    const { editMode } = this.props;
    return (
      <div className="cardContent padded">
        <form>
          <div>
            <p>
              <span className="">Name</span>
              {!editMode ? (
                name
              ) : (
                  <>
                    <ControlledInput
                      onChange={value => this.onChange("name", value)}
                      tag="input"
                      type="text"
                      required={true}
                      initialValue={name}
                    />
                    <ValidationErrors hasError={this.state.pristineForm === false && !this.state.nameValid} message={this.state.validationMessages.name} />
                  </>
                )}
            </p>
          </div>
          <div>
            <p>
              <span className="">Address</span>
              {!editMode ? (
                street_address
              ) : (
                  <>
                    <ControlledInput
                      onChange={value => this.onChange("street_address", value)}
                      tag="input"
                      type="text"
                      required={true}
                      initialValue={street_address}
                    />
                    <ValidationErrors hasError={this.state.pristineForm === false && !this.state.addressValid} message={this.state.validationMessages.address} />
                  </>
                )}
            </p>
          </div>
          <div>
            <p>
              <span className="">City</span>
              {!editMode ? (
                city
              ) : (
                  <>
                    <ControlledInput
                      onChange={value => this.onChange("city", value)}
                      tag="input"
                      type="text"
                      required={true}
                      initialValue={city}
                    />
                    <ValidationErrors hasError={this.state.pristineForm === false && !this.state.cityValid} message={this.state.validationMessages.city} />
                  </>
                )}
            </p>
          </div>
          <div>
            <p>
              <span className="">Transportation</span>
              {!editMode ? (
                transportation
              ) : (
                  <>
                    <ControlledInput
                      onChange={value => this.onChange("transportation", value)}
                      tag="input"
                      type="text"
                      required={true}
                      initialValue={transportation}
                    />
                    <ValidationErrors hasError={this.state.pristineForm === false && !this.state.transportationValid} message={this.state.validationMessages.transportation} />
                  </>
                )}
            </p>
          </div>
          <div>
            <p>
              <span className="">Notes</span>
              {!editMode ? (
                notes
              ) : (
                  <>
                    <ControlledInput
                      onChange={value => this.onChange("notes", value)}
                      tag="textarea"
                      type="text"
                      required={true}
                      initialValue={notes}
                    />
                    <ValidationErrors hasError={this.state.pristineForm === false && !this.state.notesValid} message={this.state.validationMessages.notes} />
                  </>
                )}
            </p>
          </div>
        </form>

        {editMode ? (
          <div>
            <button disabled={!this.state.formValid} onClick={ev => this.props.onSubmitPlace(this.state.place)}>
              Save
            </button>
            <button onClick={ev => this.props.cancelAddPlace()}>Cancel</button>{" "}
          </div>
        ) : null}
      </div>
    );
  }
}
