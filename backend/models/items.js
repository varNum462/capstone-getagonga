const mongoose = require("mongoose");
const Joi = require("joi");

const itemSchema = mongoose.Schema({
    name: { type: String, required: true, minLength: 5, maxLength: 100 },
    description: { type: String, minLength: 2, maxLength: 255 },
    retailPrice: { type: Number },
    startBid: { type: Number },
    image: { type: String, minLength: 5, maxLength: 255},
    link: {type: String, minLength:10, maxlength:255},
    bids: [{}],  
    sold: { type: Boolean}        
  });