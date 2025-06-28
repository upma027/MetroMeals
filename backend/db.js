const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const food = require("../backend/models/food");
const type = require("../backend/models/type");


const mongoose_url = process.env.MONGO_URI;
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoose_url, { useNewUrlParser: true });
    console.log("DB CONNECTED");
    try {
      const data = await food.find({}).exec();
      global.food_items = data;
      // console.log("🍽️ Loaded food items:", global.food_items.length);

      const Category = await type.find({}).exec();
      global.food_category = Category;
      // console.log("📂 Loaded categories:", global.food_category.length);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = mongoDB;