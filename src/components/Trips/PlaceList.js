import React, { Component } from 'react'
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import ds from '../../STORE/dataService'
import EditPlace from '../EditPlace/EditPlace'
import './PlaceList.css'
import pt from 'prop-types'
// import whereToGoContext from '../whereToGoContext/whereToGoContext'
const {deletePlace, savePlace} = ds
export default class PlaceList extends Component {
    // static contextType= whereToGoContext
    static propTypes = {
        trip: pt.object //a trip object with associated places
    }
    constructor(){
        super()
        this.state={
            editModeIndex:null,
            }
    }
    toggleeditModeIndex = (index) => {
        // const { editModeIndex } = this.state
        this.setState({
            editModeIndex: index -1
        })
    }
    onSubmitPlace= async ( place) =>{
        await savePlace(place)
        console.log(this.props)
    }
    render() {
        // console.log(this.props)
        console.log(`this is placelist state`, this.state);
        const trip = this.props.trip
        if (!trip) {
            return null
        }
        const tripPlaces = trip.places

        const placeCard = tripPlaces.map((place, index) => {
            const isEditing = this.state.editModeIndex === index
            const card = 
                 <div className='placeCard'>
                     <div className='action-buttons'>
                         
                 <button onClick={()=>this.toggleeditModeIndex(place.id)}>Edit</button>
                 <button onClick={()=>deletePlace(place.id)} >Delete</button>
                 </div>
                <div className="cardContent padded">
                    <EditPlace place={place} editMode={isEditing} onSubmitPlace={this.onSubmitPlace}/>
            
                    </div>
                
                </div>
            
            return card
        })
        return (
            <div className='placeList'>
               
                {placeCard}
            </div>
        )
    }
}