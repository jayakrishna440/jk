import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './containers/Home';
import ScheduleView from './containers/ScheduleView';
import './index.css';
import {Fabric} from 'office-ui-fabric-react/lib/Fabric'

import Header from './components/Header';

export default () => (
  <Router>
    <Fabric className="App ms-Fabric">
    <div className="ms-Grid" dir="ltr">
       <Header></Header>
      <Route exact path="/" component={Home} />
      <Route exact path="/scheduleview" component={ScheduleView} />
      </div>
      </Fabric>
  </Router>
);
