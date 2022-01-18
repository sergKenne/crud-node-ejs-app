const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        default: "testing image"
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", userSchema)

module.exports = User;