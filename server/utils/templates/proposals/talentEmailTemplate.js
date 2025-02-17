const talentProposalEmailTemplate = (talentName) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Interés en tu Perfil</title>
    <style>
      body { font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f4; padding: 20px; }
      .container { background: white; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto; }
      .button { background: #244c56; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block; }
      .logo-container { text-align: center; padding-bottom: 20px; }
      .logo { width: 150px; display: block; margin: 0 auto; }
      .footer { font-size: 12px; color: #666; margin-top: 20px; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>¡Buenas noticias, ${talentName}! 🚀</h2>
      <p>Alguien ha mostrado interés en tu perfil y nos pondremos en contacto contigo pronto para discutir los detalles.</p>
      <p>El equipo de <strong>Talentia</strong> revisará esta oportunidad y te notificaremos los siguientes pasos.</p>
      <p class="footer">© ${new Date().getFullYear()} Talentia. Todos los derechos reservados.</p>
    </div>
  </body>
  </html>
`;

module.exports = talentProposalEmailTemplate;