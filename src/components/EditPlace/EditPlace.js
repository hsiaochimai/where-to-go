import React, { Component } from "react";
import ControlledInput from "../ControlledInput/ControlledInput";

export default class EditPlace extends Component{
    constructor(props) {
        super(props);
        const { place } = this.props;
        this.state = {
        place: {...place}
    
        }
}
onChange = (fieldName, value) => {
    const changedPlace = { ...this.state.place, [fieldName]: value };
    this.setState({ place: changedPlace }, () => {
      console.log("state changed:", JSON.stringify(this.state.place, 2, 2));
    });
  };
 
render(){
    console.log(`edit place`, this.state);
    const {
        name,
        street_address,
        city,
        transportation,
        notes,
        
      } = this.state.place;
      const { editMode } = this.props;
    return(
        <div className='cardContent padded'>
            <form onSubmit={e=>{this.onSubmitPlace(this.state.place)}}>
            <p>
            <span className='padded'>Name</span>
            {!editMode ? (
              name
            ) : (
                <ControlledInput
                  onChange={value => this.onChange("name", value)}
                  tag="input"
                  type="text"
                  required={true}
                  initialValue={name}
                  
                />
              )}
          </p>
          <p>
            <span className='padded'>Address</span>
            {!editMode ? (
              street_address
            ) : (
                <ControlledInput
                  onChange={value => this.onChange("street_address", value)}
                  tag="input"
                  type="text"
                  required={true}
                  initialValue={street_address}
                  
                />
            )}
                </p>
                <p>
            <span className='padded'>City</span>
            {!editMode ? (
              city
            ) : (
                <ControlledInput
                  onChange={value => this.onChange("city", value)}
                  tag="input"
                  type="text"
                  required={true}
                  initialValue={city}
                  
                />
            )}
                </p>
                <p>
            <span className='padded'>Transportation</span>
            {!editMode ? (
              transportation
            ) : (
                <ControlledInput
                  onChange={value => this.onChange("transportation", value)}
                  tag="input"
                  type="text"
                  required={true}
                  initialValue={transportation}
                  
                />
            )}
                </p>
                <p>
            <span className='padded'>Notes</span>
            {!editMode ? (
              notes
            ) : (
                <ControlledInput
                  onChange={value => this.onChange("notes", value)}
                  tag="textarea"
                  type="text"
                  required={true}
                  initialValue={notes}
                  
                />
            )}
                </p>
                
                </form>

                <button onClick={ev => this.props.onSubmitPlace(this.state.place)}>Save</button>

        </div>
    )
}
}