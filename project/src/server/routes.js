const Posts = require("./Posts");

module.exports = function (router) {
  router.get("/posts", Posts.get);
  router.post("/posts", Posts.createOne);
  router.get("/posts/:postId", Posts.getOne);
  router.patch("/posts/:postId", Posts.updateOne);
  router.delete("/posts/:postId", Posts.deleteOne);
};
