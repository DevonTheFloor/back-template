
const http = require('http'),
  app = require('./app'),
  port = 5008,
  hostname = 'http://127.0.0.8',
  apiUrl = `${hostname}:${port}`,
  boulServer = http.createServer(app);

  boulServer.listen(apiUrl, ()=>{
    console.log('Connected to  at port : ', port);
})

