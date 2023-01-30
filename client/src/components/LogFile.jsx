// React component that displays the contents of an individual log file on a separate page

import React from 'react';
import styles from './styles.css';

const LogFile = ({ log, logName, returnToMain }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleBar}>
        Test Runner
      </div>
      <div className={styles.sectionTitle}>
        Log Display Page
      </div>
      <button className={styles.customButton}
        onClick={() => { returnToMain(); }}>
        Return to Testing Page
      </button>
      <div className={styles.sectionTitle}>
        {logName}
      </div>
      <div className={styles.log}>
        {log}
      </div>
    </div>
  );
};

export default LogFile;