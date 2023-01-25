import React from 'react';
import axios from 'axios';
import styles from './styles.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'main',
      user: 'ucb15erickao',
      logs: [],
      log: ''
    };
    this.runTest = this.runTest.bind(this);
    this.displayLog = this.displayLog.bind(this);
    this.returnToMain = this.returnToMain.bind(this);
  }

  componentDidMount() {
    axios.get(`/${this.state.user}/logs`)
      .then((response) => {
        console.log('response received')
        console.log(response.data)
        this.setState({logs: response.data});
      })
      .catch((error) => {
        console.log(`componentDidMount error: ${error}`);
      });
  };

  runTest() {
    axios.get(`/${this.state.user}/runLatestTest`)
      .then((response) => {
        console.log('response received')
        console.log(response.data)
        this.setState({logs: response.data});
      })
      .catch((error) => {
        console.log(`runTest error: ${error}`);
      });
  };

  displayLog(logName) {
    console.log('logName in displayLog:', logName);
    axios.get(`/${this.state.user}/${logName}`)
      .then((response) => {
        this.setState({
          page: logName,
          log: response.data
        })
      })
      .catch((error) => {
        console.log(`displayLog error: ${error}`);
      });
  };

  returnToMain() {
    this.setState({ page: 'main' });
  };

  render() {
    if (this.state.page === 'main') {
      return (
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            Sample Testing Page
          </div>
          <button className={styles.customButton}
                  onClick={() => { this.runTest(); }}>
            Run the latest test version from GitHub
          </button>
          <div className={styles.sectionTitle}>
            Previous Test Logs
          </div>
          <div>
            {this.state.logs.map((log, i) => {
              return (
                <div className={styles.logList}
                     onClick={() => { this.displayLog(log); }}>
                  {log}
                </div>
              );
            })}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <button className={styles.customButton}
                  onClick={() => { this.returnToMain(); }}>
            Return to Testing Page
          </button>
          <div className={styles.log}>
            {this.state.log}
          </div>

        </div>
      )
    }

  }
};

export default App;