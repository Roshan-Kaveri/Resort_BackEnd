const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
const PORT = 9001;
var Invoice;
// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// Route to handle POST requests to the /Food endpoint
app.post("/Food",async (req, res) => {
  const { item, price,quantity } = req.body;
  const total_price = parseInt(price) * parseInt(quantity) ; // Just an example calculation
console.log("hello");
try {
    const insertQuery = await db.query("INSERT INTO food_ordered (reservation_id,type,count) VALUES ($1,$2)",
      [1,item,quantity]
    );
   Invoice = await db.query("SELECT * FROM invoices");
    Invoice.rows[0].invoices_id
    console.log("Insertion successful");
  const htmlContent = `
    <html>
      <head>
        <title>Food Order Confirmation</title>
      </head>
      <body>
        <h1 style="color: black; font-size: 16px;">Food Order Confirmation</h1>
        <p>Item: ${Invoice}}</p>
        <p>Item: ${item}</p>
        <p>Price: $${price}</p>
        <p>Quantity: $${quantity}</p>
        <p>Total Price: $${total_price}</p>
      </body>
    </html>
  `;
  // Set the Content-Type header to text/html
  res.setHeader("Content-Type", "text/html");
  // Send the HTML content as the response
  res.send(htmlContent);
}catch (error) {
    console.error("Error inserting into database:", error);
  }
  });
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
