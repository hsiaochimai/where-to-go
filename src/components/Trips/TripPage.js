import React, { Component } from "react"
import TripSearchBar from './TripSearchBar'
import PlaceList from './PlaceList'
import { checkLoginAndRedirect } from '../../helpers'
import ds from '../../STORE/dataService'
import whereToGoContext from '../whereToGoContext/whereToGoContext'
export default class TripPage extends Component {
    static contextType = whereToGoContext

    componentDidMount = async () => {

        //if not logged in then redirect to login
        if (! await checkLoginAndRedirect(this.props.history)) {
            return
        }
        //logged in, so load the data
        const trips = await ds.getTrips()
        this.context.set({ trips })
    }
    render() {
        return (
            <div className='tab-page'>
                <div className="padded">
                    <TripSearchBar trips={this.context.trips} />

                </div>
               
            </div>
        )
    }
}