import React, {Component} from "react"
import TripSearchBar from './TripSearchBar'
import PlaceList from './PlaceList'
export default class TripPage extends Component{
    render(){
        return(
            <div className='tab-page'>
                <div className="padded">
                <TripSearchBar />
                      
                </div>
                <PlaceList /> 
            </div>
        )
    }
}