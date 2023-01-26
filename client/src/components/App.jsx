import React from 'react';
import axios from 'axios';
import styles from './styles.css';
import LogList from './LogList';
import LogFile from './LogFile';

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

  // Initial page load fetches list of logs
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

  // Download and run the latest test version, then receive an updated list of logs
  runTest() {
    axios.post(`/${this.state.user}/runLatestTest`)
      .then((response) => {
        console.log('latest test has been run')
        console.log(response.data)
        this.setState({logs: response.data});
      })
      .catch((error) => {
        console.log(`runTest error: ${error}`);
      });
  };

  // Display the contents of a specific log file on a separate page
  displayLog(logName) {
    console.log('logName in displayLog:', logName);
    axios.get(`/${this.state.user}/${logName}`)
      .then((response) => {
        console.log('response.data:', response.data);
        this.setState({
          page: logName,
          log: response.data
        })
      })
      .catch((error) => {
        console.log(`displayLog error: ${error}`);
      });
  };

  // Returns to main testing page from the single log display
  returnToMain() {
    this.setState({ page: 'main' });
  };

  render() {
    console.log('this.state.page:', this.state.page);
    if (this.state.page === 'main') {
      return (
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            Test Runner
          </div>
          <button className={styles.customButton}
                  onClick={() => { this.runTest(); }}>
            Run the latest test version from GitHub
          </button>
          <div className={styles.sectionTitle}>
            Previous Test Logs
          </div>
          <LogList list={this.state.logs} displayLog={this.displayLog} />
        </div>
      )
    } else {
      return (
        <LogFile log={this.state.log} returnToMain={this.returnToMain} />
      )
    }

  }
};

export default App;