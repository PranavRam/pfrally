import React from 'react';

export default class SampleDisplay extends React.Component {

  render() {
    const itemStyle = {
      display: 'block',
      width: '100%',
      height: '100px',
      backgroundImage: `url('${this.props.item.url}')`
    };

    return (
      <div>
        <div
          style={itemStyle}
          className="gridItem"><span className="name">{this.props.item.name}</span></div>
        <div>
          Hey
        </div>
      </div>
    );
  }
}