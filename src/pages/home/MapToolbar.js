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
    <ToolbarGroup> 
      <DropDownMenu value={1}>
        <MenuItem value={1} primaryText="Show All" />
        <MenuItem value={2} primaryText="Gas Stations" />
        <MenuItem value={3} primaryText="Food" />
        <MenuItem value={4} primaryText="Lodging" />
        <MenuItem value={5} primaryText="Sightseeing" />
        <MenuItem value={6} primaryText="Show Nothing" />
      </DropDownMenu>
    </ToolbarGroup>
    <ToolbarGroup style={{height: '100%'}}>
      <Row middle="xs" style={{height: '100%'}}>
        <Col sm={6}>
          <Toggle
            label="Crime"
            labelPosition="right"
            style={styles.toggle}
          />
        </Col>
        <Col sm={6}>
          <Toggle
            label="RouteBox"
            labelPosition="right"
            style={styles.toggle}
            defaultToggled={true}
          />
        </Col>
      </Row>
    </ToolbarGroup>
    <ToolbarGroup>
      <Slider name="slider0" defaultValue={0.5} />
    </ToolbarGroup>
    <ToolbarGroup float="right">
      <ToolbarTitle text="7300 km" />   
    </ToolbarGroup>
  </Toolbar>
);

export default ToolbarExamplesSimple;