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
app.use(express.json());
app.post("/findOne", async (req, res) => {
  try {   
    const { database, collection, filter, projection } = req.body;
    // connect to the database
    await client.connect();
    const db = client.db(database);
    const col = db.collection(collection);
    const document = await col.findOne(filter, projection);

    // set the response type to JSON
    res.type("json");

    // send the document as a response
    res.type("json");
    res.status(200);
    res.json({
      document : document
    });
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

/*

  API endpoint: localhost:3000/findOne
  Your endpoint should accept POST request
  Instead of accepting query string (example: localhost:3000/findOne?property_type=Apartment&bedrooms=2&beds=2), I want you to accept JSON body that accepts below properties. (very similar to 
  database
  collection
  filter
  filter values will be specific to collection
  projection
  projection values will be specific to collection

  Example:
  {
    "db": "sample_airbnb",
    "collection": "listingsAndReviews",
    "filter": {
      "property_type": "Apartment",
      "bedrooms": 2,
      "beds": 2
    },
    "projection": {
      "_id": 0,
      "listing_url": 1,
      "name": 1,
      "summary": 1,
      "property_type": 1,
      "bedrooms": 1,
      "beds": 1
    }
  }

  You can use the following code to test your API endpoint:
  const axios = require('axios');
  const data = JSON.stringify({
    "db": "sample_airbnb",
    "collection": "listingsAndReviews",
    "filter": {
      "property_type": "Apartment",
      "bedrooms": 2,
      "beds": 2
    },
    "projection": {
      "_id": 0,
      "listing_url": 1,
      "name": 1,
      "summary": 1,
      "property_type": 1,
      "bedrooms": 1,
      "beds": 1
    }
  });
  const config = {
    method: 'post',
    url: 'http://localhost:3000/findOne',
    headers: {
      'Content-Type': 'application/json'
    },
    data : data
  };
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });


*/