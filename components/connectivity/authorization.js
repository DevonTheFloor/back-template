const jwt = require("jsonwebtoken"),
  door = require('../folder/folder');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1],
      decodedToken = jwt.verify(token, door);
      console.log('into AUTH:');
      console.log('TOKEN :', token);
      console.log('Decoded TOKEn :', decodedToken);
    const idUser = decodedToken.idUser;
    if (req.params.id && req.params.id !== idUser) {
      console.log('id user different');
      throw "Veuillez vous connecter pour accéder à cette partie du site.";
    } else {
      console.log('ID user IDENTIK !');
      next();
    }
  } catch(error) {
    res.status(200).json({ message: "Nous rencontrons un problème avec votre compte. Merci de réesayer ultérieurement." });
  }
};