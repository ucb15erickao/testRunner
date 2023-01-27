// React component that displays the list of logs from previously ran tests

import React from 'react';
import styles from './styles.css';

const LogList = ({ list, displayLog }) => (
  <div>
    {list.map((log, i) => {
      return (
        <div className={styles.logList}
          onClick={() => { displayLog(log); }}>
          {log}
        </div>
      );
    })}
  </div>
);

export default LogList;