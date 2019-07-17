import React, { Component } from "react";
import ControlledInput from "../ControlledInput/ControlledInput";
import whereToGoContext from '../whereToGoContext/whereToGoContext'
import { checkLoginAndRedirect } from "../../helpers";
import EditTrip from '../EditTrip/EditTrip'
import ds from '../../STORE/dataService'
import NavBar from '../NavBar/NavBar'
import './AddTripPage.css'
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
  cancelButton = () => {
    this.props.history.push("/home")
  }
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
      <>
        <NavBar onLogout={this.context.doLogout} />
        <div className='addTrip-Container'>
          <div className='addTripPage padded'>
            <h2>Add Trip</h2>
            <EditTrip
              onSaveTrip={this.onSaveTrip}
              trip={defaultTrip}
              cancelButton={this.cancelButton} />
          </div>
        </div>
      </>
    );
  }
}
