import React, { Component } from 'react';
import './css/styles.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Components/Router';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    );
  }
}
