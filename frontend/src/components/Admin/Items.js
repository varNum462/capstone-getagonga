import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemSearch from "./ItemSearch";
import './Admin.css'
import HighBid from "./HighBid";


const Items = (props) => {
    const [searchTerm, setSearch] = useState([]); 
    const [itemArray, setItemArray] = useState([]);
    const [noResults,setNoResults] = useState();
    const [auctionItems,setAuctionItems] = useState([]);
    
    const newItem = async () => {
        let newItemSearch = await axios.get(`https://serpapi.com/search?q=${searchTerm}&engine=google&gl=us&api_key=3a6b58a128d85a0ecd2090689ca10e756fdb82e9218db06856e3300a527548a9`)
        if(newItemSearch.data.shopping_results !== null){
        setItemArray(newItemSearch.data.shopping_results);
            } else {
        setNoResults("No Results");    
            }
        console.log(newItemSearch.data.shopping_results);
        }          
        
        function addItem (event) {
        event.preventDefault(); 
            console.log(`title ${ event.target.title.value }`);
            console.log(`image ${event.target.image.value}`);
            console.log(`price ${event.target.retail.value}`);
            console.log(`start bid ${event.target.startBid.value}`);
            console.log(`link ${event.target.link.value}`);
            console.log(`category ${event.target.category.value}`);
        
        let newAuctionItem = axios.put(`http://localhost:3008/api/auctions/${props.aucId}/items`, { 
            "itemName": event.target.title.value,
            "image": event.target.image.value,
            "retailPrice": event.target.retail.value,
            "startBid": event.target.startBid.value,
            "link": event.target.link.value,
            "category": event.target.category.value,
        });        
        }   
        
        async function getItems() {
            let response = await axios.get(`http://localhost:3008/api/auctions/${props.aucId}/items`);    
            setAuctionItems(response.data.items);    
         } 

        const [itemName, setItemName] = useState("")
        const [itemCategory, setItemCategory] = useState("")
        const [itemRetail, setItemRetail] = useState("")
        const [itemStartBid, setItemStartBid] = useState()        

         async function handleEdit(event,itemId) {
            event.preventDefault();       
            //console.log(aucId);
            await axios.put(`http://localhost:3008/api/auctions/${props.aucId}/items/${itemId}`, { 
                "itemName": itemName,
                "category": itemCategory,
                "retailPrice": itemRetail,
                "startBid": itemStartBid,
            });            
        }

         function toggleEdit(auctionIndex, action){
            let form = "form"+auctionIndex;       
            if (action === 'edit'){
                document.getElementById(form).className = "form-inline d-flex mt-2";
            }else{            
                document.getElementById(form).className = "d-none";
            }
        }    
        
    useEffect(() => {
        newItem(); 
      },[searchTerm])
    
    useEffect(() => {
        getItems(); 
      },[addItem])
     
  return (
    <div className="container itemAdmin mb-5 pb-5" id="itemAdmin">
        <div className="p-2 mt-3 text-center w-100">
            <div className="text-end m-0 p-0">
                <button className="mx-auto btn btn-primary" alt="Manage Items" onClick={() => props.showAuction()}>
                    Return to Auction Management
                </button>
            </div>
            <h3 className="mt-3 text-start border-bottom d-flex">Item Management: <div className="mx-5">{props.aucName}</div></h3>  
            
            <ItemSearch  setSearch = {setSearch}/>  
            <div id="searchResults">        
                <div className="d-flex justify-content-between">
                    <h4>Search Results </h4> 
                    <button className="btn btn-success" onClick = {() => {setItemArray(); setSearch()}}>Clear Search</button>
                </div>  
                <div className="d-flex " > 
                        
                {itemArray && itemArray.map((item,index) => {
                    if(index < 5){
                    let firstBid = parseFloat(Math.round((item.extracted_price / 3) / 5) * 5).toFixed(2); 
                    if (item.title !== null && item.title !== "")
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
            </div>  
            <h4 className="text-start mt-4">Item List</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <div className="w-100 row d-flex">                            
                                <div className="col-1 text-start"></div>                    
                                <div className="col-3 text-start">Item Name/Description </div>                    
                                <div className="col-1">Category</div>                    
                                <div className="col-1">Retail</div>                    
                                <div className="col-1">Start Bid</div>                    
                                <div className="col-2">High Bid/Bidder</div>                    
                                <div className="col-1">Total Bids</div>                    
                                <div className="col-1"></div>                    
                                <div className="col-1"></div>
                            </div>
                        </th>     
                    </tr>               
                </thead>
                <tbody>
                {auctionItems && auctionItems.map((item,index) => {                                 
                    return(
                    <tr key={index}>
                        <td>
                            <div className="w-100 row d-flex">
                                <div className="col-1"><img src={item.image} alt={item.itemName} width="100" /></div>
                                <div className="col-3">{item.itemName}<br /><p><a href={item.link} target="_blank" rel="noreferrer">For more information, click here</a></p></div>
                                <div className="col-1">{item.category}</div>
                                <div className="col-1">{item.retailPrice}</div>
                                <div className="col-1">{item.startBid}</div>
                                <div className="col-2"><HighBid itemId={item._id} aucId={props.aucId} itemName={item.itemName} /></div>
                                <div className="col-1">{item.bids.length}</div>
                                <div className="col-1">
                                    <input type="button" className="w-100 btn btn-warning" value="Edit" src="" alt="Edit Items" onClick = {(event) => toggleEdit(index, 'edit')}/>
                                </div>                                    
                                <div className="col-1"><button className="btn btn-danger">Delete</button></div>                                
                            </div>
                            <div className="w-100 row d-flex">
                                <form className="form-inline d-none" id={`form${index}`} onSubmit = {e => handleEdit(e, item._id)}>
                                    <div className="row w-100">
                                        <div className="col-6">
                                            <label><b>Item Name/Description</b></label>
                                            <input className="form-control" type="text" name="itemName" id="itemName" defaultValue={item.itemName} onChange = {(event) => setItemName(event.target.value)} />
                                        </div>
                                        <div className="col-2">
                                            <label><b>Category</b></label>
                                            <input className="form-control" type="text" name="itemCategory" id="itemCategory" defaultValue={item.category} onChange = {(event) => setItemCategory(event.target.value)} />   
                                        </div>
                                        <div className="col-1">
                                            <label><b>Retail</b></label>
                                            <input className="form-control" type="text" name="itemRetail" id="itemRetail" defaultValue={item.retailPrice} onChange = {(event) => setItemRetail(event.target.value)} />
                                        </div>
                                        <div className="col-1">
                                            <label><b>Start Bid</b></label>
                                            <input className="form-control" type="text" name="itemStartBid" id="itemStartBid" defaultValue={item.startBid} onChange = {(event) => setItemStartBid(event.target.value)} />
                                        </div>
                                        <div className="col-2 mt-3 pt-2 text-start">
                                            <input type="submit" className="btn btn-success" value="Save" onClick = {(event) => toggleEdit(index, 'save')} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </td>
                    </tr>
                )}
                  )}
                </tbody>
            </table>   
        </div>
    </div>
  );
};

export default Items;
