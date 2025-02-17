const adminEmailTemplate = (proposalUserEmail, talentUserEmail, resumeFile, description) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Nueva Propuesta Recibida</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
      .container { background: white; padding: 20px; border-radius: 10px; max-width: 600px; margin: auto; }
      .footer { font-size: 12px; color: #666; margin-top: 20px; }
      .highlight { font-weight: bold; color: #244c56; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>📌 Nueva Propuesta Recibida</h2>
      <p><strong>📧 Email del usuario que envió la propuesta:</strong> ${proposalUserEmail}</p>
      <p><strong>📧 Email del talento:</strong> ${talentUserEmail}</p>
      <p><strong>📄 CV del talento:</strong> <a href="${resumeFile}" target="_blank">Descargar CV</a></p>
      <p><strong>📝 Descripción de la propuesta:</strong></p>
      <p>${description}</p>
      <hr>
      <p class="footer">© ${new Date().getFullYear()} Talentia. Todos los derechos reservados.</p>
    </div>
  </body>
  </html>
`;


module.exports = adminEmailTemplate;