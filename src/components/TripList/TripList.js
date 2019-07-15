import React, {Component} from 'react'
import pt from 'prop-types'
import Select from 'react-select'
export default class TripList extends Component{
    constructor(props){
        super(props)
        this.state={
            visible:true
        }
    }
    static propTypes= {
        trips:pt.array.isRequired,
      }
    toggleList=()=>{
        console.log('hello toggle')
        this.setState({
            visible:false
        })
    }
    render(){
        const trips= [...this.props.trips]
        const isVisible=this.state.visible=== false ? 'hide' : null
        const tripList= trips.map((trip, i)=>{
            const options = { value: trip.id, label: trip.name }
            return options
// return <h2 key={i} className='padded' onClick={(e)=>{this.props.onTripSelected(trip.id); this.toggleList()}}>{trip.name}</h2>

        })
        const largeTripList=trips.map((trip, i)=>{
            return <div className='largeTripList'><h2 key={i} className='padded ' onClick={(e)=>{this.props.onTripSelected(trip.id)}}>{trip.name}</h2></div>
        })
        console.log(this.state)
        return(
            <>
        <div className={`tripList ${isVisible}`} >
        <div className='tripList-select'><Select options={tripList}
        onChange={e => this.props.onTripSelected(e.value)}/></div>
          {largeTripList}
            </div>
            
            </>)
    }
}