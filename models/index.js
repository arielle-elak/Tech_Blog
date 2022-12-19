const User = require("./User");
const Post = require("./Post");

// User and Post Relationships
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// Comment Relationships

// A comment is made by signed-in user per author_id
Comment.belongsTo(User, {
    foreignKey: 'author_id'
});

// A user can have many comments per author_id
User.hasMany(Comment, {
    foreignKey: 'author_id',
});

// Comments are also associated with a specific post_id

Comment.belongsTo(Post, {
    foreignKey: "post_id",
});

// Posts can have many comments per post_id

Post.hasMany(Comment, {
    foreignKey: 'post_id',
});



module.exports = { User, Post, Comment};
