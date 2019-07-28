import React, { Component } from 'react'
import whereToGoContext from '../whereToGoContext/whereToGoContext'
import Select from "react-select";
import PlaceList from './PlaceList'
import EditTrip from '../EditTrip/EditTrip'
import './TripPage.css'
import ds from '../../STORE/dataService'
import pt from 'prop-types'
import TripList from '../TripList/TripList'
const {deleteTrip}=ds
export default class TripSearchBar extends Component {
    // static contextType = whereToGoContext
    static propTypes = {
        trips: pt.array.isRequired //an array of trip objects with associated places
    }

    constructor(props) {
        super(props)
        this.state = { 
            selectedTripID: null,
            editMode:false
        }
    }
    onTripSelected = (tripValue) => {
       
        this.setState({ selectedTripID: tripValue.value })
    }
onEdit=() =>{
    this.setState({
        editMode:true
    })
}

    render() {
        const selectedTrip = this.props.trips.find(t => t.id === this.state.selectedTripID)
       
        const tripOpts = [...this.props.trips]
        
        // .map(trip => {
        //     const options = { value: trip.id, label: trip.name }
        //     return options
        // })
        const editModeClass= this.state.editMode=== true ?'hide':''
        
        return (
            <div>
                <TripList trips={tripOpts}/>
                <Select options={tripOpts}
                    onChange={e => this.onTripSelected(e)} />
                {!selectedTrip? null : 
                <div className='action-buttons'>
                <button onClick={()=>this.onEdit()}>Edit</button>
                <button onClick={()=> deleteTrip(selectedTrip.id)}>Delete</button>
                </div>
                }
                <h2 className={`barTitle ${editModeClass}`}>{!selectedTrip ? 'Please select' : selectedTrip.name}</h2>
                <h2 className={`barTitle ${editModeClass}`}>{!selectedTrip ? null : `Duration of stay: ${selectedTrip.numofdays} days`}</h2>
              {this.state.editMode? <EditTrip 
              onSaveTrip={this.props.onSaveTrip}
              trip={selectedTrip}/>: null}
                {(!this.state.selectedTripID ?
                    null :
                    <PlaceList trip={selectedTrip} />
                )}
            </div>)
    }
}