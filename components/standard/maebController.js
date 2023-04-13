const Maeb = require('./maebModel');
const fs =require('fs');
let mailling = require('../../middlewares/mailling');

exports.getAllInCity = (req,res, next) => {
    Apprenti.find()
    .then((all)=> {
      res.status(200).json(all);
  })
  .catch(error => console.error(error));
}

exports.getOne = (req, res, next)=> {
  Apprenti.findOne({
    _id: req.params.id
  })
  .then((result) => {
    console.log('result :', result)
    if(result === null || result ==='') {
      res.status(404).json({message:"Cet utilisateur n'existe plus"})
    } else {
      res.status(200).json(result);
    }
  })
  .catch(error => console.error(error));
}

exports.getRecherche = (req, res) => {

  Apprenti.find(
    {...req.body} 
  )
  .then((match) => {
    console.log('Match :', match);
    console.log('match length :', match.length);
    if (req.body.cp && match.length === 0) {
      console.log('cp :', req.body.cp);
      console.log('typoe : ', typeof(req.body.cp))
      res
        .status(200)
        .json({
          result: 0,
          branche: req.body.branche,
          departement: whatDepartement(req.body.cp) })
      
    } else {
      res
      .status(200)
      .json(
        match
      )
    }
    
})
  .catch(error => console.error(error));
}
exports.createOne = (req, res, next) => {
  console.log("In Da CREATE One");
  console.log('requete :',req.body);
  const apprenti = new Apprenti({
    ...req.body,
    date: Date.now()
  });
  apprenti.save()
    .then((state) => {
      console.log('apprenti save: ', state);
      res.status(201).json({ 
        message: "Félicitation, votre fiche est bien enregistrée sur notre site.\n Un e-mail avec votre mot de passe vous a été envoyé, verifiez vos spam au besoin. \n Vous allez être redirigé sur votre fiche.",
        fiche: state._id,
        inscrit: state.prenom
      })
    })
    .catch(error => res.status(400).json({message:"Une erreur est survenue"}));
}

/*exports.modifyOne = (req, res, next) => {
  const apprentiObject = req.file ?
    {
      ...JSON.parse(req.body.apprenti),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...apprentiObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Profil modifié !'}))
    .catch(error => res.status(400).json({message:"Profil non trouvé"}));
}*/


exports.modifyAll = (req, res, next) => {
  
}

exports.deleteOne = (req, res, next) => {
  const mdp = req.params.mdp;
  Apprenti.findOne({ _id: req.params.id })
    .then(apprenti => {
      if(mdp === apprenti.mdp){
        Apprenti.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Profil supprimé !'}))
          .catch(error => res.status(400).json({message:"image non effacée"}));
      } else {
        res.status(200).json({
          message: "Les mots de passes ne concordent pas, désolé.",
          wait: true
        })
      }        
    })
    .catch(error => res.status(500).json({message:"Profil introuvable"}));
}

exports.deleteAll = (req, res, next) => {

}

function whatDepartement(ville) {
  console.log('In Da What')
  console.log('type :', typeof(ville));
  console.log('ville[0] :',ville.charAt(0) )
  console.log('ville[1] :',ville.charAt(1) )
  let numDepartement = "";
  if (ville.charAt(0) === "9") {
    numDepartement =  `${ville.charAt(0)}${ville.charAt(1)}${ville.charAt(2)}`;
    console.log('Depart 3 num:', numDepartement);
    return numDepartement
  } else {
    numDepartement =  `${ville.charAt(0)}${ville.charAt(1)}`;
    console.log('Depart :', numDepartement);
    return numDepartement
  }
}