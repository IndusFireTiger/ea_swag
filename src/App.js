import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js'
import Home from './components/Home.js'
import Cars from './components/Cars.js'
import Bikes from './components/Bikes.js'
import Shows from './components/Shows.js'
import Navigation from './components/Navigation.js'
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header></Header>
            <Navigation></Navigation>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/cars" component={Cars} />
              <Route path="/bikes" component={Bikes} />
              <Route path="/shows" component={Shows} />
              <Route component={Home} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
