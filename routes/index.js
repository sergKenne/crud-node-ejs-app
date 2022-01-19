const express = require("express")
const multer = require("multer")
const fs = require('fs')
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
    try {
         const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: req.file.filename,
        });

        await user.save();
        res.redirect("/")
    } catch (err) {
        console.log(err);
    }
})

router.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    // localStorage.setItem("userId", id)
    User.findById(id, (err, user) => {
        if (err) return console.log(err);
        console.log(user);
        res.render("pages/edit", {user})
    })
})

//Edit user
router.post("/update/:id", upload, async(req, res) => {
    const userId = req.params.id;
    const update_user = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: (req.file == undefined) ? req.body.old_image : req.file.filename ,
    };


    User.findByIdAndUpdate(userId, update_user, (err, user) => {
        if (err) {
            res.json({
                success: false,
                message: err.message,
            });
        } else {
            res.redirect('/');
        }
    });

    // if (req.file) {
    //     update_user.image = req.file.filename
    //     try {
    //         fs.unlinkSync("./uploads/" + req.body.old_image);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // } else {
    //     update_user.image = req.body.old_image;
        
    //     User.findByIdAndUpdate(userId, update_user, (err, user) => {
    //         if (err) {
    //             res.json({
    //                 success: false,
    //                 message: err.message
    //             })
    //         } else {
    //             res.redirect('/');
    //         }
    //     });
    // }
 
})

//delete user
router.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    User.findOneAndRemove(id, (err, result) => {
        if (result.image = ! "") {
            try {
                fs.unlinkSync("./uploads/" + result.image)
            } catch (err) {
                console.log(err);
            }
        }

        if (err) {
            res.json({message: err.message})
        } else {
            res.redirect("/");
        }
    })
})




module.exports = router