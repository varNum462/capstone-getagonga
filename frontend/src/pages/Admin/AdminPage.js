import React, { useState } from "react";
//import AuthContext from "../../context/AuthContext";
//import { Link } from "react-router-dom";
import axios from "axios";
import "./AdminPage.css";
import Auctions from "../../components/Admin/Auctions";
import Items from "../../components/Admin/Items";

const AdminPage = () => {  

    const [itemsToggle,setItemsToggle] = useState(false);
    const [auctionsToggle,setAuctionsToggle] = useState(true);
    const [auctionId,setAuctionId] = useState();
    const [auctionName,setAuctionName] = useState();
    const [itemList, setItemList] = useState([]);
   
    async function ItemFinder(aucId,aucName){        
        setItemsToggle(true);
        setAuctionsToggle(false);
        setAuctionId(aucId);
        setAuctionName(aucName);
        try {
            let items = await axios.get (`http://localhost:3008/api/auctions/${aucId}`)
            setItemList(items.data.items);
        } catch (err) {
          console.log(err);
        }
    }

  return (
    <div className="container">
        <h2>Admin Console</h2>  
          
        {
            auctionsToggle && <Auctions ItemFinder={ ItemFinder } />}
        {
            itemsToggle && <Items itemList={ itemList } aucId = {auctionId} aucName = {auctionName} />      
        }
        
    </div>
  );
};

export default AdminPage;
