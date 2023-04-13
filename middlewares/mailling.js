const nMailer = require('nodemailer');

const confirmMailing = (inscrit, mdp, id, email) => {

  console.log('IN da MAILER')
  let transporter = nMailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail',
    secure: true,
    dkim: {
      domainName: 'jechercheunapprenti.fr',
      keySelector: 'default', // The key you used in your DKIM TXT DNS Record
      privateKey: "", // Content of you private key
    }
  });
  transporter.sendMail({
    to: `${email}`,
    from: '"Je Cherche un apprenti" <confirm@jechercheunapprenti.fr>', // Make sure you don't forget the < > brackets
    subject: `Bienvenue ${inscrit}`,
    text: `Bonjour ${inscrit}, vous êtes bien enregistré sur jechercheunapprenti.fr, votre mot de passe est: ${mdp}`, // Optional, but recommended
    html: `<h1>Votre inscription sur Je Cherche Un Apprenti'</h1><br /><p>Bonjour <strong>${inscrit}</strong> est bien inscrit sur <a href="https://jechercheunapprenti.fr" target="_blank">jechercheunapprenti.fr</a> à l'adresse :<br /><a href="https://jechercheunapprenti.fr/ma-fiche?id=${id}">https://jechercheunapprenti.fr/ma-fiche?id=${id}</a> <br />Le mot de passe que vous avez choisi pour la supprimer est : <i>${mdp}</i><br />Elle sera disponible en ligne tant que vous ne l'aurez pas supprimée. <br />En vous souhaitant une bonne recherche sur jechercheunapprenti.fr .<br /><br/>Ceci est mail automatique, merci de ne pas y répondre.</p>`, // Optional
  })
}

module.exports = confirmMailing;