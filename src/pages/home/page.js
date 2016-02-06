import React from "react";
import Map from "./map";
import styles from "./style.css";
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import MapToolbar from './MapToolbar';
import TabExampleSimple from './TabExampleSimple';
import PlaceDetail from './PlaceDetail';
import app from 'ampersand-app';

const {Grid, Row, Col} = require('react-flexbox-grid');

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
  };

  handler() {

  }
  render() {

    return (
      <div className={styles.content}>
        <AppBar
            showMenuIconButton={false}
            title="Put Foot Rally 2016"
          >
          <span style={{display: 'flex', alignItems: 'center', color: 'white'}}>
            Made with<img style={{height: '25', margin: '5'}}src="http://emojipedia-us.s3.amazonaws.com/cache/de/ca/decadd7edb6b1014ca0cb7a1afcb8ea3.png" />
            - Team Pooples
          </span>
        </AppBar>
          <Row className={styles.row}>
             <Col sm={9} ><Map mapState={app.mapState} mapLocations={app.mapLocations}/></Col>
             <Col sm={3} className={styles.list}>{PlaceDetail()}</Col>
          </Row>
        
        {MapToolbar(this.handler)}
        <TabExampleSimple />
      </div>
    );
  }
}
