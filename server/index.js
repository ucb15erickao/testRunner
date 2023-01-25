const express = require('express');
const server = express();
server.use(express.static(`${__dirname}/../client/dist`))

const PORT = 8001;
server.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}.`)
});

const { exec } = require('child_process');
exec('ls logs', (err, stdout, stderr) => {
  if (err) {
    console.log(`error: ${err}`);
    return;
  }
  // console.log(`stdout: ${stdout}`);
  // console.log(`stderr: ${stderr}`);
  const logs = stdout.split('\n');
  logs.pop()
  console.log(logs)
  console.log(typeof logs)
});

server.get('/user/tests', (request, response) => {
  exec('ls logs', (err, stdout, stderr) => {
    if (err) {
      console.log(`error: ${err}`);
      res.status(404).send(error);
      return;
    }
    // console.log(`stdout: ${stdout}`);
    // console.log(`stderr: ${stderr}`);

    const logs = stdout.split('\n');
    logs.pop()
    response.status(200).send(logs);
  });
});

