import React, { useEffect, useRef, useState } from "react";
import "./AddContact.css";
import { saveContact, uploadPhoto } from "../services/contactService";
import { Country, State, City } from 'country-state-city';
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

function AddContact({setShowModal, getAllContacts, currentPage}){

    const [file, setFile] = useState(undefined);
    const fileRef = useRef();

    const [countries, setCountries] = useState(Country.getAllCountries());
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);


    const [contactData, setContactData] = useState({
        name : '',
        email: '',
        phone: '',
        country : '',
        state : '',
        city: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(()=>{
        document.body.style.overflowY = "hidden";
        return ( () => {
            document.body.style.overflowY = "scroll";
        })
    }, [])

    useEffect(() => {
        const initialCountries = Country.getAllCountries();
        setCountries(initialCountries);
        if (contactData.country) {
            setStates(State.getStatesOfCountry(contactData.country));
        }
    }, []);

    const handleCountryChange = (countryCode) => {
        contactData.country = countryCode;
        setStates(State.getStatesOfCountry(countryCode));
        setCities([]);
    };
    
    const handleStateChange = (stateCode) => {
        contactData.state = stateCode;
        setCities(City.getCitiesOfState(contactData.country, stateCode));
    };
    const validationErrors = {...errors};

    const validateField = (field, value) => {
        
        switch(field) {
            case 'name':
                if(!value.trim()){
                    validationErrors.name = "Name is required!"
                }
                else if(!/^[A-Za-z ]+$/.test(value)){
                    validationErrors.name = "name should not contain numbers or special characters!!"
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
                if(value === undefined || !value.trim()  ){
                    validationErrors.phone = "Phone number is required!";
                } else if(!isValidPhoneNumber(value)) {
                    validationErrors.phone = "Phone number is not valid!";
                } else {
                    delete validationErrors.phone;
                }
                break;
            case 'country' : 
                if(!value.trim()){
                    validationErrors.country = "Country is required!"  
                }
                break;
            case 'state' : 
                if(!value.trim()){
                    validationErrors.state = "State is required!"  
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
            case 'photo':
                if(!value || value.size === 0){
                    validationErrors.photo = "Profile photo is required!";
                } else {
                    delete validationErrors.photo;
                }
                break;
            default:
                break;
        }
        setErrors(validationErrors);
    };

    const addContact = async (e) => {
        e.preventDefault();
        if(!contactData.name.trim()){
            validationErrors.name = "Name is required!"
        }
        if(!contactData.email.trim()){
            validationErrors.email = "Email is required!"
        }
        if(!contactData.phone.trim()){
            validationErrors.phone = "Phone is required!"
        }
        if(!contactData.country.trim()){
            validationErrors.country = "Country is required!"
        }
        if(!contactData.state.trim()){
            validationErrors.state = "State is required!"
        }
        if(!contactData.city.trim()){
            validationErrors.city = "City is required!"
        }
        setErrors(validationErrors);
        validateField('photo', file);
        
        if(Object.keys(errors).length ===0 && file){
            console.log(contactData.phone);
            try{
                const {data : url} = await saveContact(contactData);
                console.log(url);
                if(file!==undefined){
                    const formData = new FormData();
                formData.append('file', file, file.name);
                formData.append('id', url.id);
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
                        <input id="name-field" maxLength="25" className="form-field" type="text"
                        onChange={(event)=>{
                            validateField('name', event.target.value);
                            setContactData({...contactData, name:event.target.value});    
                        }} value={contactData.name} required/>
                        {errors.name && <span className="errorMessage">{errors.name}</span>}            
                    </div> 

                    <div className="input-box">
                        <label for="email-field" className="form-label">Email</label>
                        <input id="email-field" className="form-field" maxLength="30" value={contactData.email}
                        onChange={(event)=>{
                            validateField('email', event.target.value);
                            setContactData({...contactData, email:event.target.value})
                        }} required/>
                        {errors.email && <span className="errorMessage">{errors.email}</span>}            
                    </div> 

                    <div className="input-box">
                        <label for="phoneNo-field" className="form-label">Phone Number</label>
                        <PhoneInput
                            international
                            defaultCountry="IN"
                            value={contactData.phone}
                            onChange={(value) => {
                                validateField('phone', value);
                                setContactData({...contactData, phone: value})
                            }}
                            required
                        />
                        {errors.phone && <span className="errorMessage">{errors.phone}</span>}           
                    </div> 

                    <div className="input-box">
                        <label htmlFor="country-field" className="form-label">Country</label>
                        <select id="country-field" className="form-field"
                            onChange={(event) => {
                                validateField('country', event.target.value);
                                handleCountryChange(event.target.value)}}>
                            <option value="" disabled selected>---select---</option>
                            {countries.map((country) => (
                                <option key={country.isoCode} value={country.isoCode}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        {errors.country && <span className="errorMessage">{errors.country}</span>}
                    </div>
                    <div className="input-box">
                        <label htmlFor="state-field" className="form-label">State</label>
                        <select id="state-field" className="form-field"
                            onChange={(event) => {
                                validateField('state', event.target.value);
                                handleStateChange(event.target.value)}}>
                            <option value="" disabled selected>---select---</option>
                            {states.map((state) => (
                                <option key={state.isoCode} value={state.isoCode}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                        {errors.state && <span className="errorMessage">{errors.state}</span>}
                    </div>

                    <div className="input-box">
                        <label htmlFor="city-field" className="form-label">City</label>
                        <select id="city-field" className="form-field" 
                            onChange={(event) => {
                                validateField('city', event.target.value);
                                setContactData({ ...contactData, city: event.target.value });
                            }}>
                            <option value="" disabled selected>---select---</option>
                            {cities.map((city) => (
                                <option key={city.name} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                        {errors.city && <span className="errorMessage">{errors.city}</span>}
                    </div>

                    <div className="file-input">
                        <span className="photoDiv">Profile Photo</span>
                        <input type="file" name='photo' ref={fileRef} required
                        onChange={(event)=>{
                            validateField('photo', event.target.files[0]); 
                            setFile(event.target.files[0])}
                            
                            }/>
                        {errors.photo && <span className="errorMessage">{errors.photo}</span>}
                    </div>

                    <div className="modalFooter">
                        <button type="button" onClick={()=>setShowModal(false)} className="cancel-btn">Cancel</button>
                        <button type="submit" className="save-btn" onClick={(e)=>addContact(e)}>Save</button>
                    </div>

                </form>
            </div>
        </>
    );
}

export default AddContact;