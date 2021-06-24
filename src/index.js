import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import Form from './Form.js';

const main = document.getElementsByTagName('main')[0];

ReactDOM.render(
  <StrictMode>
    <Form />
  </StrictMode>,
  main
);
