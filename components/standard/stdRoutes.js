import express from 'express';
import multer from 'multer';
import * as strdCtrl from './stdController.js'

const mainRouter = express.Router();

mainRouter
  .get('/getone/:id', strdCtrl.getOne)
  .get('/getall-in-city/:zip', strdCtrl.getAllInCity)
  .post('/postone/',multer, strdCtrl.createOne)
  .post('/search-maeb/', multer, strdCtrl.getRecherche)
  .get('/deleteone/:id', strdCtrl.deleteOne);

  
export default mainRouter;