import React from 'react';
import ReactDOM from 'react-dom';
import EditPlace from './EditPlace';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EditPlace  /> , div)
  ReactDOM.unmountComponentAtNode(div);
});