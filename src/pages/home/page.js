import React from "react";
import Map from "./map";
import styles from "./style.css";


export default class HomePage extends React.Component {
  render() {
    return (
      <div className={styles.content}>
        <h1>Put Foot Rally 2016</h1>
        <Map />
      </div>
    );
  }
}
