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

export default class BasePage extends Component {
    static contextType = whereToGoContext
    componentDidMount = async () => {
        //if not logged in then redirect to login
        if (!(await checkLoginAndRedirect(this.props.history))) {
            return;
        }
        //logged in, so load the data
        return

    };
}