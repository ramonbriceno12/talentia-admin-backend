const companyEmailTemplate = (companyName, email) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Email</title>
    <style>
      body, .email-container {
        margin: 0;
        padding: 0;
        width: 100%;
        background-color: #244c56 !important;
        text-align: center;
      }

      .logo-container {
        padding: 30px 0;
        background-color: #244c56;
      }

      .logo {
        width: 150px;
        height: auto;
      }

      .calendly-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: #006bff;
        color: white;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 14px;
        font-weight: bold;
        margin-top: 20px;
      }

      .calendly-button img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }


      .email-content {
        width: 100%;
        max-width: 600px;
        background: white;
        border-radius: 10px;
        padding: 20px;
        text-align: center;
        font-family: Arial, sans-serif;
      }

      .button {
        background: #244c56;
        color: white;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
        display: inline-block;
        margin-top: 20px;
      }

      .footer {
        font-size: 12px;
        color: #666;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <table role="presentation" class="email-container" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <td align="center" class="logo-container">
          <img src="http://talentiave.com/img/LOGO-01.png" alt="Talentia Logo" class="logo">
        </td>
      </tr>

      <tr>
        <td align="center" style="padding: 20px;">
          <table role="presentation" class="email-content" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td>
                <h2>¡Hola ${companyName}!</h2>
                <p style="font-size: 16px; color: #333;">
                  ¡Tu oferta de trabajo ha sido publicada con éxito en Talentia! 🚀  
                  Nuestro equipo revisará la publicación y te notificaremos sobre nuevos candidatos interesados en la vacante.
                </p>
                <a href="https://talentiave.com/actions/calendly-link-company?email=${email}&name=${companyName}" class="calendly-button" style="color: white !important;">
                  📅
                  Agendar una reunión
                </a>
                <br>
                <a href="https://talentiave.com" class="button" style="color: white !important;">Visitar Talentia</a>
                <p class="footer">
                  © ${new Date().getFullYear()} Talentia. Todos los derechos reservados.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;

module.exports = companyEmailTemplate;
