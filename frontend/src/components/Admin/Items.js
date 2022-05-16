import React, { useState } from "react";
import axios from "axios";

const Items = () => {
    const [itemList, setItemList] = useState([]);
    const getItems = async () => {
        try {
            let items = await axios.get (`http://localhost:3008/api/auctions/`)
            setItemList(items.data.items);
        } catch (err) {
          console.log(err);
        }
      };
  return (
    <div className="container itemAdmin">
        <div className="p-2 mt-3 text-center w-100">
            <h3 className="mt-0">Items List</h3>   
            <table className="table">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Start Bid</th>
                        <th>Winning Bid</th>
                        <th>Total Bids</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>               
                </thead>
                <tbody>
                {itemList.map((item) => {
                return (    
                    <tr> 
                        <td></td>  
                        <td></td>  
                        <td></td>  
                        <td></td>  
                        <td></td>  
                        <td></td>  
                        <td>
                            <div className="m-2 w-100">
                                <form>
                                    <input type="hidden" name="addItem" id="addItem" value="" />                              
                                    <input type="submit" className="w-100" src="" alt="Add Item" />
                                </form>
                            </div>
                        </td>
                        <td>
                            <div className="m-2 w-100">
                                <form>
                                    <input type="hidden" name="addItem" id="addItem" value="" />                              
                                    <input type="submit" className="w-100" src="" alt="Add Item" />
                                </form>
                            </div>
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

export default Items;
