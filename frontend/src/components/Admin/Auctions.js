import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseISO } from "date-fns";
const UsFormatter = new Intl.DateTimeFormat("en-US")

const Auctions = (props) => {   
    const [auctionList, setAuctionList] = useState([]);
    const getAuctions = async () => {
        try {
            let auctions = await axios.get (`http://localhost:3008/api/auctions`)
            setAuctionList(auctions.data);
        } catch (err) {
          console.log(err);
        }
      };    
    
    const [auctionTitle, setAuctionTitle] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [newAuctionTitle, setNewAuctionTitle] = useState()
    const [newStartDate, setNewStartDate] = useState()
    const [newEndDate, setNewEndDate] = useState()
    
    async function handleSubmit (event) {
    event.preventDefault();
    let newAuction = await axios.post(`http://localhost:3008/api/auctions`, { 
        "title": auctionTitle,
        "startDate": startDate,
        "endDate": endDate,
    })   
    setAuctionTitle("");
    setStartDate("");
    setEndDate("");
    getAuctions();
    }

    async function handleDelete(aucId) {       
        await axios.delete(`http://localhost:3008/api/auctions/${aucId}`);
        getAuctions();
    }

    async function handleEdit(event,aucId) {
        event.preventDefault();       
        console.log(aucId);
        await axios.put(`http://localhost:3008/api/auctions/${aucId}`, { 
            "title": newAuctionTitle,
            "startDate": newStartDate,
            "endDate": newEndDate,
        });
        getAuctions();
    }

    useEffect(() => {
        getAuctions();       
    }, []);   
    
    function toggleEdit(auctionIndex, action){
        let form = "form"+auctionIndex;       
        if (action === 'edit'){
            document.getElementById(form).className = "form-inline d-flex mt-2";
        }else{            
            document.getElementById(form).className = "d-none";
        }
    }    
    
  return (
    <div className="container auctionAdmin mb-5" id="auctionAdmin">
        <div className="p-2 mt-3 text-center w-100">
            <div className="d-flex justify-content-between"><h3 className="mt-0">Auction Management</h3></div>   
            <div id="addAuction" className="showForm m-3">
                <h4 className="text-start">Add Auction</h4>
                <form className="form-inline" onSubmit = {handleSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <input className="form-control" type="text" placeholder="Auction Title" name="title" id="title" value = {auctionTitle} onChange = {(event) => setAuctionTitle(event.target.value)} />
                        </div>
                        <div className="col-2">
                            <input className="form-control" type="date" placeholder="Start Date" name="startDate" id="startDate" value = {startDate} onChange = {(event) => setStartDate(event.target.value)} />
                        </div>
                        <div className="col-2">
                            <input className="form-control" type="date" placeholder="End Date" name="endDate" id="endDate" value = {endDate} onChange = {(event) => setEndDate(event.target.value)} />
                        </div>
                        <div className="col-2">
                            <input type="submit" className="btn btn-success w-100" value="Add Auction" />
                        </div>
                    </div>
                </form>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th className="w-75">
                            <div className="row d-flex">
                                <div className="col-6 text-start">Auction Title</div>
                                <div className="col-2 text-start">Starts</div>
                                <div className="col-2 text-start">Ends</div>
                                <div className="col-2"></div>
                            </div>
                        </th>                       
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                {auctionList.map((auction, index) => {
                return (    
                    <tr key={index}> 
                        <td className="text-start">                        
                            <div className="row d-flex pt-2" id={`auction${index}`}>
                                <div className="col-6">{auction.title}</div>
                                <div className="col-2">{UsFormatter.format(parseISO(auction.startDate),'dd/mm/yyyy')}</div>
                                <div className="col-2">{UsFormatter.format(parseISO(auction.endDate), 'dd/mm/yyyy')}</div>
                                <div className="col-2">                                                                
                                    <input type="button" className="w-100 btn btn-warning" value="Edit" src="" alt="Edit Items" onClick = {(event) => toggleEdit(index, 'edit')}/> 
                                </div>                               
                            </div>
                            <div>
                                <form className="form-inline d-none" id={`form${index}`} onSubmit = {e => handleEdit(e, auction._id)}>
                                    <div className="row">
                                        <div className="col-6">
                                            <input className="form-control" type="text" name="title" id="title" defaultValue={auction.title} onChange = {(event) => setNewAuctionTitle(event.target.value)} />
                                        </div>
                                        <div className="col-2">
                                            <input className="form-control" type="text" name="startDate" id="startDate" defaultValue={UsFormatter.format(parseISO(auction.startDate),'dd/mm/yyyy')} onChange = {(event) => setNewStartDate(event.target.value)} />
                                        </div>
                                        <div className="col-2">
                                            <input className="form-control" type="text" name="endDate" id="endDate" defaultValue={UsFormatter.format(parseISO(auction.endDate), 'dd/mm/yyyy')} onChange = {(event) => setNewEndDate(event.target.value)} />
                                        </div>
                                        <div className="col-2">
                                            <input type="submit" className="btn btn-success w-100" value="Save" onClick = {(event) => toggleEdit(index, 'save')} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </td> 
                        <td>
                            <div className="m-2 w-100">  
                                <button className="w-100 btn btn-primary" alt="Manage Items" onClick={() => props.ItemFinder(auction._id,auction.title)}>
                                    Manage Items
                                </button>                               
                            </div>
                        </td> 
                        <td>
                            <div className="m-2 w-100">
                                <button className="w-100 btn btn-danger" onClick={(event) => handleDelete(auction._id)}>Delete</button>
                            </div>
                        </td>
                    </tr> 
                    )
                })       
                };   
                </tbody>
            </table>   
        </div>
    </div>
  );
};

export default Auctions;
