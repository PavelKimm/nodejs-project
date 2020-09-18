const Users = require("./Users");

module.exports = function (router) {
  router.post("/create-collection", Users.createCollection);
  router.post("/create", Users.createOne);
  router.get("/get", Users.get);
  router.patch("/update", Users.updateOne);
  router.delete("/delete", Users.deleteOne);
  router.delete("/delete-many", Users.deleteMany);
};

//   insertMany,
//   getOne,
