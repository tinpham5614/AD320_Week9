import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import express from "express";
dotenv.config();
// Replace the uri string with your connection string.
// console.log(process.env)
// const uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";
const db_username = process.env.MONGO_DB_USERNAME;
const db_password = process.env.MONGO_DB_PASSWORD;
const db_url = process.env.MONGO_DB_URL;
const uri = `mongodb+srv://${db_username}:${db_password}@${db_url}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const app = express();
app.set("port", process.env.PORT || 3000);
app.get("/findOne", async (req, res) => {
  try {
    const database = client.db("sample_airbnb");
    const airbnbs = database.collection("listingsAndReviews");

    const query = {};
    query.property_type = req.query.property_type;
    query.bedrooms = parseInt(req.query.bedrooms, 10);
    query.beds = parseInt(req.query.beds, 10);
  
    const projection = {
      _id: 1,
      listing_url: 1,
      name: 1,
      summary: 1,
      property_type: 1,
      bedrooms: 1,
      beds: 1
    };
    const airbnb = await airbnbs.findOne(query, {projection});
    console.log(airbnb);

    res.type("json");
    res.status(200);
    res.json({
      airbnb : airbnb
    });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
});
app.use((req, res) => {
  res.type("text/plain");
  res.status(404);
  res.send("404 - Not found");
});
app.listen(app.get("port"), () => {
  console.log("Express started");
});
