import React from 'react';
import ReactDOM from 'react-dom';
import TripList from './TripList';
import store from '../../STORE/store'
import { BrowserRouter, } from 'react-router-dom'
import TripSearchBar from '../Trips/TripSearchBar';

it('renders without crashing', () => {
    const{users, trips, places}= store
  const div = document.createElement('div');
  ReactDOM.render(<TripList trips={trips}/> , div)
  ReactDOM.unmountComponentAtNode(div);
});