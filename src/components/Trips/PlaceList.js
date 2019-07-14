import React, { Component } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import ds from "../../STORE/dataService";
import EditPlace from "../EditPlace/EditPlace";
import "./PlaceList.css";
import pt from "prop-types";
// import whereToGoContext from '../whereToGoContext/whereToGoContext'
const { deletePlace, savePlace } = ds;
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
  }
  toggleeditModeIndex = index => {
    const { editModeIndex } = this.state;
    console.log(index);
    this.setState({
      editModeIndex: editModeIndex === index ? -1 : index
    });
  };
  onAddPlace = () => {
    newPlaceTemplate.trip_id = this.props.trip.id;
    this.setState({
      newPlace: newPlaceTemplate,
      editModeIndex: 0
    });
    
  };
  onSubmitPlace = async place => {
    await savePlace(place);
    this.setState({
      editModeIndex: null,
      newPlace: null
    });
    
  };
  onCancelPlace=()=>{
    this.setState({
      editModeIndex: null
    });
  }
  render() {
    // console.log(this.props)
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
      const card = (
        <div className="placeCard">
          <div className="action-buttons">
            <button onClick={() => this.toggleeditModeIndex(index)}>
              Edit
            </button>
            <button onClick={() => deletePlace(place.id)}>Delete</button>
          </div>
          <div className="cardContent padded">
            <EditPlace
              place={place}
              editMode={isEditing}
              onSubmitPlace={this.onSubmitPlace}
              onCancelPlace={this.onCancelPlace}
            />
          </div>
        </div>
      );

      return card;
    });
    return (
      <div className="placeList">
        <button onClick={() => this.onAddPlace()}>Add Place</button>
        {placeCard}
      </div>
    );
  }
}
