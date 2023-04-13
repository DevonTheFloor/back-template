import mongoose from 'mongoose';

const stdSchema = mongoose.Schema({
  mdp: { type: String, required: true },
  enseigne: { type: String, required: false },
  num_rue: { type: Number, require: false },
  rue: { type: String, require: false},
  ville: { type: String, required: true },
  departement: {type: String, required: false },
  cp: { type: String, required: true },
  urlImg: { type: String },
  standard: { type: Boolean, required: true},
  date: { type: String, required: false },
  email: { type: String, required: true },
  boulangerie: { type: Array, required: false },
  patisserie: { type: Array, required: false },
  viennoiserie: { type: Array, required: false },
  total_reserve: { type: Number, required: false },
  reserved: { type: Array, required: false},
  cotisation: { type: String, required: true},
  //admin, offerte, ajour, defaut
  //cinquante, soixante-dix
  prix: {type: Number, required: false},
  inscription: {type: Number, required: false}
});

const Schema = mongoose.model('Schema',stdSchema);
export default Schema;