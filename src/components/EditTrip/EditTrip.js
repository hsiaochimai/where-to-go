import React, { Component } from "react";
import ControlledInput from "../ControlledInput/ControlledInput";

export default class EditTrip extends Component {
  constructor(props) {
    super(props);
    const { trip } = this.props;
    this.state = {
      trip: { ...trip }
    };
  }
  onChange = (fieldName, value) => {
    const changedTrip = { ...this.state.trip, [fieldName]: value };
    this.setState({ trip: changedTrip }, () => {
      console.log("state changed:", JSON.stringify(this.state.trip, 2, 2));
    });
  };
  render() {
    console.log(`edit trip`, this.state);
    const { name, numOfDays } = this.state.trip;

    return (
      <div>
        <form>
          <p>
            <span>Name</span>
            <ControlledInput
              onChange={value => this.onChange("name", value)}
              tag="input"
              type="text"
              required={true}
              initialValue={name}
              //   editMode={editMode}
            />
          </p>
          <p>
            <span>Duration of Stay</span>
            <ControlledInput
                onChange={value => this.onChange("numOfDays", value)}
              tag="input"
              type="number"
              min="1"
              required={true}
              initialValue={numOfDays}
              //   editMode={editMode}
            />
            days
          </p>
        </form>
      </div>
    );
  }
}
