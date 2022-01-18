const mongoose = require("mongoose");
require("dotenv").config();
const MONGODB_URI = process.env.MONGOURI
const connectDB = async () => {

    try {
        const db = await mongoose.connect(MONGODB_URI,)
        if(db) console.log("DB connected succesfuly");
    } catch (err) {
        console.log(err.message);
    } 
}

module.exports = connectDB