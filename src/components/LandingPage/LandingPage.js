import React, {Component} from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import './LandingPage.css'
export default class LandingPage extends Component{
    render(){
        return(
            <div>
                
                 <NavBar/>
                 <div className='landing-page flex-column '>
                <h1 >Welcome to Where To Go!</h1>
          <p >Get started by adding a new trip!</p>
          
         <Link to='/add-trip'> <button>Add Trip</button></Link>
        
         </div>
        
            </div>
        )
    }
}