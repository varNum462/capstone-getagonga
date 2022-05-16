import React, { useEffect, useState } from "react";
import axios from "axios";
import { parseISO } from 'date-fns'

const UsFormatter = new Intl.DateTimeFormat('en-US')
const Auctions = () => {
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
    
    async function handleSubmit (event) {
    event.preventDefault();
    let newAuction = await axios.post(`http://localhost:3008/api/auctions`, { 
        "title": auctionTitle,
        "startDate": startDate,
        "endDate": endDate,
    })
    console.log(newAuction);
    setAuctionTitle("");
    setStartDate("");
    setEndDate("");
    getAuctions();
    }

    async function handleDelete(event) {
        event.preventDefault();
        let auctionId = document.getElementById('deleteAuction').value;
        await axios.delete(`http://localhost:3008/api/auctions/${auctionId}`);
        getAuctions();
    }

    useEffect(() => {
        getAuctions();       
    }, []);
  
  return (
    <div className="container auctionAdmin">
        <div className="p-2 mt-3 text-center w-100">
            <div className="d-flex justify-content-between">
                <h3 className="mt-0">Auctions</h3>                
            </div>   
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
                        <th width="40%" className="text-start">Auction Title</th>
                        <th width="20%">Starts</th>
                        <th width="20%">Ends</th>
                        <th width="10%"></th>
                        <th width="10%"></th>
                    </tr>
                </thead>
                <tbody>
                {auctionList.map((auction, index) => {
                return (    
                    <tr key={index}> 
                        <td className="text-start">{auction.title}</td>  
                        <td>{UsFormatter.format(parseISO(auction.startDate),'dd/mm/yyyy')}</td>  
                        <td>{UsFormatter.format(parseISO(auction.endDate), 'dd/mm/yyyy')}</td>  
                        <td>
                            <div className="m-2 w-100">
                                <form>
                                    <input type="hidden" name="manageItems" id="manageItems" value={auction._id} />                              
                                    <input type="submit" className="w-100 btn btn-primary" value="Manage Items" src="" alt="Manage Items" />
                                </form>
                            </div>
                        </td> 
                        <td>
                            <div className="m-2 w-100">
                                <form className="form-horizontal" onSubmit = {handleDelete}> 
                                    <input type="hidden" name="deleteAuction" id="deleteAuction" value={auction._id} />           
                                    <input type="submit" className="w-100 btn-danger" value="DELETE" alt="Delete Auction" />
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

export default Auctions;
