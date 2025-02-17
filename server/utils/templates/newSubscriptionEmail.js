const newSubscriptionEmail = (name, email) => `
  <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Tu Checklist Gratuito 📥</title>
        <style>
    body, .email-container {
      margin: 0;
      padding: 0;
      width: 100%;
      background-color: #244c56 !important;
      text-align: center;
      font-family: Arial, sans-serif;
    }

    .logo-container {
      padding: 30px 0;
      background-color: #244c56;
    }

    .logo {
      width: 150px;
      height: auto;
    }

    .email-content {
      width: 100%;
      max-width: 600px;
      background: white;
      border-radius: 10px;
      padding: 20px;
      text-align: center;
    }

    .button {
      background: #244c56;
      color: white;
      text-decoration: none;
      padding: 12px 20px;
      border-radius: 5px;
      display: inline-block;
      margin-top: 15px;
      font-size: 16px;
      font-weight: bold;
    }

    .plan-box {
      border: 1px solid #ddd;
      padding: 15px;
      margin: 10px 0;
      border-radius: 8px;
      text-align: left;
    }

    .plan-title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
    }

    .plan-price {
      font-size: 20px;
      font-weight: bold;
      color: #28a745;
    }

    .old-price {
        text-decoration: line-through;
        color: #d9534f;
        font-size: 16px;
    }

    .new-price {
        color: #28a745;
        font-size: 21px;
    }

    .footer {
      font-size: 12px;
      color: #666;
      margin-top: 20px;
    }

  </style>
    </head>
    <body>
        <table role="presentation" class="email-container" width="100%"
            cellspacing="0" cellpadding="0" border="0">
            <tr>
                <td align="center" class="logo-container">
                    <img src="http://talentiave.com/img/LOGO-01.png"
                        alt="Talentia Logo" class="logo">
                </td>
            </tr>

            <tr>
                <td align="center" style="padding: 20px;">
                    <table role="presentation" class="email-content"
                        cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <td>
                                <h2 style="color: #333;">¡Hola ${name}!</h2>
                                <p style="font-size: 16px; color: #333;">
                                    Gracias por solicitar tu <strong>Checklist
                                        de Optimización Profesional</strong>. 🎉
                                </p>

                                <p style="font-size: 14px; color: #666;">
                                    En este documento encontrarás estrategias
                                    clave para mejorar tu perfil profesional,
                                    destacar frente a los reclutadores y
                                    aumentar tus oportunidades laborales.
                                </p>

                                <hr
                                    style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

                                <h3 style="color: #333;">📥 Descarga tu
                                    Checklist</h3>
                                <p style="font-size: 14px; color: #666;">
                                    Haz clic en el siguiente botón para
                                    descargar el checklist en PDF:
                                </p>

                                <a
                                    href="https://talentiave.com/assets/pdf/Checklist_Optimizacion_Profesional.pdf"
                                    class="button" style="color:white !important;">
                                    📥 Descargar Checklist
                                </a>

                                <hr
                                    style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

                                <p style="font-size: 14px; color: #666;">
                                    <strong>¿Necesitas ayuda para mejorar tu
                                        perfil profesional?</strong> 🚀 Revisa
                                    nuestras opciones:
                                </p>

                                <div class="plan-box">
                                    <div class="plan-title">✅ Optimización de
                                        CV</div>
                                    <span class="old-price">$15</span> → <span
                                        class="new-price">$5</span>
                                    <p>🔹 Revisión y mejora de contenido y
                                        formato.</p>
                                    <a
                                        href="https://calendly.com/talentiave/cv-optimization"
                                        class="button" style="color:white !important;">📆 Agendar</a>
                                </div>

                                <div class="plan-box">
                                    <div class="plan-title">✅ CV +
                                        LinkedIn</div>
                                    <span class="old-price">$30</span> → <span
                                        class="new-price">$15</span>
                                    <p>🔹 Optimización de perfil y CV para mayor
                                        visibilidad.</p>
                                    <a
                                        href="https://calendly.com/talentiave/cv-optimization"
                                        class="button" style="color:white !important;">📆 Agendar</a>
                                </div>

                                <div class="plan-box">
                                    <div class="plan-title">✅ CV + LinkedIn +
                                        Portafolio Online</div>
                                    <span class="old-price">$50</span> → <span
                                        class="new-price">$30</span>
                                    <p>🔹 Creación de un portafolio web y
                                        optimización de CV y LinkedIn.</p>
                                    <a
                                        href="https://calendly.com/talentiave/cv-optimization"
                                        class="button" style="color:white !important;">📆 Agendar</a>
                                </div>

                                <hr
                                    style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

                                <p class="footer">
                                    © ${new Date().getFullYear()} Talentia.
                                    Todos los derechos reservados.
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

module.exports = newSubscriptionEmail;
