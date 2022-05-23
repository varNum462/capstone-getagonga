import React from "react";

const ItemSearch = (props) => {
    
    function handleSubmit(event){
        event.preventDefault();
        props.setSearch(event.target.searchitems.value);
        event.target.search.value = "";
    }
    return ( 
        <div id="addAuctionItem" className="showForm m-3">
            <h4 className="text-start">Add Item</h4>
            <div className="w-100">
                <form id="searchbar" onSubmit = {(event) => handleSubmit (event)}>
                    <div className="input-group input-group-lg mt-2 mb-3 w-100">
                        <input type="text" className="form-control w-75" placeholder="Search" name="searchitems" id="searchitems"/> 
                        <button className="btn btn-success" type="submit" >Search</button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default ItemSearch;