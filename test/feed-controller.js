const expect = require("chai").expect;
const sinon = require("sinon");
const User = require("../models/user");
const FeedController = require("../controllers/feed");
const mongoose = require("mongoose");

describe("Feed Controller - Login", function () {

  before(function (done) {
    mongoose
        .connect(
            // put appropriate mongodb url
            ""
        )
        .then((result) => {
          const user = new User({
            email: "test@test.com",
            password: "tester",
            name: "Test",
            posts: [],
            _id: "5f9e2a0c08ff4223d123da4f",
          });
          return user.save();
        })
        .then(() => {
          done();
        });
  });

  it("should add a created post to the post of the creator", function (done) {

    const req = {
      body: {
        title: 'Test',
        content: 'A test Post'
      },
      file: {
        path: 'abc'
      },
      userId: '5f9e2a0c08ff4223d123da4f'
    };

    const res = {status: function() {
      return this
      }, json: function () {}}

    FeedController.createPost(req, res, () => {})
        .then((savedUser) => {

          expect(savedUser).to.have.property('posts');
          expect(savedUser.posts).to.have.length(1)
          done();

        })
  });


  after(function (done) {
    User.deleteMany({})
        .then(() => {
          return mongoose.disconnect();
        })
        .then(() => {
          done();
        });
  });
});
