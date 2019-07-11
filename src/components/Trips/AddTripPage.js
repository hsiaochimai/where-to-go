import React, { Component } from "react";
import ControlledInput from "../ControlledInput/ControlledInput";
import whereToGoContext from '../whereToGoContext/whereToGoContext'
import { checkLoginAndRedirect } from "../../helpers";
import EditTrip from '../EditTrip/EditTrip'
import ds from '../../STORE/dataService'
const defaultTrip = {
  id: -1,
  name: "",
  numOfDays: null,
  user_id: null,
  completed: false
};

export default class AddTripPage extends Component {
    static contextType = whereToGoContext
  onSaveTrip = async trip => {

    await ds.saveTrip(trip);
    this.props.history.push("/dashboard")
  };

  componentDidMount = async () => {
    //if not logged in then redirect to login
    if (!(await checkLoginAndRedirect(this.props.history))) {
      return;
    }
    //logged in, so load the data
    return 
    
  };

  render() {
      console.log(this.context)
    return (
      <div>
        Add Trip
        <EditTrip 
              onSaveTrip={this.onSaveTrip}
              trip={defaultTrip}/>
      </div>
    );
  }
}
