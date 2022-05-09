const mongoose = require("mongoose");
const Joi = require("joi");

const itemSchema = mongoose.Schema({
    itemName: { type: String, required: true, minLength: 5, maxLength: 100 },
    description: { type: String, minLength: 2, maxLength: 255 },
    retailPrice: { type: Number },
    startBid: { type: Number },
    image: { type: String, minLength: 5, maxLength: 255},
    link: {type: String, minLength:10, maxlength:255},
    bids: [{}],  
    sold: { type: Boolean, default: false },       
  });

const validateItem = (item) => {
  const schema = Joi.object({
    itemName: Joi.string().min(5).max(50).required(),
    startDate: Joi.date().greater('now').required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).required(),
    sold:  Joi.bool().required()    
  });
  return schema.validate(item);
};

const Item = mongoose.model("Item", itemSchema);
module.exports.Item = Item;
module.exports.itemSchema = itemSchema;
module.exports.validateItem = validateItem;