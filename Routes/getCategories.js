const express = require("express");
const categoryRouter = express.Router();
const db = require("../db/queries");

async function getCategories(req, res) {
  const categories = await db.getAllCategoriesandItems();

  res.send(categories);
}

categoryRouter.get("/", getCategories);

module.exports = categoryRouter;
