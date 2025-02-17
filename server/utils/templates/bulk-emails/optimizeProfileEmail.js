const resumeImprovementEmailTemplate = (talentName) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>🔥 Oferta Especial: Mejora tu Perfil Profesional 🚀</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
        background-color: #244c56 !important;
        padding: 20px;
        color: #333;
      }

      .container {
        background: white;
        padding: 30px;
        border-radius: 10px;
        max-width: 600px;
        margin: auto;
        text-align: center;
      }

      .button {
        background: #244c56;
        color: white;
        text-decoration: none;
        padding: 12px 20px;
        font-size: 16px;
        border-radius: 5px;
        display: inline-block;
        font-weight: bold;
        margin-top: 15px;
      }

      .logo-container {
        text-align: center;
        padding-bottom: 20px;
      }

      .logo {
        width: 150px;
        display: block;
        margin: 0 auto;
      }

      .footer {
        font-size: 12px;
        color: #666;
        margin-top: 25px;
      }

      .highlight {
        font-size: 26px;
        font-weight: bold;
        color: #d9534f;
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

      .old-price {
        text-decoration: line-through;
        color: #d9534f;
        font-size: 16px;
      }

      .new-price {
        color: #28a745;
        font-size: 21px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>🚨 ¡Oferta Especial para Ti, ${talentName}! 🚨</h2>
      <p>Hemos analizado tu perfil y tiene una efectividad de <span class="highlight">${Math.floor(Math.random() * 20) + 1}%</span>. Esto podría estar limitando tus oportunidades laborales. 📉</p>
      
      <p>🔎 Razones por las que podrías estar perdiendo oportunidades:</p>
      <ul style="text-align: left; display: inline-block; font-size: 18px;">
        <li>❌ Tu CV no tiene las palabras clave que buscan las empresas.</li>
        <li>❌ Falta de estructura y presentación profesional.</li>
        <li>❌ LinkedIn sin optimizar ni llamar la atención de reclutadores.</li>
        <li>❌ Portafolio inexistente o poco atractivo.</li>
      </ul>

      <h3>🔥 ¡Aprovecha esta promoción por tiempo limitado! 🔥</h3>

      <div class="plan-box">
        <div class="plan-title">✅ Optimización de CV</div>
        <span class="old-price">$15</span> → <span class="new-price">$5</span>
        <p>🔹 Optimización de contenido y formato profesional.</p>
        <a href="https://calendly.com/talentiave/cv-optimization" class="button" style="color: white !important;">📆 Agendar</a>
      </div>

      <div class="plan-box">
        <div class="plan-title">✅ CV + LinkedIn + Portafolio</div>
        <span class="old-price">$30</span> → <span class="new-price">$15</span>
        <p>🔹 Mejora tu presencia profesional en todas las plataformas clave.</p>
        <a href="https://calendly.com/talentiave/cv-optimization" class="button" style="color: white !important;">📆 Agendar</a>
      </div>

      <div class="plan-box">
        <div class="plan-title">✅ Creación Completa (CV + LinkedIn + Portafolio Online)</div>
        <span class="old-price">$50</span> → <span class="new-price">$30</span>
        <p>🔹 Creamos todo desde cero con un portafolio web personalizado.</p>
        <a href="https://calendly.com/talentiave/cv-optimization" class="button" style="color: white !important;">📆 Agendar</a>
      </div>

      <p>⚡ ¡No dejes pasar esta oferta! Mejora tu perfil y aumenta tus oportunidades laborales. 🚀</p>

      <p class="footer">© ${new Date().getFullYear()} Talentia. Todos los derechos reservados.</p>
    </div>
  </body>
  </html>
`;

module.exports = resumeImprovementEmailTemplate;
