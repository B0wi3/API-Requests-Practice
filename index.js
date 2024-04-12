import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";


const Username = "DvvBowiee";
const Password = "11770077";
const APIKey = "84ac0780-aaf5-4f1e-8f0f-43080977254f";
const BearerToken = "a64b0548-7bbe-4029-bf95-228f2415b6ce";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try{
  const response = await axios.get(API_URL + "random");
  const result = response.data;
  console.log(result);
  res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request", error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "all", {
      auth: {
        username: Username,
        password: Password
      },
    });
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request", error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const score = 5;
    const response = await axios.get(API_URL + `filter?score=${score}&apiKey=${APIKey}`);
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request", error.message);
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const id = 42;
    const response = await axios.get(API_URL + `secrets/${id}`, {
      headers: {
        "Authorization": `Bearer ${BearerToken}`
      }
    })
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request", error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
