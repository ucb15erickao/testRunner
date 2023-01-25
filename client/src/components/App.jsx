import React from 'react';
import axios from 'axios';
import styles from './styles.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: []
    };
  }

  componentDidMount() {
    axios.get('/user/tests')
      .then((response) => {
        console.log('response received')
        console.log(response.data)
        this.setState({logs: response.data});
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      });
  };

  render() {
    return (
      <div>
        <h1>Previous Test Logs</h1>
        <div>
          {this.state.logs.map((log, i) => {
            return (<div>{log}</div>);
          })}
        </div>
      </div>
    )
  }
};

export default App;