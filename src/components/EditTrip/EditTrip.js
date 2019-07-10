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
        console.log(`edit trip`, this.state.trip)
        // const{
        //     name,
        //     numOfdays
        // }=this.props.trip
        return(<div>
            hi!
            <form>
          <p>
            <span>Name</span>
                <ControlledInput
                //   onChange={value => this.onChange("full_name", value)}
                  tag="input"
                  type="text"
                  required={true}
                //   initialValue={name}
                //   editMode={editMode}
                />
              
          </p>
          </form>
        </div>)
    }
}