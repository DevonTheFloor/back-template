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
      privateKey: "MIIEpAIBAAKCAQEAy8wfYxqhDWxa7/E3N5Dc8UXU1PD1jAQTmII7qgrCSD8kUzbDJPclPMuPpOVJFtCA7OLyjaC08c2hDm3T1aEJvkeULYlynzXXojPrnicrIwh6m/IplGqhRnmAOct+D1TokmP+/dXnqqmgie1NmFzJPfGh/FO5y0FvLpnvwJqTQKjuE5j1PwsXuUuNQZjaMR5G2vYRJb9IPRmGB1bMIGxvbsQDMPIUUzXWrv+QUVKgZ5t3zCMIBCMhW/VrnmOPH7YzQhnPpHiwigNZ0V1Mvpl00I7jDBxJ1d6k6juItZJsiRXAXAGsxr9g9NrpPA+/In7TqFiyXQZK8tIeLqQf3HBPKQIDAQABAoIBAQDA24s8Wt/b9xVbiXbKg7FCNeZCGUEVXmo44c2ajhHrEq3KfcFQQv2fObfWwRBYobnP8ri8pD93sDNglzhnKr0wr0YfjbnFxssn+WBYyxI8VfLJjvIgPIQgUCyzBMpnsd9hYXXWOs3AKEP/Im1S6UOb9gVn5sek/Gg9vnkvWFhPT5zqsSpA0xBI4tM/i69mj+5IXtCX3IV6CSyo2b5N9wqzyM0R6UL2a9QZqUFW+wZdMdY5lUFbhxcnFA+HHgnDTEqfIKUUIs6+OeYNYbM+P/KUzKthKMESfjyj0lvrS8HZNAnYHRD80iP3SOXNEej5/7tZE7keqLdp4XweTPZXgxwBAoGBAPIZjVm81lY4R6aj92mZ5SF/Dvo6/sQbM66fsWHqmr+33TBQbU1zdQZTa35Acnk2sB9q/X+d8Frro6Aiooog0wSKvg/J3eDaxOinNPIFzhLRf6a7IwIbAHNwKP08bt/Ag6VFV1DdKZfdBt6DK71u0mrr86alFHdatXqh+QyM+L6pAoGBANd/lzVyC2hXHBSr/cx/obUBCanx/dyTZoWOJfcd7ReNpH25/A2nd8IuUwAdAGCMtSiGSDsnL6XKolmQhtXCniARttC8xhmDfsSdVfOFBfGyhG0i2GwWGC356/ndDpN+0gQOEmL4rPnoA0aLzNQ8IFPpgK4sahWpJ+UxuqWXp9yBAoGBAKhp6hCg8qFr6TwdGAGYEvLoRm0AGTYmjh9N68FnyFrR9sajTEXyqVfLNB3Ri1CTIJXagZoDLq6w+VRug49/Igwoz+p/zR+cUBpgJs6uBxrELf64c7QFQJ0NSxZOsfppG6sev4z7LPH9yceEjCrtKudCWG52q/QTX+d9QZjfgDJxAoGAB39A23MkQnUFXRK+uaaXEZz/oRHyKwJVxr+zQm2gGfmrh1Q5GKCC4haKfK6FnNZIVyiUyroKRlJOY59LkZQ7vBHhslFe8vRILL7shpRSKJ51TPaxYNFD9hWDyCWQpED9PXbf3OGZ4vfXZVTnw1p0JXcyKt0Qs8A2yxp3y9sC1AECgYBgKkUHQ91YI8jDUWvzMW0FOLMjnRvfSGd1sKAQUpWBo81xEFFT17hpwYOa/2FFTB3J/NlAsVpKWAe/obzMUcAQISxXjOKivU8wjn0/ljNQnDaiBiPGrVKxncVXPiv1qyxAO0sk45klgJNIJnyyg9NsrjzWA4V6Jd8wevhmemd9pg==", // Content of you private key
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