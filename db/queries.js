const pool = require("./pool");

async function getAllCategoriesandItems() {
  const categories = await pool.query("SELECT CategoryName FROM categories;");
  const items = await pool.query("SELECT itemname FROM items;");

  return { categories: categories.rows, items: items.rows };
}

module.exports = {
  getAllCategoriesandItems,
};
