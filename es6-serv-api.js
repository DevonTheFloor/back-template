import http from 'http';
import app from './app.js';

const port = 5009,
  hostname = '127.0.0.9',
  apiServer = http.createServer(app);

apiServer.listen(port, hostname,()=>{
  console.log('Connected to  at port : ', port);
})

