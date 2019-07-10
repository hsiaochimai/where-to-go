import React, { Component } from "react";
import ControlledInput from "../ControlledInput/ControlledInput";

export default class EditTrip extends Component{
    constructor(props) {
        super(props);
        const {trip} = this.props
        this.state={
            ...trip
        }
    
      }
    render(){
      
        console.log(`edit trip`, this.props.trip)
        // const{
        //     name,
        //     numOfdays
        // }=this.props.trip
        return(<div>
            <form>
          <p>
            <span>Name</span>
                <ControlledInput
                //   onChange={value => this.onChange("full_name", value)}
                  tag="input"
                  type="text"
                  required={true}
                  initialValue={this.props.trip.name}
                //   editMode={editMode}
                />
              
          </p>
          <p>
            <span>Duration of Stay</span>
                <ControlledInput
                //   onChange={value => this.onChange("full_name", value)}
                  tag="input"
                  type="number"
                  required={true}
                  initialValue={this.props.trip.numOfDays}
                //   editMode={editMode}
                />
              days
          </p>
          </form>
        </div>)
    }
}