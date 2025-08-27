const express = require("express");
const itemsRouter = express.Router();
const db = require("../db/queries");

async function getItems(req, res) {
  const items = await db.getAllCategoriesandItems();

  res.send(items);
}

itemsRouter.get("/items", getItems);
module.exports = itemsRouter;
