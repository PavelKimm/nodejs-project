const Posts = require("./Posts");
// const Auth = require("./Auth");

module.exports = function (router) {
  // router.post("/login", Auth.get);

  router.get("/posts", Posts.get);
  router.post("/posts", Posts.createOne);
  router.get("/posts/:postId", Posts.getOne);
  router.patch("/posts/:postId", Posts.updateOne);
  router.delete("/posts/:postId", Posts.deleteOne);
};
