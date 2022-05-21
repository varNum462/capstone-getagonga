import React from "react";

const ItemSearch = (props) => {
    
    function handleSubmit(event){
        event.preventDefault();
        props.setSearch(event.target.search.value);
        event.target.search.value = "";
    }
    return ( 
        <div className="w-100">
            <form id="searchbar" onSubmit = {(event) => handleSubmit (event)}>
                <div className="input-group input-group-lg mt-2 mb-3 w-100">
                    <input type="text" className="form-control w-100" placeholder="Search" name="search" id="search"/> 
                    <button className="btn btn-success" type="submit" >Search</button>
                </div>
            </form>
        </div>
     );
}
 
export default ItemSearch;