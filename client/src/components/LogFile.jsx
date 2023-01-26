import React from 'react';
import styles from './styles.css';

const LogFile = (props) => {
  console.log('props.log:', props.log);
  return (
    <div>
      <button className={styles.customButton}
        onClick={() => { props.returnToMain(); }}>
        Return to Testing Page
      </button>
      <div className={styles.log}>
        {props.log}
      </div>
    </div>
  );
};

export default LogFile;