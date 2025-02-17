const nodemailer = require("nodemailer");
const talentEmailTemplate = require("./templates/newTalentEmail");
const companyEmailTemplate = require("./templates/newCompanyEmail");
const newSubscriptionEmailTemplate = require("./templates/newSubscriptionEmail");
const proposalUserEmailTemplate = require("./templates/proposals/proposalUserEmailTemplate");
const adminEmailTemplate = require("./templates/proposals/adminEmailTemplate");
const talentProposalEmailTemplate = require("./templates/proposals/talentEmailTemplate");
const resumeImprovementEmailTemplate = require("./templates/bulk-emails/optimizeProfileEmail");
require("dotenv").config();

const sendTalentEmail = async (to, subject, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or use 'SMTP' for custom email providers
      auth: {
        user: process.env.EMAIL_USERNAME, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    const mailOptions = {
      from: `"Talentia" <${process.env.EMAIL_USERNAME}>`,
      to: [to, "contacto@talentiave.com"],
      subject,
      html: talentEmailTemplate(name, to),
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to", to);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

const sendCompanyEmail = async (to, subject, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or use 'SMTP' for custom email providers
      auth: {
        user: process.env.EMAIL_USERNAME, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    const mailOptions = {
      from: `"Talentia" <${process.env.EMAIL_USERNAME}>`,
      to: [to, "contacto@talentiave.com"],
      subject,
      html: companyEmailTemplate(name, to),
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to", to);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

const sendSubscriptionEmail = async (to, subject, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or use 'SMTP' for custom email providers
      auth: {
        user: process.env.EMAIL_USERNAME, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    const mailOptions = {
      from: `"Talentia" <${process.env.EMAIL_USERNAME}>`,
      to: [to, "contacto@talentiave.com"],
      subject,
      html: newSubscriptionEmailTemplate(name, to),
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to", to);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

const sendProposalUserEmail = async (to, subject, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or use 'SMTP' for custom email providers
      auth: {
        user: process.env.EMAIL_USERNAME, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    const mailOptions = {
      from: `"Talentia" <${process.env.EMAIL_USERNAME}>`,
      to: [to],
      subject,
      html: proposalUserEmailTemplate(name),
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to", to);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

const sendProposalAdminEmail = async (subject, talentUserEmail, proposalUserEmail, file, description) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or use 'SMTP' for custom email providers
      auth: {
        user: process.env.EMAIL_USERNAME, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    const mailOptions = {
      from: `"Talentia" <${process.env.EMAIL_USERNAME}>`,
      to: ["contacto@talentiave.com"],
      subject,
      html: adminEmailTemplate(proposalUserEmail, talentUserEmail, file, description),
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully");
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

const sendTalentProposalEmail = async (to, subject, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or use 'SMTP' for custom email providers
      auth: {
        user: process.env.EMAIL_USERNAME, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    const mailOptions = {
      from: `"Talentia" <${process.env.EMAIL_USERNAME}>`,
      to: [to],
      subject,
      html: talentProposalEmailTemplate(name),
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to", to);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

const sendImproveProfileEmail = async (to, subject, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or use 'SMTP' for custom email providers
      auth: {
        user: process.env.EMAIL_USERNAME, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    const mailOptions = {
      from: `"Talentia" <${process.env.EMAIL_USERNAME}>`,
      to,
      subject,
      html: resumeImprovementEmailTemplate(name),
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to", to);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

module.exports = { sendTalentEmail, sendCompanyEmail, sendSubscriptionEmail, sendProposalUserEmail, sendProposalAdminEmail, sendTalentProposalEmail, sendImproveProfileEmail };
