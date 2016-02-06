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
      <DropDownMenu value={2}>
        <MenuItem value={1} primaryText="All Routes" />
        <MenuItem value={2} primaryText="South Africa - Namibia" />
        <MenuItem value={3} primaryText="Namibia - Zambia" />
        <MenuItem value={4} primaryText="Zambia - Malawi" />
        <MenuItem value={5} primaryText="Malawi - Mozambique" />
      </DropDownMenu>
    </ToolbarGroup>
    <ToolbarGroup float="right">
      <ToolbarTitle text="800 km" />   
    </ToolbarGroup>
  </Toolbar>
);

export default ToolbarExamplesSimple;