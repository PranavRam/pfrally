import React from "react";
import Map from "./map";
import styles from "./style.css";
import AppBar from 'material-ui/lib/app-bar';
import RaisedButton from 'material-ui/lib/raised-button';
import MapToolbar from './MapToolbar';
import TabExampleSimple from './TabExampleSimple';
import ListExampleFolder from './ListExampleFolder';

const {Grid, Row, Col} = require('react-flexbox-grid');

export default class HomePage extends React.Component {
  render() {
    return (
      <div className={styles.content}>
        <AppBar
            title="Put Foot Rally 2016 - Team Pooples"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          <Row className={styles.row}>
             <Col sm={9} xs={12}><Map /></Col>
             <Col sm={3} xs={12} className={styles.list}>{ListExampleFolder()}</Col>
          </Row>
        
        <MapToolbar />
        <TabExampleSimple />
      </div>
    );
  }
}
