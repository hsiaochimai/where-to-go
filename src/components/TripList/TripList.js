import React, {Component} from 'react'
import pt from 'prop-types'
export default class TripList extends Component{
    static propTypes= {
        trips:pt.object.isRequired,
      }
    render(){
        const trips= [...this.props.trips]
        const tripList= trips.map((trip, i)=>{
return <div>
    <h2>{trip.name}</h2>
</div>
        })
        console.log(this.props)
        return(<div>
            {tripList}
            hi!</div>)
    }
}