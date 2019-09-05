var path = require('path');
const fs = require('fs');
const join = require('path').join;
const models = join(__dirname, './../models');
const axios = require('axios');
const mongoose = require('mongoose');
const config = require('./../config');
// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.indexOf('.js'))
  .forEach(file => require(join(models, file)));

async function getUser () {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    let usersData = response.data;
    for (const data of usersData) {
      var options = { keepAlive: 1, useNewUrlParser: true };
      var connection = mongoose.createConnection(`${config.db}/user_${data.id}`, options);

      const UserModel = connection.model('User');
      const newUser = new UserModel(data);
      await newUser.save();
    }
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

    for (const data of posts) {
      var options = { keepAlive: 1, useNewUrlParser: true };
      var connection = mongoose.createConnection(`${config.db}/user_${data.userId}`, options);
      const PostModel = connection.model('Post');
      const newPost = new PostModel(data);
      await newPost.save();
    }
    console.log('Data inserted successfully ');
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getUser
};