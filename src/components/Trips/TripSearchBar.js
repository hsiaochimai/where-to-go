import React, {Component} from 'react'
import whereToGoContext from '../whereToGoContext/whereToGoContext'
import Select from "react-select";
import PlaceList from './PlaceList'
export default class TripSearchBar extends Component{
    static contextType= whereToGoContext
    constructor(props){
        super(props)
        this.state= {selectedTripID: null}
    }
onTripSelected=(tripValue)=>{
this.setState({selectedTripID:tripValue})
}

    render(){
        const tripOpts= [...this.context.trips].map(trip=>{
const options={value:trip.id, label:trip.name}
return options
        })
        console.log(this.context)
        return(
        <div>
            <Select options= {tripOpts}
            onChange={e=>this.onTripSelected(e.value)}/>
             <h2 className="barTitle">{this.state.selectedTripID}</h2> 
            <PlaceList trip={this.state.selectedTripID}/> 
        </div>)
    }
}