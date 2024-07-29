import React from "react";
import './Header.css';
import { getSearchedContacts } from "../services/contactService";

function Header({setShowModal, noOfContacts, setSearchedContacts}){


    const searchContacts = async(name) =>{
        try{
            const data = await getSearchedContacts(name.trim());
            if(name===''){
                setSearchedContacts([]);
            }
            else{
                setSearchedContacts(data);
            }
        }catch(error){console.log(error)}
    }
    
    
    return (
        <>
            <header className="header">
                <div className="mainDiv">
                    <h3>Contact List ({noOfContacts})</h3>
                    <div className="searchBar">
                        <input className="searchInput" type="text" placeholder="Search your contact here"
                        onChange={(e)=>{ const name =e.target.value;
                            searchContacts(name);
                        }}/>
                        <button className="searchBtn" onClick={searchContacts}>Search</button>
                    </div>
                    <button className="addContactBtn" onClick={()=> setShowModal(true) }>Add Contact</button>
                </div>
            </header>
        </>
    );
}

export default Header;
