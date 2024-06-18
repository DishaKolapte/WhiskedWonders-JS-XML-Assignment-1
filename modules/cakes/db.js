const mongoose = require("mongoose"); //import Mongoose

//const dbUrl = `mongodb://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/?authSource=testdb`;
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(dbUrl);

//Setting up the Schema model
const cakeSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  ingredients: String,
  quantity: Number,
  price: String,
});

const Cake = mongoose.model("Cake", cakeSchema);

//MONGODB FUNCTIONS
async function connect() {
  await mongoose.connect(dbUrl); //connect to mongodb
}

// Returning the array for find all.
async function getCakes() {
  await connect();
  return await Cake.find({}).sort({ name: 1 });
}
// Initializing the cakes model with data.
async function initializeCakes() {
  const cakeList = [
    {
      name: "Decadent chocolate",
      imageUrl: "",
      ingredients:
        "A rich, moist dessert made primarily with cocoa powder and melted chocolate, flour, sugar, eggs, butter or oil, and leavening agents like baking powder or baking soda. It typically has a dense, fudgy texture and a deep chocolate flavor",
      quantity: 1,
      price: "$ 25.49",
    },
    {
      name: "Red Velvet",
      imageUrl: "",
      ingredients:
        "This classic cake is renowned for its velvety texture and subtle cocoa flavor, all enhanced by the tanginess of buttermilk. Topped with a luscious cream cheese frosting, this cake is both visually stunning and incredibly delicious.",
      quantity: 1,
      price: "$ 20.99",
    },
    {
      name: "Carrot crumble",
      imageUrl: "",
      ingredients:
        "Packed with freshly grated carrots and crunchy walnuts, this cake is exceptionally moist and flavorful. The warm spices of cinnamon and nutmeg add a comforting touch, while the smooth cream cheese frosting provides the perfect balance of sweetness and tanginess",
      quantity: 1,
      price: "$28",
    },
  ];
  await Cake.insertMany(cakeList);
}

//Function to add a cake to the cakes collection
async function addCake(cakeName, cakeImage, cakeIngredients, cakeQuantity, cakePrice) {
  let newCake = new Cake({
    name: cakeName,
    imageUrl: cakeImage,
    ingredients: cakeIngredients,
    quantity: cakeQuantity,
    price: cakePrice,
  });
  newCake.save();
}

module.exports = {
  getCakes,
  initializeCakes,
  addCake,
};
