const express = require("express");

const db = require("../db/queries");

/*async function getCategories(req, res) {
  const categories = await db.getAllCategoriesandItems();

  res.send(categories);
}*/

async function getDataFromDb() {
  const rawData = await db.getAllCategoriesandItems();
  console.log("Data handled here");
  const strigifiedData = JSON.stringify(rawData.categoriesAndItems);
  const parsedData = JSON.parse(strigifiedData);
  console.log(parsedData);

  let id = 1;

  const categoryAndItemsDetails = parsedData.rows.map((eachRow) => ({
    id: id++,
    categoryid: eachRow.categoryid,
    categorycd: eachRow.categorycd,
    categoryname: eachRow.categoryname,
    itemsunderthecategory: eachRow.items,
  }));

  console.log(categoryAndItemsDetails);
  return categoryAndItemsDetails;
}

module.exports = { getDataFromDb };
