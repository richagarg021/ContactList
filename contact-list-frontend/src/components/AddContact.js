import React, { useEffect, useRef, useState } from "react";
import "./AddContact.css";
import { saveContact, uploadPhoto } from "../services/contactService";
import { Country, State, City } from 'country-state-city';

function AddContact({setShowModal, getAllContacts, currentPage}){

    const [file, setFile] = useState(undefined);
    const fileRef = useRef();

    const [countries, setCountries] = useState(Country.getAllCountries());
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');

    const [contactData, setContactData] = useState({
        name : '',
        email: '',
        phone: '',
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
        if (selectedCountry) {
            setStates(State.getStatesOfCountry(selectedCountry));
        }
    }, []);

    const handleCountryChange = (countryCode) => {
        setSelectedCountry(countryCode);
        setStates(State.getStatesOfCountry(countryCode));
        setCities([]);
    };
    
    const handleStateChange = (stateCode) => {
        setSelectedState(stateCode);

        setCities(City.getCitiesOfState(selectedCountry, stateCode));
    };
    

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
        if(Object.keys(errors).length ===0 && file){
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
                        <input id="name-field" maxLength="24" className="form-field" type="text"
                        onChange={(event)=>{
                            validateField('name', event.target.value);
                            setContactData({...contactData, name:event.target.value});    
                        }} value={contactData.name} required/>
                        {errors.name && <span className="errorMessage">{errors.name}</span>}            
                    </div> 

                    <div className="input-box">
                        <label for="email-field" className="form-label">Email</label>
                        <input id="email-field" className="form-field" value={contactData.email}
                        onChange={(event)=>{
                            validateField('email', event.target.value);
                            setContactData({...contactData, email:event.target.value})
                        }} required/>
                        {errors.email && <span className="errorMessage">{errors.email}</span>}            
                    </div> 

                    <div className="input-box">
                        <label for="phoneNo-field" className="form-label">Phone Number</label>
                        <input id="phoneNo-field" className="form-field"  value={contactData.phone}
                        onChange={(event)=>{
                            validateField('phone', event.target.value);
                            setContactData({...contactData, phone:event.target.value})
                        }} required/> 
                        {errors.phone && <span className="errorMessage">{errors.phone}</span>}           
                    </div> 

                    <div className="input-box">
                        <label htmlFor="country-field" className="form-label">Country</label>
                        <select id="country-field" className="form-field"
                            onChange={(event) => handleCountryChange(event.target.value)}>
                            {countries.map((country) => (
                                <option key={country.isoCode} value={country.isoCode}>
                                    {country.name}
                                </option>
                            ))} required
                        </select>
                    </div>
                    <div className="input-box">
                        <label htmlFor="state-field" className="form-label">State</label>
                        <select id="state-field" className="form-field"
                            onChange={(event) => handleStateChange(event.target.value)}>
                            {states.map((state) => (
                                <option key={state.isoCode} value={state.isoCode}>
                                    {state.name}
                                </option>
                            ))} required
                        </select>
                    </div>

                    <div className="input-box">
                        <label htmlFor="city-field" className="form-label">City</label>
                        <select id="city-field" className="form-field"
                            onChange={(event) => {
                                validateField('city', event.target.value);
                                setContactData({ ...contactData, city: event.target.value });
                            }}>
                            {cities.map((city) => (
                                <option key={city.name} value={city.name}>
                                    {city.name}
                                </option>
                            ))} required
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