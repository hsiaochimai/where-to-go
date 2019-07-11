import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component{
    render(){
        return(
            <nav>
              <Link to='/home'>Home</Link> 
              <Link to='/dashboard'>Dashboard</Link>
              <button>Logout</button> 
            </nav>
        )
    }
}