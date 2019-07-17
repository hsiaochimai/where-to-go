import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
export default class NavBar extends Component {
    render() {
        return (
            <nav className='nav-bar'>
                <ul>
                    <li> <Link to='/dashboard'>Dashboard</Link></li>
                    <li> <Link to='/add-trip'>Add trip</Link> </li>
                    <li><a onClick={this.props.onLogout} href="#">Logout</a></li>
                </ul>
            </nav>
        )
    }
}