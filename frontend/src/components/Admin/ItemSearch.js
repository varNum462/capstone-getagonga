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
                <div class="input-group input-group-lg mt-2 mb-3 w-100">
                    <input type="text" class="form-control w-100" placeholder="Search" name="Search" id="search"/> 
                    <button class="btn btn-success" type="submit" >Search</button>
                </div>
            </form>
        </div>
     );
}
 
export default ItemSearch;