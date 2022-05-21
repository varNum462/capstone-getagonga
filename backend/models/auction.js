const mongoose = require("mongoose");
const Joi = require("joi");

const bidSchema = mongoose.Schema({
  bidAmt: { type: Number },
  bidderId: { type: String},
  bidDate: {type:Date, default: Date.now()},
});

const itemSchema = mongoose.Schema({
  itemName: { type: String, minLength: 0, maxLength: 255 },
  description: { type: String, minLength: 2, maxLength: 255 },
  category: {type: String, minLength: 5, maxLength: 255 },
  retailPrice: { type: String, minLength: 2, maxlength: 20 },
  startBid: { type: Number },
  image: { type: String, minLength: 5, maxLength: 255},
  link: {type: String, minLength:5, maxlength:255},
  bids: [{type:bidSchema}],  
  sold: { type: Boolean, default: false },       
});

const validateItem = (item) => {
const schema = Joi.object({
  itemName: Joi.string().min0(0).max(50) 
});
return schema.validate(item);
};

const auctionSchema = mongoose.Schema({
    title: { type: String, required: true, minLength: 5, maxLength: 50 },
    startDate: { type: Date },
    endDate:  {type: Date },
    items: [ {type:itemSchema} ],          
  });

const validateAuction = (auction) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    startDate: Joi.date().greater('now'),
    endDate: Joi.date().greater(Joi.ref('startDate'))  
  });
  return schema.validate(auction);
};

const Bid = mongoose.model("Bid", bidSchema);
const Item = mongoose.model("Item", itemSchema);
const Auction = mongoose.model("Auction", auctionSchema);
module.exports = {
  Auction,
  Item,
  Bid,
  auctionSchema,
  itemSchema,
  bidSchema,
  validateAuction,
  validateItem,
}
