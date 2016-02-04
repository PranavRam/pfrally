/**
 * App entry point
 */

// Polyfill
import "babel-polyfill";

// Libraries
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import createBrowserHistory from 'history/lib/createBrowserHistory'

// Routes
import Routes from './common/components/Routes';

// Base styling
import "./common/base.css";

import injectTapEventPlugin from 'react-tap-event-plugin';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
// ID of the DOM element to mount app on
const DOM_APP_EL_ID = "app";

import app from 'ampersand-app';
import MapState from './states/MapState';
import Locations from './collections/Locations';
import waypoints from './data/waypoints';
// Here we could certainly *chose* to attach it to
// window for better debugging in the browser 
// but it's no longer necessary for accessing the 
// app instance from other modules.
app.extend({
    init: function () {
        this.mapState = new MapState({showCrime: true});
        this.mapLocations = new Locations(waypoints);
    }
});

app.init();

// Render the router
ReactDOM.render((
  <Router history={createBrowserHistory()}>
    {Routes}
  </Router>
), document.getElementById(DOM_APP_EL_ID));
