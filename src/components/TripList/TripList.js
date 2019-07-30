import React, { Component } from 'react'
import pt from 'prop-types'
import Select from 'react-select'
export default class TripList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: null
        }
    }
    static propTypes = {
        trips: pt.array.isRequired,
    }
    selectTrip = trip => {
        this.setState({
            selected: trip
        }, () => {
            this.props.onTripSelected(trip.id)
        })
    }
    render() {
        const trips = [...this.props.trips]
        const tripList = trips.map((trip, i) => {
            const options = { value: trip.id, label: trip.name }
            return options
            // return <h2 key={i} className='padded' onClick={(e)=>{this.props.onTripSelected(trip.id); this.toggleList()}}>{trip.name}</h2>

        })
        const largeTrip = [...this.props.trips]
        const largeTripList = largeTrip.map((trip, i) => {
            const isSelected = trip === this.state.selected
            return <li
                key={i}
                className={`largeTrips  ${isSelected ? 'active' : ''} `}>
                <a key={i} className='padded ' onClick={(e) => { this.selectTrip(trip) }} href="#">{trip.name}</a></li>
        })

        return (
            <>
                <div className={`tripList `} >
                    <div className='tripList-select'><Select options={tripList}
                        onChange={e => this.props.onTripSelected(e.value)} /></div>
                    <div className='largeTripList'>
                        <nav className="padded">
                            <ul>
                                {largeTripList}
                            </ul>
                        </nav>
                    </div>
                </div>

            </>)
    }
}