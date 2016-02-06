import React from 'react';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import NavigationExpandMoreIcon from 'material-ui/lib/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import Toggle from 'material-ui/lib/toggle';
const {Grid, Row, Col} = require('react-flexbox-grid');
import Slider from 'material-ui/lib/slider';

const styles = {
  datePicker: {
    width: 315,
  },
  toggle: {
    // marginBottom: 16
    marginRight: 5
  },
};
const ToolbarExamplesSimple = (handler) => (
  <Toolbar>
    <Row middle="xs" between="xs" style={{height: '100%'}}>
      <Col xs>
        <DropDownMenu value={1}>
          <MenuItem value={1} primaryText="Show All" />
          <MenuItem value={2} primaryText="Gas Stations" />
          <MenuItem value={3} primaryText="Food" />
          <MenuItem value={4} primaryText="Lodging" />
          <MenuItem value={5} primaryText="Sightseeing" />
          <MenuItem value={6} primaryText="Show Nothing" />
        </DropDownMenu>
      </Col>
      <Col xs>
        <Toggle
            label="Crime"
            labelPosition="right"
            style={styles.toggle}
          />
      </Col>
      <Col xs>
        <Toggle
          label="RouteBox"
          labelPosition="right"
          style={styles.toggle}
          defaultToggled={true}
        />
      </Col>
      <Col xs style={{height: '100%', marginBottom: '40'}}>
        <Row style={{height: '100%'}}>
          <Col xs>
            <Slider name="slider0" defaultValue={0.5} />
          </Col>
        </Row>
        <Row>
          <Col xs style={{textAlign: 'center', marginBottom: '5'}}>
            <span>Radius - 20km</span>
          </Col>
        </Row>
      </Col>
      <Col xs style={{textAlign: 'right'}}>
        <ToolbarTitle text="7300 km" />  
      </Col>
    </Row>
  </Toolbar>
);

export default ToolbarExamplesSimple;