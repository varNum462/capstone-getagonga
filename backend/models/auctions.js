const mongoose = require("mongoose");
const Joi = require("joi");

const auctionSchema = mongoose.Schema({
    title: { type: String, required: true, minLength: 5, maxLength: 50 },
    startDate: { type: Date, required: true },
    endDate:  {type: Date, required: true },
    items: [{}],          
  });