const express = require('express');
const app = express();
require('dotenv').config()

//set view engine
app.set('view engine', 'ejs');


app.get("/", (req, res) => {
    res.render("pages/home", {title: 'home page'})
})

app.get("/add", (req, res) => {
    res.render("pages/add_user")
})


app.listen(process.env.PORT, () => {
    console.log(`server run in port ${process.env.PORT}`);
})