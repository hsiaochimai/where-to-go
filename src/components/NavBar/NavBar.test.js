import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './NavBar';
import { BrowserRouter, } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><NavBar location={{}}/></BrowserRouter> , div)
  ReactDOM.unmountComponentAtNode(div);
});