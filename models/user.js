// dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    img: String,
    firstName: String,
    lastName: String,
    email: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
