import React, { useEffect, useRef, useState } from "react";
import "./AddContact.css";
import { saveContact, uploadPhoto } from "../services/contactService";

function AddContact({setShowModal, getAllContacts, currentPage}){

    const [file, setFile] = useState(undefined);
    const fileRef = useRef();

    const [contactData, setContactData] = useState({
        name : '',
        email: '',
        phone: '',
        city: '',
    });

    console.log(currentPage);

    useEffect(()=>{
        document.body.style.overflowY = "hidden";
        return ( () => {
            document.body.style.overflowY = "scroll";
        })
    }, [])

    const [errors, setErrors] = useState({});

    const addContact = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        if(!contactData.name.trim()){
            validationErrors.name = "Name is required!"
        }
        else if(!/^(?!.*\d).*$/.test(contactData.name)){
            validationErrors.name = "name should not be contain numbers!"
        }

        if(!contactData.email.trim()){
            validationErrors.email = "Email is required!"
        }else if(!/[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|in)/.test(contactData.email)){
            validationErrors.email = "email is not valid!"
        }

        if(!contactData.phone.trim()){
            validationErrors.phone = "Phone number is required!"
        }else if(contactData.phone.length!==10){
            validationErrors.phone = "phone number is not valid!"
        }
        else if(!/[7-9]{1}[0-9]{9}/.test(contactData.phone)){
            validationErrors.phone = "phone number is not valid!"
        }

        if(!contactData.city.trim()){
            validationErrors.city = "City is required!"
        }else if(!/^(?!.*\d).*$/.test(contactData.city)){
            validationErrors.city = "city should not be contain numbers!"
        }
        
        setErrors(validationErrors);
        if(Object.keys(validationErrors).length === 0){
            try{
                // let sizeOfData = pageData?.content?.length;
                // console.log(sizeOfData);
                const {data} = await saveContact(contactData);
                if(file!==undefined){
                    const formData = new FormData();
                formData.append('file', file, file.name);
                formData.append('id', data.id);
                const {data} = await uploadPhoto(formData);
                }
                setShowModal(false);
                setFile(undefined);
                fileRef.current.value = null;
                setContactData({
                    name : '',
                    email: '',
                    phone: '',
                    city: '',
                });
                getAllContacts(currentPage);
            }catch(error){
                console.log(error);
            }
        }
    }

    return(
        <>
            <div className="model-wrapper"></div>
            <div className="contactModal">
                <div className="modalHeading">
                    <h3>New Contact</h3>
                    <button onClick={()=>setShowModal(false)}>X</button>
                </div>
                <form onSubmit={addContact}>
                    
                    <div className="line"></div>
                    <div className="form-input-box">
                        <label for="name-field" className="form-label">Name</label>
                        <input id="name-field" maxLength="24" className="form-field" value={contactData.name} type="text"
                        onChange={(event)=>{
                            setContactData({...contactData, name:event.target.value});
                            console.log(contactData);
                        }}/>
                        {errors.name && <span className="errorMessage">{errors.name}</span>}            
                    </div> 

                    <div className="input-box">
                        <label for="email-field" className="form-label">Email</label>
                        <input id="email-field" className="form-field" value={contactData.email}
                        onChange={(event)=>{setContactData({...contactData, email:event.target.value})}}/>
                        {errors.email && <span className="errorMessage">{errors.email}</span>}            
                    </div> 

                    <div className="input-box">
                        <label for="phoneNo-field" className="form-label">Phone Number</label>
                        <input id="phoneNo-field" className="form-field"  value={contactData.phone}
                        onChange={(event)=>{setContactData({...contactData, phone:event.target.value})}}/> 
                        {errors.phone && <span className="errorMessage">{errors.phone}</span>}           
                    </div> 

                    <div className="input-box">
                        <label for="city-field" className="form-label">City</label>
                        <input id="city-field" className="form-field" type="text"
                        onChange={(event)=>{setContactData({...contactData, city:event.target.value})}} /> 
                        {errors.city && <span className="errorMessage">{errors.city}</span>}           
                    </div> 

                    <div className="file-input">
                        <span className="photoDiv">Profile Photo</span>
                        <input type="file" name='photo' ref={fileRef}
                        onChange={(event)=>setFile(event.target.files[0])} required/>
                    </div>

                    <div className="modalFooter">
                        <button type="button" onClick={()=>setShowModal(false)} className="cancel-btn">Cancel</button>
                        <button type="submit" className="save-btn">Save</button>
                    </div>

                </form>
            </div>
        </>
    );
}

export default AddContact;