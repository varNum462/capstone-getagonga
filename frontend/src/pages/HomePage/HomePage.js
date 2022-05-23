import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { parseISO } from 'date-fns';
import "./HomePage.css";

const UsFormatter = new Intl.DateTimeFormat('en-US')

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [currentAuctions, setCurrentAuctions] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentAuctionId,setAuctionId] = useState("");
  const [newBid,setNewBid] = useState();
    
    async function getAuctions() {
      let response = await axios.get(`http://localhost:3008/api/auctions`);
      setCurrentAuctions(response.data); 
   }  

  async function getItems(event,aucId) {
    event.preventDefault();
    setAuctionId(aucId);
    //console.log(aucId); 
    let response = await axios.get(`http://localhost:3008/api/auctions/${aucId}/items`);    
    setCurrentItems(response.data.items);     
 }   

 async function itemBid(event) {
  event.preventDefault(); 
  let itemId = event.target.itemId.value;
  console.log(`${currentAuctionId} -- ${itemId}`);      
  let placeBid = await axios.put(`http://localhost:3008/api/auctions/${currentAuctionId}/items/${itemId}/bids`, { 
      "bidAmt": newBid,
      "bidderId": user,      
  }) ;     
    getItems(event,currentAuctionId);    
  }

    useEffect(() => {
      getAuctions(); 
    },[])  

  return( 
    <div className="container mb-5 pb-5">
      <div className="w-75 m-auto">
        <h3>Select an auction and browse the items up for bid below. This is a "blind bid" auction, so place the bid you think is high enough to win, but still be a "gonga" for you! </h3>
        <h4 className="mx-2 my-3">Bid winners will be notified via email within 1 day of the aution closing date, and you will have one week to pay and pick up your item(s).</h4>
      </div>
      <div className="mx-auto text-center w-60">
        <form>
          <h4>Choose an auction to view the items available for bids:</h4>
          <table className="table w-100">
                <thead>
                    <tr>
                        <th className="w-100">
                            <div className="row d-flex">
                                <div className="col-6 text-start">
                                    Auction Title
                                </div>
                                <div className="col-2 text-start">Starts</div>
                                <div className="col-2 text-start">Ends</div>
                                <div className="col-2"></div>
                            </div>
                        </th>  
                    </tr>
                </thead>
                <tbody>
                {currentAuctions && currentAuctions.map((auction, index) => {
                return (    
                    <tr key={index}>
                      <td className="text-start">                        
                        <div className="row d-flex pt-2" id={`auction${index}`}>
                            <div className="col-6">
                              {auction.title}
                            </div>
                            <div className="col-2">
                              {UsFormatter.format(parseISO(auction.startDate),'dd/mm/yyyy')}
                            </div>
                            <div className="col-2">
                              {UsFormatter.format(parseISO(auction.endDate), 'dd/mm/yyyy')}
                            </div>
                            <div className="col-2">  
                              <button className="w-100 btn btn-primary" alt="View Items" onClick = {e => getItems(e, auction._id)} >
                                  View Items 
                              </button>                               
                            </div>                            
                        </div>  
                      </td>
                    </tr> 
                    )
                })       
                };   
                </tbody>
            </table>
        </form>
      </div>    
    <div>
      <table className="table">
        <thead>
            <tr>                
                <th className="w-10"></th>
                <th className="w-25">Item Name/Description</th> 
                <th className="w-20">Category</th>                                  
                <th className="w-10">Starting Bid</th>
                <th className="w-10">Retail Price</th>
                <th className="w-5"># Bids</th>
                <th className="w-15">Your Bid</th>      
            </tr>
        </thead>
        <tbody>
          {currentItems && currentItems.map((item,index) => {     
                     
            return(
              <tr key={index}>
                <td><img src={item.image} alt={item.itemName} width="100" /></td>
                <td className="text-start">{item.itemName}<br /><p><a href={item.link} target="_blank" rel="noreferrer">For more information, click here</a></p></td>
                <td>{item.category}</td>                
                <td>{item.startBid}</td>
                <td>{item.retailPrice}</td>
                <td>{item.bids.length}</td>
                <td className="">
                  <form className="m-auto w-60 text-center" onSubmit = {itemBid}>
                    <input type="hidden" value={item._id} name="itemId" id="itemId" />
                    <input name="newbid" id="newbid" type="number" step=".01" defaultValue="" className="form-control text-end" onChange={event => setNewBid(event.target.value)} />
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
