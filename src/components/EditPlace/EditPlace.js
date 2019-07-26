import React, { Component } from "react";
import ControlledInput from "../ControlledInput/ControlledInput";
import ValidationErrors from "../ValidationErrors/ValidationErrors";
import './EditPlace.css'


const defaultState = {
  changedFields: [],
}

export default class EditPlace extends Component {
  constructor(props) {
    super(props);
    const { place } = this.props;

    this.state = {
      place: { ...place },
      ...defaultState
    };
  }


  componentWillReceiveProps(nextProps) {
    console.log(`componentWillReceiveProps`)
    this.setState({
      place: { ...nextProps.place },
      ...defaultState
    })
  }

  /**
   * returns a message or null if the value is valid
   */
  _validateField = (fieldName, value) => {
    let msg = null
    typeof value === "string" && (value = value.trim());
    switch (fieldName) {
      case "name":
        if (!value) {
          msg = "Place name is required";
        } else {
          if (value.length < 3) {
            msg = "Place name must be at least 3 characters";
          }
        }
        break;
      case "notes":
      case "city":
      case "transportation":
      case "street_address":
        if (!value) {
          msg = "This field is required";
        }

    }
    return msg
  }

  onChange = (fieldName, value) => {
    const changedPlace = { ...this.state.place, [fieldName]: value };
    this.setState({
      changedFields: [...new Set([...this.state.changedFields, fieldName])],
      place: changedPlace
    }, () => {
      // this.validateField(fieldName, value);
      console.log("state changed:", JSON.stringify(this.state.place, 2, 2));
    });
  };

  getValidationMessages(onlyChangedFields = true) {
    const validationMessages = 'name city street_address transportation notes'.split(' ')
      .reduce((acc, field) => {
        const skip = onlyChangedFields && !this.state.changedFields.includes(field)
        const msg = skip ? null : this._validateField(field, this.state.place[field])
        acc[field] = msg
        return acc
      }, {})
    return validationMessages
  }
  formValid() {
    return Object.values(this.getValidationMessages(false)).find(i => i !== null) === undefined
  }

  render() {
    const validationMessages = this.getValidationMessages()
    console.log('validationMessages', validationMessages);
    console.log('state', this.state)
    // debugger
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
                    <ValidationErrors hasError={validationMessages.name} message={validationMessages.name} />
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
                    <ValidationErrors hasError={validationMessages.street_address} message={validationMessages.street_address} />
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
                    <ValidationErrors hasError={validationMessages.city} message={validationMessages.city} />
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
                    <ValidationErrors hasError={validationMessages.transportation} message={validationMessages.transportation} />
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
                      // required={true}
                      initialValue={notes}
                    />
                    <ValidationErrors hasError={validationMessages.notes} message={validationMessages.notes} />
                  </>
                )}
            </p>
          </div>
        </form>

        {editMode ? (
          <div>
            <button disabled={!this.formValid()} onClick={ev => this.props.onSubmitPlace(this.state.place)}>
              Save
            </button>
            <button onClick={ev => this.props.cancelAddPlace()}>Cancel</button>{" "}
          </div>
        ) : null}
      </div>
    );
  }
}
