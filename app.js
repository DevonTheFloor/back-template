const express = require('express'),
  app = express(),
  path = require('path'),
  maebRoutes= require('./components/standard/maebRoutes'),
  mongoose = require('mongoose');

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
app.use('/photos', express.static(path.join(__dirname, 'photos')));
app.use('/standard', maebRoutes);

app.use('/test', (req, res, next) => {
  res.status(200).json({message: "3Zi Test !!"});
})

module.exports = app;