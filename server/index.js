const express = require("express");

const config = require("./config.js");
const PORT = 3030;
const axios = require("axios");
const models = require("./models.js");

let app = express();

app.use(express.static("dist"));

app.use(express.json());

app.get("/products", (req, res) => {
  let id = null;
  models.getAllProducts(id, (err, results) => {
    if (err) {
      console.log("you hit an error on server/index.js");
      res.status(404).send("you hit an error");
    } else {
      res.status(200).send(results);
    }
  });
});

app.get("/related", (req, res) => {
  let id = req.query.ID;

  models.getRelatedProductsIDs(id, (err, results) => {
    if (err) {
      res
        .status(404)
        .send("you hit an error trying to get the relatedProductsIDs");
    } else {
      res.status(200).send(results);
    }
  });
});

app.get("/styles", (req, res) => {
  let id = req.query.ID;

  models.getProductStyles(id, (err, arrOfAllProductStyles) => {
    if (err) {
      res
        .status(404)
        .send("you hit an error trying to get the products styles");
    } else {
      //console.log("arr", arrOfAllProductStyles);
      res.status(200).send(arrOfAllProductStyles);
    }
  });
});

app.get("/qa", (req, res) => {
  let id = req.query.id;
  models.getProductQuestions(id, (err, results) => {
    if (err) {
      res
        .status(404)
        .send("could not find any questions for the related product");
    } else {
      res.status(200).send(results.data);
    }
  });
});

app.get("/currentProduct", (req, res) => {
  let id = req.query.ID;
  models.getCurrentProduct(id, (err, results) => {
    if (err) {
      res
        .status(404)
        .send("you hit an error trying to get the current product");
    } else {
      res.status(200).send(results);
    }
  });
});

app.listen(PORT, (err, success) => {
  if (err) {
    console.log("Error listening to Server...", err);
  } else {
    console.log("Listening on port:" + PORT);
  }
});
