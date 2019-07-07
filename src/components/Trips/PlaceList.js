import React, {Component} from 'react'
import { Card, CardHeader, CardBody, CardFooter } from "react-simple-card";
import whereToGoContext from '../whereToGoContext/whereToGoContext'
export default class PlaceList extends Component{
    static contextType= whereToGoContext
render(){
    console.log(this.props)
    const tripID=this.props.trip
    const tripPlaces= [...this.context.places].filter(place=>place.trip_id===tripID)
   
    const placeCard= tripPlaces.map((place, i)=>{
     const card=   <Card key={i}>
        <CardHeader>Name: {place.name}</CardHeader>
        <CardBody><li>Addresss: {place.street_address}</li>
        <li>City: {place.city}</li>
        <li>Transporation: {place.transportation}</li>
        <p>Notes: {place.notes}</p>
        </CardBody>
        <CardFooter>{place.id}</CardFooter>
      </Card>
      return card
    })
    return(
        <div>
 {placeCard}
    </div>
    )
}
}