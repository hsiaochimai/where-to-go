import React, {Component} from 'react'
import whereToGoContext from '../whereToGoContext/whereToGoContext'
import Select from "react-select";
export default class TripSearchBar extends Component{
    static contextType= whereToGoContext
    constructor(props){
        super(props)
        this.state= {selectedTrip: null}
    }
// onTripSelected=()=>{
// this.setState()
// }

    render(){
        const tripOpts= [...this.context.trips].map(trip=>{
const options={value:trip.id, label:trip.name}
return options
        })
        console.log(this.context)
        return(
        <div>
            <Select options= {tripOpts}/>
        </div>)
    }
}