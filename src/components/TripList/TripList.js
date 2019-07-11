import React, {Component} from 'react'
import pt from 'prop-types'
export default class TripList extends Component{
    static propTypes= {
        trips:pt.object.isRequired,
      }
    render(){
        const trips= [...this.props.trips]
        const tripList= trips.map((trip, i)=>{
return <h2 className='padded' onClick={e=>this.props.onTripSelected(trip.id)}>{trip.name}</h2>

        })
        return(
        <div className='tripList'>
            {tripList}
            </div>)
    }
}