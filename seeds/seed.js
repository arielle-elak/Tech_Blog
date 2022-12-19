const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models/index");

// Import seed data in JSON format
const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

    // Import Users
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

    // Import Posts
  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    }

    // Import Comments
    for (const comment of commentData) {
        await Comment.create({
          ...comment,
        });
      }

  process.exit(0);
};

seedDatabase();
