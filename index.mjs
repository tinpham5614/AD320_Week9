import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
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
app.use(cors());
app.get("/findOne", async (req, res) => {
  try {
    await client.connect();
    console.log("Connected correctly to server");

    const query = {};
    // make database as a query parameter
    query.database = req.query.database;
    // make collection as a query parameter
    query.collection = req.query.collection;
    // make projection as a query parameter
    query.projection = req.query.projection;
    // make sort as a query parameter
    query.search_term = req.query.search_term;

    const col = client.db(query.database).collection(query.collection);
    
    const projection = {
      _id: 0,
      listing_url: 1,
      name: 1,
      summary: 1,
      property_type: 1,
      bedrooms: 1,
      beds: 1,
    };
    const data = await col.findOne(query, { projection, sort, limit });
    console.log(data);
    
    res.type("json");
    res.status(200);
    res.json({
      data : data
    });
    console.log(data);
  } catch (error) {
    console.log(error);
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

