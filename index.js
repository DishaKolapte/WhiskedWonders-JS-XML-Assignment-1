const express = require("express");
const path = require("path"); 
const dotenv = require("dotenv");

//load the environment variables from .env
dotenv.config();

const db = require("./modules/cakes/db"); //load db.js

//set up the Express app
const app = express();
const port = process.env.PORT || "8888";

//set up application template engine
app.set("views", path.join(__dirname, "views")); 

app.set("view engine", "pug");

// set up middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

//set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

//USE PAGE ROUTES FROM ROUTER(S)
app.get("/", async (request, response) => {
  let cakeslist = await db.getCakes();

  if (!cakeslist.length) {
    await db.initializeCakes();
    cakeslist = await db.getCakes();
  }
  console.log(cakeslist);
  response.render("index", { cakes: cakeslist });
});

app.get("/about", async (request, response) => {
  response.render("about", { title: "About" });
});
app.get("/products", async (request, response) => {
  let cakeslist = await db.getCakes();
  response.render("products", { title: "Products", cakes: cakeslist });
});

//add a new cake.
app.get("/add", async (request, response) => {
  response.render("add-cake", { title: "Add a new cake" });
});

app.post("/cakes/add", async (request, response) => {
  const { name, ingredients, imageUrl, quantity, price } = request.body;
  await db.addCake(name, imageUrl, ingredients, quantity, price);
  response.redirect("/products");
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
