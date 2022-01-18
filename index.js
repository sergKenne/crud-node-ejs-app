const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("uploads"));
//set view engine
app.set('view engine', 'ejs');

const connectDB = require("./dbConnection")
const userRouter = require("./routes")

connectDB();

app.use("/", userRouter)




// app.get("/", (req, res) => {
//     res.render("pages/home", {title: 'home page'})
// })

// app.get("/add", (req, res) => {
//     res.render("pages/add_user")
// })


app.listen(process.env.PORT, () => {
    console.log(`server run in port ${process.env.PORT}`);
})