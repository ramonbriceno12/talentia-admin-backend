const proposalUserEmailTemplate = (proposalUserName) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Propuesta Enviada</title>
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
      <h2>¡Gracias, ${proposalUserName}! 🎉</h2>
      <p>Tu propuesta para conectar con un talento ha sido enviada exitosamente. Nos pondremos en contacto contigo pronto para los próximos pasos.</p>
      <p>El equipo de <strong>Talentia</strong> está revisando tu propuesta y te mantendremos informado.</p>
      <p class="footer">© ${new Date().getFullYear()} Talentia. Todos los derechos reservados.</p>
    </div>
  </body>
  </html>
`;


module.exports = proposalUserEmailTemplate;