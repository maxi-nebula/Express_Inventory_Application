const express = require("express");
const categoryRouter = express.Router();
const db = require("../db/queries");
const { getDataFromDb } = require("./dataHandler");

async function getCategories(req, res) {
  const handledData = await getDataFromDb();
  res.render("indexView", { handledData });
  return handledData;
}

categoryRouter.get("/", getCategories);

module.exports = categoryRouter;
