const User = require("./userModel");
const Skills = require("./skillsModel");
const UserSkills = require("./userSkills");

// ✅ Define many-to-many relationship in a separate file
User.belongsToMany(Skills, {
  through: UserSkills,
  foreignKey: "user_id",
  otherKey: "skill_id",
  as: "skills",
});

Skills.belongsToMany(User, {
  through: UserSkills,
  foreignKey: "skill_id",
  otherKey: "user_id",
  as: "users",
});

module.exports = { User, Skills, UserSkills };
