// Global entry point into the Node.js server

// Import for server and bash commands
const express = require('express');
const { exec } = require('child_process');

// Set up a local host express server
const server = express();
const PORT = 8001;
server.use(express.static(`${__dirname}/../client/dist`))
server.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}.`)
});

// Endpoint for page load will fetch the list of logs the current user previously ran
server.get('/:repository/logs', (request, response) => {
  exec(`mkdir -p logs;
        ls logs`, (err, stdout, stderr) => {
    if (err) {
      console.log(`err: ${err}`);
      response.status(404).send(err);
      return;
    }
    const logs = stdout.split('\n');
    logs.pop();
    logs.reverse();
    response.status(200).send(logs);
  });
});

// Endpoint for running the latest test version from GitHub
server.post('/:repository/runLatestTest', (request, response) => {
  // Remove previous repo version, clone repo, run test, list repo files
  exec(`mkdir -p repositories;
        cd repositories;
        rm -rf sampleTestApp
        git clone https://github.com/ucb15erickao/${request.params.repository}.git;
        cd sampleTestApp;
        python3 test.py;
        ls`, (err1, repoFiles, stderr1) => {
          if (err1) {
            console.log('runTest err1:', err1);
            response.status(500).send(err1);
            return;
          }
          files = repoFiles.split('\n');
          logName = files[0];

          // Copy log file from repo to logs folder, send updated log list to client
          exec(`cp repositories/sampleTestApp/${logName} logs;
                ls logs`, (err2, stdout2, stderr2) => {
            if (err2) {
              console.log('runTest err2:', err2);
              response.status(400).send(err2);
              return;
            }
            const logs = stdout2.split('\n');
            logs.pop();
            logs.reverse();
            response.status(200).send(logs);
          })
        });
});

// Endpoint for fetching the contents of a specific log file
server.get('/:repository/:logName', (request, response) => {
  exec(`cat logs/${request.params.logName}`, (err, stdout, stderr) => {
    if (err) {
      console.log('logName err:', err);
      response.status(400).send(err);
      return;
    }
    const log = stdout;
    response.status(200).send(log);
  });
});