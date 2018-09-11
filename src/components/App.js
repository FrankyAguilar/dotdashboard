import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import * as routes from '../constants/routes';
import Navigation from './Navigation';

import LandingPage from './Landing';
import NewCollectible from './NewCollectible';



const App = () =>
  <Router>
    <div>
    <Navigation />
    <hr/>

      <Route
        exact path={routes.LANDING}
        component={LandingPage}
      />
      <Route
        exact path={routes.NEWCOLLECTIBLE}
        component={NewCollectible}
      />

      </div>
  </Router>

export default App;