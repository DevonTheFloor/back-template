const User = require('../components/ma-e-b/maebModel'),
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Oups... Utilisateur non trouvé. Veuillez créer votre compte !', stat: 404 });
      }
      bcrypt.compare(req.body.mdp, user.mdp)
        .then(valid => {
          if (!valid) {
            res.status(401).json({ message: 'Désolé il y a eu un problème avec vos identifiants', stat: 404});
          }
          res.status(200).json({
            idUser: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            ),
            stat: 200,
            message: `Bonjour <strong><i>${user.enseigne}</i></strong>, connection réussit.`,
            uEnseig: user.enseigne,
            urlImg: user.urlImg
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};