import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const HighBid = (props) => {
    const { user } = useContext(AuthContext);
    const [itemBids,setItemBids] = useState([]);
    //const [allBids,setAllBids] = useState([{}]);
    const [highestBid,setHighestBid]= useState();
    //const [winningBidder, setWinningBidder] = useState([{}]);
    //const [winnerInfo,setWinnerInfo] = useState([{}]);

    async function getBids() {
        let response = await axios.get(`http://localhost:3008/api/auctions/${props.aucId}/items/${props.itemId}/bids`);    
        setItemBids(response.data); 
        let bidlist = itemBids.map(bid => ({ bidAmt: bid.bidAmt, bidderId: bid.bidderId }));  
        let maxBid = Math.max(...bidlist.map(o => o.bidAmt));
        let highBidder = bidlist.find(o => o.bidAmt === maxBid);        
        setHighestBid(maxBid);  
        //setWinningBidder(highBidder);  
        //console.log(winningBidder.bidderId);
        //let winnerId = winningBidder.bidderId;        
        //let getWinner = await axios.get(`http://localhost:3008/api/users/${winnerId}`);  
        //setWinnerInfo(getWinner.data);
        //console.log(winnerInfo);
        } 

     useEffect(() => {
        getBids(); 
      },[highestBid])
       
    if(highestBid !== -Infinity){
    return(
        <div>  
            Bid:${highestBid} <br /><a href={`mailto:winner@getagonga.com?subject=You%20Won!&body=You%20have%20won%20the%20auction%20for%20${props.itemName}.%20%20Please pay $${highestBid} and pick up your item before the end of next week.`}>Winner Name Here</a>    
        </div>
    )}else{
        return(
        <div>  
            No Bids 
        </div>  
        )
    };
}
export default HighBid;