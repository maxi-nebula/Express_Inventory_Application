const express = require("express");
const path = require("node:path");
const app = express();
const PORT = process.env.PORT || 3000;
const getCategories = require("./Routes/getCategories");
const getItems = require("./Routes/getItems");

app.use("/", getCategories);
//app.use("/", getItems);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
