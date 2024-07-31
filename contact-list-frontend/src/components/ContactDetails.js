import React , {useEffect, useState} from "react";
import "./ContactDetails.css";
import { useParams } from "react-router-dom";
import { getContact, uploadPhoto,  saveContact } from "../services/contactService";
import { useNavigate } from "react-router-dom";

function ContactDetails(){

    const [contactData, setContactData] = useState({
        id : '',
        name : '',
        email: '',
        phone: '',
        city: '',
        photoUrl : '',
    });
   
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const {id} = useParams();

    const updatePhoto = async(file) => {
        try{
            const formData = new FormData();
            formData.append('file', file,file.name);
            formData.append('id', id);
            const {data :url} =await uploadPhoto(formData);
            setContactData({...contactData, photoUrl:url});
        }catch(error){
            console.log(error);
        }
    }

    const validateField = (field, value) => {
        const validationErrors = {...errors};
        switch(field) {
            case 'name':
                if(!value.trim()){
                    validationErrors.name = "Name is required!"
                }
                else if(!/^(?!.*\d).*$/.test(value)){
                    validationErrors.name = "name should not be contain numbers!"
                } else {
                    delete validationErrors.name;
                }
                break;
            case 'email':
                if(!value.trim()){
                    validationErrors.email = "Email is required!"
                }else if(!/[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|in)/.test(value)){
                    validationErrors.email = "email is not valid!"
                } else {
                    delete validationErrors.email;
                }
                break;
            case 'phone':
                if(!value.trim()){
                    validationErrors.phone = "Phone number is required!"
                }else if(value.length!==10){
                    validationErrors.phone = "phone number is not valid!"
                }
                else if(!/[7-9]{1}[0-9]{9}/.test(value)){
                    validationErrors.phone = "phone number is not valid!"
                } else {
                    delete validationErrors.phone;
                }
                break;
            case 'city' :
                if(!value.trim()){
                    validationErrors.city = "City is required!"
                }else if(!/^(?!.*\d).*$/.test(value)){
                    validationErrors.city = "city should not be contain numbers!"
                }else{
                    delete validationErrors.city;   
                }
                break;
            default:
                break;
        }
        setErrors(validationErrors);
    };

    const updateContactDetails = async(event) =>{
        event.preventDefault();

        if(Object.keys(errors).length===0){
            try{
                event.preventDefault();
                const {data} = await saveContact(contactData);            
                getSelectedContact(contactData.id);
                navigate('/user/contacts');
            }catch(error){
                console.log(error);
            }
        }
    }

    const getSelectedContact = async(id)=>{
        try{
            const {data} = await getContact(id);
            setContactData(data);
            console.log(data);
        }catch(error){
        console.log(error);}
    }

    useEffect(()=>{
        getSelectedContact(id)
    }, []);

    return(
        <>
            <div className="updateContact-wrapper"></div>
            <div className="updateContact">
                <div className="updateContact-heading">
                    <h3>Update Contact</h3>
                    <button onClick={()=>navigate('/user/contacts')}>X</button>
                </div>
                <form onSubmit={(event)=>updateContactDetails(event)}>
                    
                    <div className="line"></div>
                    <input type="hidden" defaultValue={contactData.id} name="id" required/>
                    <div className="input-box-wrapper">
                        <div className="form-input-box">
                            <label for="name-field" className="form-label">Name</label>
                            <input id="name-field" value={contactData.name} maxLength="24" className="form-field" type="text" 
                            onChange={(event)=>{
                                validateField('name', event.target.value);
                                setContactData({...contactData, name:event.target.value})}}/>
                            {errors.name && <span className="errorMessage">{errors.name}</span>}         
                        </div> 

                        <div className="input-box">
                            <label for="email-field" className="form-label">Email</label>
                            <input id="email-field" className="form-field" value={contactData.email}
                            onChange={(event)=>{
                                validateField('email', event.target.value);
                                setContactData({...contactData, email:event.target.value})}}/>
                            {errors.email && <span className="errorMessage">{errors.email}</span>}         
                        </div> 
                    </div>

                    <div className="input-box-wrapper">
                        <div className="input-box">
                            <label for="phoneNo-field" className="form-label">Phone Number</label>
                            <input id="phoneNo-field" className="form-field" value={contactData.phone}
                            onChange={(event)=>{
                                validateField('phone', event.target.value);
                                setContactData({...contactData, phone:event.target.value})}}/>  
                            {errors.phone && <span className="errorMessage">{errors.phone}</span>}       
                        </div> 

                        <div className="input-box">
                            <label for="city-field" className="form-label">City</label>
                            <input id="city-field" className="form-field" type="text" value={contactData.city}
                            onChange={(event)=>{
                                validateField('city', event.target.value);
                                setContactData({...contactData, city:event.target.value})}}/>
                            {errors.city && <span className="errorMessage">{errors.city}</span>}         
                        </div> 
                    </div>

                    <div className="file-input">
                        <span className="photoDiv">Change Photo</span>
                        <input type="file" name='photo' onChange={(e)=>updatePhoto(e.target.files[0]) } defaultValue={contactData.photoUrl}/>
                    </div>

                    <div className="modalFooter">
                        <button type="submit" className="save-btn" onClick={(event)=>updateContactDetails(event)}>Save</button>
                    </div>

                </form>
            </div>
        </>
    );
}
export default ContactDetails;