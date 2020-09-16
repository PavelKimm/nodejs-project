const getHeros = function (req, res, next) {
  res.json({ test: "test" });
};

module.exports = function (router) {
  //   router.post("/create", Heros.createHero);
  router.get("/get", getHeros);
  //   router.get("/get/:name", Heros.getHero);
  //   router.patch("/update/:id", Heros.updateHero);
  //   router.delete("/remove/:id", Heros.removeHero);
};
