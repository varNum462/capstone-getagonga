import React, { useState, useEffect } from "react";
import axios from "axios";

const HighBid = (props) => {
    const [itemBids,setItemBids] = useState([]);
    const [allBids,setAllBids] = useState([{}]);
    const [highestBid,setHighestBid]= useState();

    async function getBids() {
        let response = await axios.get(`http://localhost:3008/api/auctions/${props.aucId}/items/${props.itemId}/bids`);    
        setItemBids(response.data); 
        let bidlist = itemBids.map(bid => ({ bidAmt: bid.bidAmt, bidderId: bid.bidderId }));  
        //setAllBids(bidlist);
        //console.log(bidlist);
        let maxBid = Math.max(...bidlist.map(o => o.bidAmt)) 
        console.log(`maxi: ${maxBid}`);
        setHighestBid(maxBid);        
        } 

     useEffect(() => {
        getBids(); 
      },[])

    return(
        <div>  
            ${highestBid} 
        </div>
    );
}
export default HighBid;