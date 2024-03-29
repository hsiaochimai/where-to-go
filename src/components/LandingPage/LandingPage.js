import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import whereToGoContext from "../whereToGoContext/whereToGoContext";
import './LandingPage.css'
export default class LandingPage extends Component {
    static contextType = whereToGoContext;
    render() {
        return (
            <>
                <NavBar onLogout={this.context.doLogout} />
                <div className='landing-page flex-column flexed padded '>
                    <h1 >Welcome to Where To Go!</h1>
                    <p >Get started by adding a new trip!</p>
                    <div>
                        <Link className="button" to='/add-trip'>   <Icon icon="suitcase" /> Add Trip </Link>
                    </div>

                </div>
            </>
        )
    }
}