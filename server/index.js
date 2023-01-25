const express = require('express');
const server = express();
server.use(express.static(`${__dirname}/../client/dist`))

const PORT = 8001;
server.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}.`)
});

const { exec } = require('child_process');

server.get('/:user/logs', (request, response) => {
  exec(`mkdir -p logs;
        ls logs`, (err, stdout, stderr) => {
    if (err) {
      console.log(`err: ${err}`);
      response.status(404).send(err);
      return;
    }
    // console.log(`stdout: ${stdout}`);
    // console.log(`stderr: ${stderr}`);
    // console.log(request.params.user);

    const logs = stdout.split('\n');
    logs.pop()
    // console.log('initial log list:', logs);
    response.status(200).send(logs);
  });
});

server.get('/:user/runLatestTest', (request, response) => {
  let currentDate = new Date();
  let timeStamp = '_' + currentDate.getMonth() + 1
                        + '-' + currentDate.getDate()
                        + '-' + currentDate.getFullYear()
                        + "_"
                        + currentDate.getHours() + ":"
                        + currentDate.getMinutes() + ":"
                        + currentDate.getSeconds();
  // console.log(`test${timeStamp}`);
  exec(`mkdir -p tests;
        cd tests;
        git clone https://github.com/${request.params.user}/test.git;
        mv test test${timeStamp};
        cd test${timeStamp};
        python3 test.py;
        ls`, (err1, stdout1, stderr1) => {
          if (err1) {
            console.log('err1:', err1);
            response.status(500).send(err1);
            return;
          }
          files = stdout1.split('\n');
          // console.log('files:', files);
          logName = files[1];
          // console.log(logName);
          exec(`cp tests/test${timeStamp}/${logName} logs;
                ls logs`, (err2, stdout2, stderr2) => {
            if (err2) {
              console.log('err2:', err2);
              response.status(400).send(err2);
              return;
            }
            const logs = stdout2.split('\n');
            logs.pop()
            response.status(200).send(logs);
          })
        });
});

server.get('/:user/:logName', (request, response) => {
  exec(`cat logs/${request.params.  logName}`, (err, stdout, stderr) => {
    if (err) {
      console.log('err:', err);
      response.status(400).send(err);
      return;
    }
    const log = stdout;
    console.log(log);
    response.status(200).send(log);
  });
});