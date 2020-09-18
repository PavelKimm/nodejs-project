const MongoClient = require("mongodb").MongoClient;
const dbName = "mydb";
const collectionName = "users";
const url = "mongodb://localhost:27017/" + dbName;

exports.createCollection = function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.createCollection(req.body.collectionName, function (err, result) {
      if (err) throw err;
      res.json({
        result: "Collection " + req.body.collectionName + " was created!",
      });
      db.close();
    });
  });
};

exports.getOne = function () {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").findOne({}, function (err, result) {
      if (err) throw err;
      res.json({ result: result });
      db.close();
    });
  });
};
exports.insertMany = function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo
      .collection(collectionName)
      .insertMany(req.body.myobj, function (err, result) {
        if (err) throw err;
        res.json({ result: result });
        db.close();
      });
  });
};

exports.createOne = function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const dbo = db.db(dbName);
    dbo
      .collection(collectionName)
      .insertOne(req.body.myobj, function (err, result) {
        if (err) throw err;
        res.json({ result: result });
        db.close();
      });
  });
};

exports.get = function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const dbo = db.db(dbName);
    dbo
      .collection(collectionName)
      .find(req.body.query, req.body.projection)
      .sort(req.body.mySort)
      .toArray(function (err, result) {
        if (err) throw err;
        res.json({ result: result });
        db.close();
      });
  });
};

exports.updateOne = function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const dbo = db.db(dbName);
    dbo
      .collection(collectionName)
      .updateOne(req.body.query, req.body.newValues, function (err, result) {
        if (err) throw err;
        res.json({ result: result });
        db.close();
      });
  });
};

exports.updateMany = function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    const dbo = db.db(dbName);
    dbo
      .collection(collectionName)
      .updateMany(req.body.query, req.body.newValues, function (err, result) {
        if (err) throw err;
        res.json({ result: result });
        db.close();
      });
  });
};

exports.deleteOne = function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo
      .collection(collectionName)
      .deleteOne(req.body.query, function (err, obj) {
        if (err) throw err;
        res.json({ result: obj });
        db.close();
      });
  });
};

exports.deleteMany = function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo
      .collection(collectionName)
      .deleteMany(req.body.query, function (err, obj) {
        if (err) throw err;
        res.json({ result: obj });
        db.close();
      });
  });
};

// createCollection(dbName, collectionName);
// const myobj = [
//   { name: "John", address: "Highway 71" },
//   { name: "Peter", address: "Lowstreet 4" }
// ];
