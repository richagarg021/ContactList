import React from "react";
import "./ContactList.css";
import ContactCard from "./ContactCard";


function ContactList({data, currentPage, getAllContacts, searchedContacts}){

    const changePage =(pageNumber)=>{
        getAllContacts(pageNumber);
    }

    console.log(searchedContacts);
    console.log(searchedContacts?.data?.length);

    const pages = [...Array(data?.totalPages)].map((page, index) => index + 1);

    return (
        <>
            <div className="main">

                {data?.content?.length === 0 && <div className="noContact">No contacts. Please add a new one!</div>}

                <div className="gridContainer">
                    
                    {searchedContacts?.data?.length > 0 
                    ? searchedContacts?.data.map(contact=><ContactCard contact={contact} key={contact.id} getAllContacts={getAllContacts}/>)
                    : data?.content.length > 0 && data.content.map(contact => 
                        <ContactCard contact={contact} key={contact.id} getAllContacts={getAllContacts}/>)}
                    
                </div>

                {
                    (searchedContacts?.data?.length === 0 || searchedContacts.length===0) && pages.length !==0 &&  <div className="paginationContainer">
                    <div onClick={()=>changePage(--currentPage)} className={`buttons ${currentPage===0 ? 'disabledPage' : ''}`}>Previous</div>
                    {
                        pages.map((page, index) => (
                            <div
                                key={index}
                                onClick={() => changePage(index)}
                                className={`pages ${currentPage === index ? 'selectedPage' : ''}`}
                            >
                                {page}
                            </div>
                        ))
                    }
                    <div onClick={()=>changePage(++currentPage)} className={`buttons ${data?.last ? 'disabledPage' : ''}`}>Next</div>
                    
                </div>

                }
            </div>
        </>
    );
}
export default ContactList;