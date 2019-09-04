var path = require('path');
const fs = require('fs');
const join = require('path').join;
const models = join(__dirname, './../models');
const axios = require('axios');
const mongoose = require('mongoose');
// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.indexOf('.js'))
  .forEach(file => require(join(models, file)));

async function getUser () {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    let data = response.data;
    data.forEach((data) => {
      var options = { keepAlive: 1, useNewUrlParser: true };
      var connection = mongoose.createConnection(`mongodb://localhost/user_${data.id}`, options);

      const UserModel = connection.model('User');
      const newUser = new UserModel(data);
      newUser.save().then(() => console.log(data));
    });
    await postAndComment();
  } catch (error) {
    console.error(error);
  }
}

async function postAndComment () {
  try {
    const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const commentsResponse = await axios.get('https://jsonplaceholder.typicode.com/comments');
    let posts = postsResponse.data;
    let comments = commentsResponse.data;

    posts.forEach(function (post) {
      post.comments = comments.find(comment => comment.postId === post.id);
    });

    // console.log(posts);

    posts.forEach((data) => {
      var options = { keepAlive: 1, useNewUrlParser: true };
      var connection = mongoose.createConnection(`mongodb://localhost/user_${data.userId}`, options);
      const PostModel = connection.model('Post');
      const newPost = new PostModel(data);
      newPost.save().then(() => console.log(data));
    });

  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getUser
};