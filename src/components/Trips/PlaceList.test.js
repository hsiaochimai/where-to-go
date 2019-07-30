import React from 'react';
import ReactDOM from 'react-dom';
import PlaceList from './PlaceList';
import { BrowserRouter, } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PlaceList onDeletePlace={()=>{}} onSavePlace={()=>{}}/> , div)
  ReactDOM.unmountComponentAtNode(div);
});