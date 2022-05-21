const { User, Auction, Item, Bid, validateAuction, validateItem } = require("../models/auction");
const express = require("express");
const router = express.Router();

//* POST register a new auction
router.post("/", async (req, res) => {
  try {
    const { error } = validateAuction(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let auction = await Auction.findOne({ title: req.body.title });
    if (auction)
      return res.status(400).send(`Auction ${req.body.title} already exists.`);

    //const salt = await bcrypt.genSalt(10);
    auction = new Auction({
      title: req.body.title,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      items:[],
    });

    await auction.save();    
    return res      
      .header("access-control-expose-headers")
      .send({
        _id: auction._id,
        title: auction.title,
        startDate: auction.startDate,
        endDate: auction.endDate,
        items:[],
      });
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//PUT Items
router.put("/:auctionId/items", async (req, res) => {
  try {       
      let auction = await Auction.findById(req.params.auctionId);
      
      if (!auction) return res.
          status(400)
          .send(`Auction does not exist!`)
      
      let newItem = await new Item(req.body);
      
      auction.items.push(newItem);
      auction.save();
      
      return res.status(200).send(auction);        
  } catch (error) {
      return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

router.put("/:auctionId/items/:itemId/bids", async (req, res) => {
  try {       
      let auction = await Auction.findById(req.params.auctionId);
      let item = await auction.items.id(req.params.itemId);
      
      if (!auction) return res.
          status(400)
          .send(`Auction does not exist!`)

      if (!item) return res.
      status(400)
      .send(`Item does not exist!`)
      
      let newBid = await new Bid({bidAmt:req.body.bidAmt,bidderId:req.body.bidderId});
      
      item.bids.push(newBid);
      auction.save();
      
      return res.status(200).send(auction);        
  } catch (error) {
      return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

router.get("/:auctionId/items/:itemId/bids", async (req, res) => {
  try {       
    const auction = await Auction.findById(req.params.auctionId);
    const item = await auction.items.id(req.params.itemId);
    const bids = await item.bids;
    
    return res.send(bids);       
} catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
}
});

//* PUT Edit auction
router.put("/:auctionId", async (req, res) => {
    try {
      const { error } = validateAuction(req.body);
      if (error) return res.status(400).send(error.details[0].message);
  
      let auction = await Auction.findByIdAndUpdate(
        req.params.auctionId, 
        req.body, 
        {new: true}
    );
      if (!auction)
        return res.status(400).send(`Auction ${req.params.auctionId} doesn't exist.`);
         
      await auction.save();    
      return res.status(200).send(auction); 
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });


//Get all auctions
router.get("/", async (req, res) => {
  try {
    const auctions = await Auction.find();
    return res.send(auctions);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//Get one auction
router.get("/:auctionId", async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.auctionId);
    return res.send(auction);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//GET an auction's items
router.get("/:auctionId/items", async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.auctionId);
    return res.send(auction);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//DELETE a single auction from the database
router.delete("/:auctionId", async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.auctionId);
    if (!auction)
      return res
        .status(400)
        .send(`Auction with id ${req.params.auctionId} does not exist!`);
    await auction.remove();
    return res.send(auction);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//DELETE a single item from an auction from the database
router.delete("/:auctionId/item/:itemId", async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.auctionId);
    if (!auction)
      return res
        .status(400)
        .send(`Auction with id ${req.params.auctionId} does not exist!`);
    auction.items.splice(auction.items.indexOf(req.params.itemId), 1)
    await auction.save();
    return res.send(auction);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});



module.exports = router;
