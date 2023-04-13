import express from 'express';
import path from 'path';
import mainRouter from './components/standard/stdRoutes.js';
import mongoose from 'mongoose';

const app = express();

mongoose.connect(process.env.TATT_DBS,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log(':D Local ConneXion to MDB!'))
  .catch(() => console.log('8X Connexion à MongoDB échouée !'));
  
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*' );
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());
app.use('/photos', express.static(path.join('photos')));
app.use('/standard', mainRouter);

app.use('/test', (req, res, next) => {
  res.status(200).json({message: "3Zi Test !!"});
})

export default app;