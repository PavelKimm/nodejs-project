const router = require("express").Router();
const PostsApi = require("./api/postsApi");

// const Auth = require("./Auth");
// router.post("/login", Auth.get);

router.get("/", PostsApi.get);
router.post("/", PostsApi.createOne);
router.get("/:postId", PostsApi.getOne);
router.patch("/:postId", PostsApi.updateOne);
router.delete("/:postId", PostsApi.deleteOne);

module.exports = router;
