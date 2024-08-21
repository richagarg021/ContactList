import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../components/Header";
import { getContacts} from "../services/contactService";
import ContactList from "../components/ContactList";
import AddContact from "../components/AddContact";
import Navbar from "../components/Navbar";

function Home(){

    const [data, setData] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [searchedContacts, setSearchedContacts] = useState([]);

    const [showModal, setShowModal] = useState(false);
    
    const getAllContacts =async(page=0 , size=12)=>{
        try{
            setCurrentPage(page);
            const data = await getContacts(page, size);
            
            setData(data);
            console.log(data);
        }catch(error){
            console.log(error);
        }
    }
    

    useEffect(()=>{
        getAllContacts();
    }, []);

    return(
        <>
            <Navbar/>
            <div className="main">
                <div className="container">
                    <Header  setShowModal={setShowModal} noOfContacts={data?.data?.totalElements} setSearchedContacts={setSearchedContacts}/>
                    <ContactList data={data.data} currentPage={currentPage} getAllContacts={getAllContacts} searchedContacts={searchedContacts} />
                    {showModal && <AddContact setShowModal={setShowModal} getAllContacts={getAllContacts} currentPage={currentPage}/>}
                </div>
                
            </div>
        </>
    );
}
export default Home;