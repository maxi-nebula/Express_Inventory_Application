const { Client } = require("pg");

const SQL = `CREATE TABLE IF NOT EXISTS Categories (
  CategoryID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  CategoryCD VARCHAR(20) UNIQUE NOT NULL,
  CategoryName VARCHAR(255),
  AddedDate DATE,
  ModifiedDate DATE,
  AddedUser VARCHAR(255)
);

-- Insert Categories
INSERT INTO Categories (CategoryCD, CategoryName, AddedDate, ModifiedDate, AddedUser) 
VALUES
  ('CDA','Category A','2025-08-26','2025-08-26','Madhu'),
  ('CDB','Category B','2025-08-26','2025-08-26','Madhu'),
  ('CDC','Category C','2025-08-26','2025-08-26','Madhu'),
  ('CDD','Category D','2025-08-26','2025-08-26','Madhu'),
  ('CDE','Category E','2025-08-26','2025-08-26','Madhu');

-- Items table
CREATE TABLE IF NOT EXISTS Items (
  ItemID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  CategoryID INT NOT NULL,
  ItemCD VARCHAR(20) UNIQUE NOT NULL,
  ItemName VARCHAR(255),
  Price NUMERIC(15,4),
  CurrencyCD VARCHAR(3),
  FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

-- Insert Items (use subquery to map CategoryCD → CategoryID)
INSERT INTO Items (CategoryID, ItemCD, ItemName, Price, CurrencyCD)
VALUES
  ((SELECT CategoryID FROM Categories WHERE CategoryCD='CDA'),'ITA','ITEM A',12.00,'USD'),
  ((SELECT CategoryID FROM Categories WHERE CategoryCD='CDA'),'ITB','ITEM B',11.00,'USD'),
  ((SELECT CategoryID FROM Categories WHERE CategoryCD='CDA'),'ITC','ITEM C',6.50,'USD'),
  ((SELECT CategoryID FROM Categories WHERE CategoryCD='CDB'),'ITD','ITEM D',4.90,'USD'),
  ((SELECT CategoryID FROM Categories WHERE CategoryCD='CDB'),'ITE','ITEM E',17.40,'USD'),
  ((SELECT CategoryID FROM Categories WHERE CategoryCD='CDB'),'ITF','ITEM F',13.00,'USD'),
  ((SELECT CategoryID FROM Categories WHERE CategoryCD='CDB'),'ITG','ITEM G',20.00,'USD'),
  ((SELECT CategoryID FROM Categories WHERE CategoryCD='CDC'),'ITH','ITEM H',5.00,'USD');

-- Cart table
CREATE TABLE IF NOT EXISTS Cart (
  CartItemID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  ItemID INT NOT NULL,
  Quantity NUMERIC DEFAULT 1,
  OrderedDate DATE,
  FOREIGN KEY (ItemID) REFERENCES Items(ItemID)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

-- Example Cart Inserts
INSERT INTO Cart (ItemID, Quantity, OrderedDate)
VALUES 
  ((SELECT ItemID FROM Items WHERE ItemCD='ITA'), 2, '2025-08-26'),
  ((SELECT ItemID FROM Items WHERE ItemCD='ITC'), 1, '2025-08-26');`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://postgres:101ei140@localhost:5432/inventory",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
