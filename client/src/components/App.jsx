import React from 'react';
import axios from 'axios';
import styles from './styles.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'ucb15erickao',
      logs: []
    };
    this.runTest = this.runTest.bind(this);
  }

  componentDidMount() {
    axios.get(`/${this.state.user}/logs`)
      .then((response) => {
        console.log('response received')
        console.log(response.data)
        this.setState({logs: response.data});
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      });
  };

  runTest() {
    axios.get(`/${this.state.user}/runLatestTest`)
      .then((response) => {
        console.log('response received')
        console.log(response.data)
        this.setState({logs: response.data});
      })
      .catch(error => {
        console.log(`error: ${error}`);
      });
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          Sample Testing Page
        </div>
        <button className={styles.runTest} onClick={() => { this.runTest(); }}>
          Run the latest test version from GitHub
        </button>
        <div className={styles.sectionTitle}>
          Previous Test Logs
        </div>
        <div>
          {this.state.logs.map((log, i) => {
            return (<div className={styles.logList}>{log}</div>);
          })}
        </div>
      </div>
    )
  }
};

export default App;