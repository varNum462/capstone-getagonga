import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemSearch from "./ItemSearch";


const Items = (props) => {
    const [searchTerm, setSearch] = useState([]); 
    const [itemArray, setItemArray] = useState([{}]);
    const [noResults,setNoResults] = useState();

    const newItem = async () => {
        console.log(searchTerm);
        let newItemSearch = await axios.get(`https://serpapi.com/search?q=${searchTerm}&engine=google&gl=us&api_key=16181e421d1e24adaa222ebaa1144735b56e2dda0a719e456e3bd1571109dd2f`)
        if(newItemSearch.data.shopping_results !== null){
        setItemArray(newItemSearch.data.shopping_results);
            } else {
        setNoResults("No Results");    
            }
        console.log(newItemSearch.data.shopping_results);
        }
    
        //const [title, setTitle] = useState("no-title")
        //const [image, setImage] = useState("no-image")
        //const [price, setPrice] = useState(0.00)
        //const [startBid, setStartBid] = useState(0.00)
        //const [link, setLink] = useState("no-link")
        //const [category, setCategory] = useState("no-category")
        
        function addItem (event) {
        event.preventDefault();       
        //setTitle(event.target.title.value);    
            console.log(`title ${ event.target.title.value }`);   
        //setImage(event.target.image.value);
            console.log(`image ${event.target.image.value}`);
        //setPrice(event.target.retailPrice.value);
            console.log(`price ${event.target.retailPrice.value}`);
        //setStartBid(event.target.startBid.value);
            console.log(`start bid ${event.target.startBid.value}`);
       // setLink(event.target.link.value);
            console.log(`link ${event.target.link.value}`);
       // setCategory(event.target.category.value);
            console.log(`category ${event.target.category.value}`);
        //console.log(`title ${title} - price ${price} - ${startBid} - ${link} - ${category} `);
        
        let newAuctionItem = axios.put(`http://localhost:3008/api/auctions/${props.aucId}/items`, { 
            "itemName": event.target.title.value,
            "image": event.target.image.value,
            "retailPrice": event.target.retail.value,
            "startBid": event.target.startBid.value,
            "link": event.target.link.value,
            "category": event.target.category.value,
        })        
        }
    
    //async function handleDelete(itemId) {
    //    await axios.delete(`http://localhost:3008/api/auctions/${props.aucId}/items/${itemId}`);        
    //}

    useEffect(() => {
        newItem(); 
      },[searchTerm])

  return (
    <div className="container itemAdmin" id="itemAdmin">
        <div className="p-2 mt-3 text-center w-100">
            <h3 className="mt-0">{props.aucName}</h3>  
            <div id="addAuctionItem" className="showForm m-3">
                <h4 className="text-start">Add Item</h4>
                <ItemSearch  setSearch = {setSearch}/>
            </div> 
            <h4>Search Results</h4>
            <div className="d-flex justify-content-between">
            {itemArray && itemArray.map((item,index) => {
                if(index < 5){
                let firstBid = parseFloat(Math.round((item.extracted_price / 3) / 5) * 5).toFixed(2);  
                return (    
                    <div className="w-25 m-3 text-start card" key={index}> 
                        <div className="d-flex align-items-stretch card-header">
                            <div className="">
                                <img src={`${item.thumbnail}`} className="border" alt={`${item.title}`} width="70" align="left" />
                            </div>
                            <div className="px-1"><small>{item.title}</small></div>
                        </div> 
                        <div className="card-body list-group">
                            <div></div>
                            <div><label className="text-end w-50 me-2">Retail:</label> {item.price}</div> 
                            <div><label className="text-end w-50 me-2">Start Bid:</label> ${firstBid}</div>                          
                            <div className="text-center"><a href={item.link} target="_blank" rel="noreferrer">Link to Item</a></div> 
                        </div>
                        <div className="text-center card-footer">
                            <form onSubmit = {(event) => addItem (event)}>
                                <input type="hidden" name="image" id="image" value={item.thumbnail} />
                                <input type="hidden" name="title" id="title" value={item.title} />
                                <input type="hidden" name="retail" id="retail" value={item.price} />
                                <input type="hidden" name="startBid" id="startBid" value={firstBid} />
                                <input type="hidden" name="link" id="link" value={item.link} />
                                <select className="custom-select custom-select-sm w-75 mb-2" name="category" id="category">
                                    <option>Choose category</option>
                                    <option value="household">Household</option>
                                    <option value="fashion">Fashion</option>
                                    <option value="health">Health</option>
                                    <option value="beauty">Beauty</option>
                                    <option value="toys-hobby">Toys-Hobby</option>
                                    <option value="sports">Sports</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="auto-home-maintenance">Auto-Home Maintenance</option>                                    
                                </select>
                                <input type="submit" className="w-75 btn btn-danger" value="Select This Item" />
                            </form>
                            
                        </div>                                               
                    </div> 
                    )
                }else{                   
                    return false;                    
                }
                })        
                }
            </div>
            <div>
                <h2>{noResults}</h2>
            </div>
            <h4 className="text-start mt-4">Item List</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Item Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Retail</th>
                        <th>Start Bid</th>
                        <th>Winning Bid</th>
                        <th>Total Bids</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>               
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>   
        </div>
    </div>
  );
};

export default Items;
