import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import Slider from 'material-ui/lib/slider';
import AbsoluteGrid from 'react-absolute-grid';
import SampleDisplay from './SampleDisplay';
import data from '../../data/sampleData';
import * as _ from 'lodash';
import TripToolbar from './TripToolbar';

 var sampleItems = [
  {key: 1, name: 'Test', sort: 0, filtered: 0},
  {key: 2, name: 'Test 1', sort: 1, filtered: 0},
];

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  checkpoints: {
    width: '100%'
  }
};

function handleActive(tab) {
  alert(`A tab with this route property ${tab.props.route} was activated.`);
}

console.log(data);
const TabsExampleSimple = () => {
    // var tripGrid = TripGrid();
// console.log('trip', tripGrid);
return (
    <div>
      <div >
        <img src={require("../../images/checkpoints.png")} style={styles.checkpoints}/>

      </div>
      <div>
        {TripToolbar()}
      </div>
    </div>
  );
  /*return (<Tabs>
    <Tab label="Trip Details">
      <div style={{margin: 5}}>
        <AbsoluteGrid items={data.screens.slice(0, 10)} 
                      displayObject={(<SampleDisplay />)}
                      verticalMargin={42}
                      dragEnabled={true}
                      responsive={true}
                      itemWidth={150}
                      />
      </div>
      <div>
        {TripToolbar()}
      </div>
    </Tab>
    <Tab label="Live Updates" >
      <div>
        <h2 style={styles.headline}>Tab Two</h2>
        <p>
          This is another example tab.
        </p>
      </div>
    </Tab>
  </Tabs>)*/
};

export default TabsExampleSimple;