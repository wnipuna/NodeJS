const mongoose = require('mongoose');


const personSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
},{timestamps:true})

module.exports = mongoose.model('Person',personSchema);