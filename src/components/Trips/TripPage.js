import React, { Component } from "react";
import TripSearchBar from "./TripSearchBar";
import { checkLoginAndRedirect } from "../../helpers";
import ds from "../../STORE/dataService";
import whereToGoContext from "../whereToGoContext/whereToGoContext";
import TripList from "../TripList/TripList";
import PlaceList from "./PlaceList";
import EditTrip from "../EditTrip/EditTrip";
import "./TripPage.css";
import NavBar from "../NavBar/NavBar";
const { deleteTrip } = ds;
export default class TripPage extends Component {
  static contextType = whereToGoContext;
  constructor(props) {
    super(props);
    this.state = {
      selectedTripID: null,
      editMode: false
    };
  }
  onSaveTrip = async trip => {
    await ds.saveTrip(trip);
    this.loadData();
  };

  loadData = async () => {
    try {
      const trips = await ds.getTrips();
      this.context.set({ trips });
      // success toast
    } catch (e) {
      //error toast
    }
  };
  componentDidMount = async () => {
    //if not logged in then redirect to login
    if (!(await checkLoginAndRedirect(this.props.history))) {
      return;
    }
    //logged in, so load the data
    return this.loadData();
  };
  onTripSelected = tripId => {
    console.log(`hello trip selected`, tripId);
    this.setState({ selectedTripID: tripId });
  };
  onEdit = () => {
    this.setState({
      editMode: true
    });
  };

  render() {
    const trips = [...this.context.trips];
    const selectedTrip = trips.find(t => t.id === this.state.selectedTripID);
    console.log(`hello trip selected`, selectedTrip);
    const editModeClass = this.state.editMode === true ? "hide" : "";
    console.log(this.state);
    return (
        
      <div className="tab-page">
          <NavBar/>
        <div className="trip-page-container  flex-row">
          <TripList trips={trips} onTripSelected={this.onTripSelected}/>


       <div className='column50'>
         <div className='title-container flex-row'>
         <div className='title'>
          <h2 className={`barTitle padded ${editModeClass}`}>
            {!selectedTrip ? "Please select" : selectedTrip.name}
          </h2>
          <h2 className={`barTitle padded ${editModeClass}`}>
            {!selectedTrip
              ? null
              : `Duration of stay: ${selectedTrip.numOfDays} days`}
          </h2>
          
          {this.state.editMode ? (
            <EditTrip onSaveTrip={this.onSaveTrip} trip={selectedTrip} />
          ) : null}
          </div>

          {!selectedTrip  ? null : (
            <div className={`action-buttons  ${editModeClass}`}>
              <button onClick={() => this.onEdit()}>Edit</button>
              <button onClick={() => deleteTrip(selectedTrip.id)}>
                Delete
              </button>
            </div>
          )}
</div>

          {!this.state.selectedTripID ? null : (
            <PlaceList trip={selectedTrip} />
          )}
</div>


          {/* <TripSearchBar
            onSaveTrip={this.onSaveTrip}
            trips={this.context.trips}
          /> */}
        </div>
        </div>
      
    );
  }
}
