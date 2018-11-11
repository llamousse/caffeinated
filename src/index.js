import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter } from "react-router-dom";

import './index.css';
import './reset.css';

import Routing from './routes';
//import Home from './home';

ReactDOM.render(
  <Routing />, // App <header><Router><Footer>
  document.getElementById('root')
);
