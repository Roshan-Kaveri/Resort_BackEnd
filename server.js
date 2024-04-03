const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
var price=100;
var price1=200;
var price2=300;
var total_price=0;
var resort_id;
var guest_id=1;
var payment_id=101;
var Invoices;
// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

app.post("/roombook", async (req, res) => {
  const { roomNo, checkInDate, checkOutDate,roomType,others,resort_id} = req.body;
  const startDate = new Date(checkInDate);
  const endDate = new Date(checkOutDate);
  console.log(endDate);
  console.log(startDate);
  const differenceInDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  if(roomType==="Single")
  total_price=differenceInDays*price;
  else if(roomType==="Double")
  total_price=differenceInDays*price1;
  else if(roomType==="Deluxe")
  total_price=differenceInDays*price2;
if(others==="Jym"||others==="Spa")
total_price=total_price+50;
try {
  const insertQuery = await db.query("INSERT INTO reservations (resort_id, guest_id, room_number, payment_id, check_in_date, check_out_date, total_price) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [resort_id, guest_id, roomNo, payment_id, checkInDate, checkOutDate, total_price]
  );
 Invoices = await db.query("SELECT * FROM invoices");
  Invoices .rows[0].invoices_id
  console.log("Insertion successful");
   // HTML content generation
   const htmlContent = `
   <html>
     <head>
       <title>Room Booking Confirmation</title>
     </head>
     <body>
       <h1 style="color: black; font-size: 16px;">Room Booking Confirmation</h1>
       <p>Invoices Id: ${Invoices.rows[0].invoices_id}</p>
       <p>Resort_Id: ${resort_id}</p>
       <p>Room Number: ${roomNo}</p>
       <p>Check-in Date: ${checkInDate}</p>
       <p>Check-out Date: ${checkOutDate}</p>
       <p>Room_Type: ${roomType}</p>
       <p>Others: ${others}</p>
       <p>Total Price: $${total_price}</p>
     </body>
   </html>
 `;

 // Set the Content-Type header to text/html
 res.setHeader("Content-Type", "text/html");
 // Send the HTML content as the response
 res.send(htmlContent);
} catch (error) {
  console.error("Error inserting into database:", error);
}
});
app.listen(9000, () => {
console.log(`Server is running on port 9000`);
});