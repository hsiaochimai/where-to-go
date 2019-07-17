import React, { Component } from "react";
import { checkLoginAndRedirect } from "../../helpers";
import ds from "../../STORE/dataService";
import whereToGoContext from "../whereToGoContext/whereToGoContext";
import TripList from "../TripList/TripList";
import PlaceList from "./PlaceList";
import EditTrip from "../EditTrip/EditTrip";
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import "./TripPage.css";
import NavBar from "../NavBar/NavBar";
const { deleteTrip } = ds;
export default class TripPage extends Component {
  static contextType = whereToGoContext;
  constructor(props) {
    super(props);
    this.state = {
      selectedTripID: null,
      editMode: false,
      selectedPlaceID: null
    };
    this.placeListRef = null
  }
  onSaveTrip = async trip => {
    await ds.saveTrip(trip);
    this.loadData();
    this.setState({ editMode: false })
  };

  onDeletePlace = async placeID => {
    await ds.deletePlace(placeID);
    this.loadData();
  };

  cancelButton = () => {
    this.setState({ editMode: false })
  }
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

    return (

      <div className="tab-page">
        <NavBar />
        <div className="trip-page-container">
          <TripList trips={trips} onTripSelected={this.onTripSelected} />


          <div className='column50'>
            <div className='title-container'>
              {!selectedTrip || this.state.editMode ? null : (
                <div className={`action-buttons  ${editModeClass}`}>
                  <button onClick={() => this.onEdit()}> <Icon icon="edit" /> Edit</button>
                  <button onClick={() => deleteTrip(selectedTrip.id)}>
                    <Icon icon="trash" />
                    Delete
              </button>
                </div>
              )}
              <div className='title'>
                <div className={`welcome ${selectedTrip ? "hide" : ''}`}>
                  <h2>Please Select a trip</h2>
                </div>
                <h2 className={`barTitle padded ${editModeClass}`}>
                  {!selectedTrip ? null : selectedTrip.name}
                </h2>
                <h2 className={`barTitle padded ${editModeClass}`}>
                  {!selectedTrip
                    ? null
                    : `Number of Days: ${selectedTrip.numOfDays} days`}
                </h2>

                {this.state.editMode ? (
                  <EditTrip onSaveTrip={this.onSaveTrip} trip={selectedTrip} cancelButton={this.cancelButton} />
                ) : null}
              </div>

              {/* {!selectedTrip  ? null : (
            <div className={`action-buttons  ${editModeClass}`}>
              <button onClick={() => this.onEdit()}>Edit</button>
              <button onClick={() => deleteTrip(selectedTrip.id)}>
                Delete
              </button>
            </div>
          )} */}
            </div>

            {!this.state.selectedTripID ? null : (
              <>
                {/* <button onClick={ev=>{this.placeListRef && this.placeListRef.addPlace()}}>Add Place</button> */}
                <PlaceList
                  key={selectedTrip.id}
                  ref={ref => this.placeListRef = ref}
                  trip={selectedTrip}
                  onDeletePlace={this.onDeletePlace} /></>
            )}
          </div>



        </div>
      </div>

    );
  }
}
