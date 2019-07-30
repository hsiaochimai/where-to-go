import React from 'react';
import ReactDOM from 'react-dom';
import EditTrip from './EditTrip';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditTrip  onSaveTrip={()=>{}}
    trip={{}}
    cancelButton={()=>{}}/> , div)
  ReactDOM.unmountComponentAtNode(div);
});