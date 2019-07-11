import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
export default class NavBar extends Component{
    render(){
        return(
            <nav className='nav-bar'>
                <ul>
             <li> <Link to='/home'>Home</Link> </li>
             <li> <Link to='/dashboard'>Dashboard</Link></li>
              <li>Logout </li>
              </ul>
            </nav>
        )
    }
}