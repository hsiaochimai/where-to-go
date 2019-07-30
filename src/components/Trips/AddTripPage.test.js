import React from 'react';
import ReactDOM from 'react-dom';
import AddTripPage from './AddTripPage';
import history from '../../history'
import { Router, Route } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router history={history}><AddTripPage location={{}} /></Router>, div)
  ReactDOM.unmountComponentAtNode(div);
});