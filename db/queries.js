const pool = require("./pool");

async function getAllCategoriesandItems() {
  const categoriesAndItems = await pool.query(`SELECT c.categoryid,
     c.categorycd,
      c.categoryname,
      STRING_AGG(i.itemname, ', ') AS items
FROM categories c
 INNER JOIN items i ON c.categoryid = i.categoryid
 GROUP BY c.categoryid, c.categorycd, c.categoryname;`);

  return { categoriesAndItems };
}

module.exports = {
  getAllCategoriesandItems,
};
