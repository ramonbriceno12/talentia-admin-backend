const User = require("../models/userModel");
const Company = require("../models/companiesModel");
const { sendSubscriptionEmail, sendImproveProfileEmail } = require("../utils/sendEmails");

const calendlyClickedByUser = async (req, res) => {
    try {
        const email = decodeURIComponent(req.params.email.toLowerCase());
        console.log('Pasmos por aqui')

        const user = await User.findOne({ where: { email } }); // Find user by email

        if (!user) return res.status(404).json({ message: "User not found" });

        user.calendly_clicked = true;
        await user.save();

        res.json({ message: "Calendly clicked updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating calendly clicked" });
    }
};

const calendlyClickedByCompany = async (req, res) => {
    try {
        const email = decodeURIComponent(req.params.email.toLowerCase());

        const company = await Company.findOne({ where: { email } }); // Find company by email

        if (!company) return res.status(404).json({ message: "Company not found" });

        company.calendly_clicked = true;
        await company.save();

        res.json({ message: "Calendly clicked updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating calendly clicked" });
    }
}

const addSubscription = async (req, res) => {

    try {
        const { name, email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            await User.create({
                full_name: name,
                email,
                role: 'talent',
                subscribed: true,
            });
        } else {
            user.subscribed = true;
            await user.save();
        }

        sendSubscriptionEmail(email, '🎯 Guía GRATIS para mejorar tu perfil profesional – Talentia 📥', name);

        res.status(200).json({ message: "Subscription added successfully", email: user.email });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding subscription" });
    }

}

const sendImprovementEmail = async (req, res) => {
    try {
        // Fetch users with email_sent = false and include the primary key
        const users = await User.findAll({
            attributes: ['id', 'full_name', 'email'],  // Include the primary key
            where: { email_sent: false }
        });

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        // Send an improvement email to each user
        for (const user of users) {
            console.log('Sending email to:', user.email);

            await sendImproveProfileEmail(
                user.email,
                '⚠️ Tu perfil puede estar limitando tus oportunidades… Descubre cómo mejorar 📥',
                user.full_name
            );

            // Update email_sent status using update() instead of save()
            await User.update(
                { email_sent: true },
                { where: { id: user.id } }
            );
        }

        res.status(200).json({ message: "Emails sent successfully to all users" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error sending emails" });
    }
};



module.exports = { calendlyClickedByUser, calendlyClickedByCompany, addSubscription, sendImprovementEmail };