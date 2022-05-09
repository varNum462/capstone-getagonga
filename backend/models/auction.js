const mongoose = require("mongoose");
const Joi = require("joi");

const auctionSchema = mongoose.Schema({
    title: { type: String, required: true, minLength: 5, maxLength: 50 },
    startDate: { type: Date, required: true },
    endDate:  {type: Date, required: true },
    items: [{}],          
  });

const validateAuction = (auction) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    startDate: Joi.date().greater('now').required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).required()    
  });
  return schema.validate(auction);
};

const Auction = mongoose.model("Auction", userSchema);
module.exports.Auction = Auction;
module.exports.auctionSchema = auctionSchema;
module.exports.validateAuction = validateAuction;