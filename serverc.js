const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
const PORT = 9002;

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

app.post("/cab",async (req, res) => {
  const { from, to,resort_id} = req.body;
  const price = 50; // Assuming the price is fixed at $50
console.log("hello");
try {
  const insertQuery = await db.query("INSERT INTO cab_services (guest_id,resort_id,from,to,price) VALUES ($1,$2)",
    [1,resort_id,from,to,price]
  );
 Invoice = await db.query("SELECT * FROM invoices");
  Invoice.rows[0].invoices_id
  console.log("Insertion successful");
// For demonstration, let's generate an HTML confirmation page
const htmlContent = `
<html>
  <head>
    <title>Cab Booking Confirmation</title>
  </head>
  <body>
    <h1 style="color: black; font-size: 16px;">Cab Booking Confirmation</h1>
    <p>Resort_id: ${resort_id}</p>
    <p>From: ${from}</p>
    <p>To: ${to}</p>
    <p>Price: $${price}</p>
    <p>Your cab has been booked successfully!</p>
  </body>
</html>
`;

// Set the Content-Type header to text/html
res.setHeader("Content-Type", "text/html");
// Send the HTML content as the response
res.send(htmlContent);
}
catch (error) {
  console.error("Error inserting into database:", error);
}
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
