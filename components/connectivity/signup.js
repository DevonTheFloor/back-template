const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const maebl = new Maeb({
        ...req.body,
        mdp: hash,
        departement: numDprt.whatDepartement(req.body.cp),
        date: timer.computedDate(),
        basicsBoulangerie,
        basicsViennoiserie,
        basicsPatisserie,
        total_reserve: 0,
        reserved: []
      });
      maebl.save()
        .then((state) => {
          console.log('apprenti save: ', state);
          confirmMailling(state.mdp, state._id,state.email);
          res.status(201).json({ 
            message: `Félicitation <strong>${state.enseigne}</strong>,<br> vous êtes bien enregistré sur \"Ma E Boulangerie\".<br>Vous pouvez maintenant vous connecter avec vos identifiants.<br> Un e-mail contenant votre mot de passe vous a été envoyé.<br><strong>Vérifiez votre dossier spam au besoin.</strong><br>Merci de votre confiance, à bientôt sur 'Ma E Boulangerie'.`,
            fiche: state._id,
            inscrit: state.enseigne
          })
        })
        .catch(error => res.status(400).json({message:"Une erreur est survenue"}));
    })
    .catch(error => res.status(500).json({ error }));
};