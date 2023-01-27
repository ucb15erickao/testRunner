// React component that displays the contents of an individual log file on a separate page

import React from 'react';
import styles from './styles.css';

const LogFile = (props) => {
  console.log('props.log:', props.log);
  return (
    <div className={styles.container}>
      <div className={styles.sectionTitle}>
        Log Display Page
      </div>
      <button className={styles.customButton}
        onClick={() => { props.returnToMain(); }}>
        Return to Testing Page
      </button>
      <div className={styles.sectionTitle}>
        {props.logName}
      </div>
      <div className={styles.log}>
        {props.log}
      </div>
    </div>
  );
};

export default LogFile;