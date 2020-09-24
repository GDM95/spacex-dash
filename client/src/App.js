import React, { Component, useEffect, useState } from 'react';
import './App.css'

import Toolbar from './components/Toolbar';
import Backdrop from './components/Backdrop';
import SideDrawer from './components/SideDrawer/SideDrawer';
import TweetFeed from './components/TweetFeed'
import Home from './components/Home'
import LaunchInfo from './components/LaunchInfo'
import { BrowserRouter as Router, Switch, Route, Redirect  } from 'react-router-dom';


const App = (props) => {

  const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
  const drawerToggleClickHandler = () => {
    console.log('Drawer clicked!')
    setSideDrawerOpen(!sideDrawerOpen)
  }

  const backdropClickHandler = () => {
    setSideDrawerOpen(false)
  }

  const drawerLinkClickHandler = () => {
    setSideDrawerOpen(false)
  }

  
  const backdrop = () => {
    if(sideDrawerOpen){
      return <Backdrop click={backdropClickHandler} />
    }
  }

  return (
    <Router>
        <div className="App">
          <Toolbar drawerClickHandler={drawerToggleClickHandler} />
          <SideDrawer show={sideDrawerOpen} drawerLinkClickHandler={drawerLinkClickHandler} />
          {backdrop}
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route exact path="/tweets" component={TweetFeed} /> 
            <Route exact path="/rockets" component={TweetFeed} /> 
            <Route path="/launches/:flightNo" component={LaunchInfo} />
            <Route render={() => <Redirect to={{pathname: "/"}} />} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;
