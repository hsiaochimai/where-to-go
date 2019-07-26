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
            <div>

                <NavBar onLogout={this.context.doLogout} />
                <div className='landing-page flex-column '>
                    <h1 >Welcome to Where To Go!</h1>
                    <p >Get started by adding a new trip!</p>

                    <Link to='/add-trip'> <button>  <Icon icon="suitcase" /> Add Trip</button></Link>

                </div>

            </div>
        )
    }
}