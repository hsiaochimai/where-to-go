import React, { Component } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import ds from "../../STORE/dataService";
import EditPlace from "../EditPlace/EditPlace";
import "./PlaceList.css";
import pt from "prop-types";
// import whereToGoContext from '../whereToGoContext/whereToGoContext'
const { deletePlace, savePlace, getTrips } = ds;
const newPlaceTemplate = {
  id: -1,
  name: "",
  trip_id: null,
  street_address: "",
  city: "",
  transportation: "",
  notes: "",
  visited: false
};
export default class PlaceList extends Component {
  // static contextType= whereToGoContext
  static propTypes = {
    trip: pt.object //a trip object with associated places
  };
  constructor(props) {
    super(props);
    this.state = {
      editModeIndex: null,
      newPlace: null
    };
    // this.placeListRefs = []
  }
  toggleeditModeIndex = index => {
    const { editModeIndex } = this.state;
    console.log(index);
    this.setState({
      editModeIndex: editModeIndex === index ? -1 : index
    });
  };
  addPlace = () => {
    const newPlace = { ...newPlaceTemplate }
    newPlace.trip_id = this.props.trip.id;

    this.setState({
      newPlace,
      editModeIndex: 0
    });
  };
  loadData = async () => {
    try {
      const trips = await getTrips();
      this.context.set({ trips });
      // success toast
    } catch (e) {
      //error toast
    }
  };
  onDeletePlace = async id => {
    await deletePlace(id);
    this.loadData();
  };
  onSubmitPlace = async place => {
    await savePlace(place);
    this.loadData();
    this.setState({
      editModeIndex: null,
      newPlace: null
    });
  };
  cancelAddPlace = () => {
    const trip = this.props.trip;
    const tripPlaces = trip.places;
    const newTrip = tripPlaces.findIndex(p => p.id === -1);
    console.log(newTrip);
    if (newTrip >= 0) {
      // tripPlaces.splice(newTrip, 1)
      tripPlaces.splice(newTrip, 1);
    }

    this.setState({
      editModeIndex: false,
      newPlace: null
    });
  };
  //   componentDidUpdate() {
  //    this.props.loadData()
  // }
  render() {
    const trip = this.props.trip;
    if (!trip) {
      return null;
    }
    const tripPlaces = trip.places;
    if (this.state.newPlace) {
      tripPlaces.unshift(this.state.newPlace);
    }
    const placeCard = tripPlaces.map((place, index) => {
      const isEditing = this.state.editModeIndex === index;
      const editingModeClassName = isEditing ? "hide" : "";
      const card = (
        <div key={index} className="placeCard">
          {!this.state.newPlace ? (
            <div className="action-buttons">
              <button
                className={editingModeClassName}
                onClick={() => this.toggleeditModeIndex(index)}
              >
                 <Icon icon="edit" /> 
                Edit
              </button>
              <button
                className={editingModeClassName}
                onClick={() => this.onDeletePlace(place.id)}
              >
                 <Icon icon="trash" /> 
                Delete
              </button>
            </div>
          ) : null}
          <div className="cardContent padded">
            <EditPlace
              key={place.id}
              place={place}
              editMode={isEditing}
              onSubmitPlace={this.onSubmitPlace}
              cancelAddPlace={this.cancelAddPlace}
              // ref={(r) => this.placeListRefs[index] = r}
            />
            {/* <button onClick={() => {

if (!this.placeListRefs[index]) {
    return
}
this.placeListRefs[index].savePlace()
    .then(() => { })
    .catch(() => { })
    .finally(() => { })
}}
className={`saveButton flexed `} >Save</button>
<button onClick={() => this.cancelAddPlace()} className={`cancelButton flexed `}>Cancel</button> */}
          </div>
        </div>
      );

      return card;
    });
    return (
    <div className="placeList">
      <button className='addPlace' disabled={this.state.newPlace} onClick={()=>this.addPlace()}> <Icon icon="map-marked-alt" /> Add Place</button>
    {placeCard}
    </div>);
  }
}
