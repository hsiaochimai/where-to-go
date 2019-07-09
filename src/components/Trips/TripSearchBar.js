import React, { Component } from 'react'
import whereToGoContext from '../whereToGoContext/whereToGoContext'
import Select from "react-select";
import PlaceList from './PlaceList'
import pt from 'prop-types'
export default class TripSearchBar extends Component {
    // static contextType = whereToGoContext
    static propTypes = {
        trips: pt.array.isRequired //an array of trip objects with associated places
    }

    constructor(props) {
        super(props)
        this.state = { selectedTripID: null }
    }
    onTripSelected = (tripValue) => {
        this.setState({ selectedTripID: tripValue })
    }

    render() {
        const selectedTrip = this.props.trips.find(t => t.id === this.state.selectedTripID)
        const tripOpts = [...this.props.trips].map(trip => {
            const options = { value: trip.id, label: trip.name }
            return options
        })
        // console.log(this.context)
        return (
            <div>
                <Select options={tripOpts}
                    onChange={e => this.onTripSelected(e.value)} />
                <h2 className="barTitle">{!selectedTrip ? 'Please select' : selectedTrip.name}</h2>

                {(!this.state.selectedTripID ?
                    null :
                    <PlaceList trip={selectedTrip} />
                )}
            </div>)
    }
}