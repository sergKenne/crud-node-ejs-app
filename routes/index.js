const express = require("express")
const multer = require("multer")
const router = express.Router();
const User = require("../models/user")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
})

var upload = multer({
    storage,
}).single("image")

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        //console.log('Users:', users);
        res.render('pages/home', { title: 'home page', users: users });
    } catch (err) {
        console.log(err);
    }
})

router.get("/add", (req, res) => {
    res.render("pages/add_user");
})

router.post("/add", upload, async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename,
    });

    await user.save();
    res.redirect("/")

})


module.exports = router