import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [currentAuctions, setCurrentAuctions] = useState([{}]);
  const [currentItems, setCurrentItems] = useState([{}]);
  const [currentAuctionId,setAuctionId] = useState("");
  const {numBids,setNumBids} = useState(0);
    
    async function getAuctions() {
      let response = await axios.get(`http://localhost:3008/api/auctions`);
      setCurrentAuctions(response.data); 
   }  

  async function getItems(aucId) {
    setAuctionId(aucId);
    console.log(aucId); 
    let response = await axios.get(`http://localhost:3008/api/auctions/${aucId}/items`);    
     setCurrentItems(response.data.items);     
 }   

    useEffect(() => {
      getAuctions(); 
    },[])

  return( 
    <div className="container">
      <div className="w-75 m-auto">
        <h1>Welcome to GetAGonga Auctions!</h1>
        <h2>A "gonga" is slang for a great deal or bargain, and there's no better place to find a gonga than right here! </h2>
        <h3>Look through the items up for bid below. This is a "blind bid" auction, so place the bid you think is high enough to win, but still be a "gonga" for you! </h3>
        <h4 className="mx-2 my-3">Bid winners will be notified via email within 1 day of the aution closing date, and you will have one week to pay and pick up your item(s).</h4>
      </div>
      <div>
        <form>
          Choose an auction to view the items available for bids:
          <select className="custom-select custom-select-sm w-75 mb-2" name="activeAuctions" id="activeAuctions" onChange = {(event) => getItems(event.target.value)}>
            <option>Select an auction</option>
            {currentAuctions.map((auction,index) => {
            return(
            <option value={auction._id} key={index}>{auction.title}</option>
            )
            }) 
          }                                       
          </select>          
        </form>
      </div>    
    <div>
      <table className="table">
        <thead>
            <tr>                
                <th className="w-10"></th>
                <th className="w-30">Item Name/Description</th> 
                <th className="w-15">Category</th>
                <th className="w-10">URL</th>                       
                <th className="w-10">Starting Bid</th>
                <th className="w-10">Retail Price</th>
                <th className="w-10">Your Bid</th>      
            </tr>
        </thead>
        <tbody>
          {currentItems && currentItems.map((item,index) => {     
                     
            return(
              <tr key={index}>
                <td><img src={item.image} alt={item.itemName} width="100" /></td>
                <td className="text-start">{item.itemName}</td>
                <td>{item.category}</td>
                <td><a href={item.link} target="_blank" rel="noreferrer">Link</a></td>
                <td>{item.retailPrice}</td>
                <td className="">
                  <form className="m-auto w-60 text-center">
                    <input name="newbid" id="newBid" type="number" placeholder={`minimum $${item.startBid}`} className="form-control text-end" />
                    <input type="submit" className="btn btn-primary" value="Place Bid" />
                  </form>
                </td>
                            
              </tr>
            )
            })
          }
      </tbody>
      </table>
    </div>   
  </div>
  );
};

export default HomePage;
