import React , {useEffect, useState} from "react";
import "./ContactDetails.css";
import { useParams } from "react-router-dom";
import { getContact, uploadPhoto,  saveContact } from "../services/contactService";
import { useNavigate } from "react-router-dom";
import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { Country, State, City } from 'country-state-city';

function ContactDetails(){

    const [countries, setCountries] = useState(Country.getAllCountries());
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [contactData, setContactData] = useState({
        id : '',
        name : '',
        email: '',
        phone: '',
        country : '',
        state : '',
        city: '',
        photoUrl : '',
    });
   

    const [errors, setErrors] = useState({});
    const validationErrors = {...errors};

    const handleCountryChange = (countryCode) => {
        setContactData(prevData => ({
            ...prevData,
            country: countryCode,
            state: '', // Reset state when country changes
            city: '' // Reset city when country changes
        }));
       
        if(!contactData.state == ''){
            validationErrors.state = "State is required!" 
        }
        setStates(State.getStatesOfCountry(countryCode)); 
        
        setCities([]);
    };
    
    const handleStateChange = (stateCode) => {
        setContactData(prevData => ({
            ...prevData,
            state: stateCode,
            city: '' // Reset city when state changes
        }));
        setCities(City.getCitiesOfState(contactData.country, stateCode));
        validationErrors.city = "City is required!" 
        delete validationErrors.state;
    };

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
            default:
                break;
        }
        setErrors(validationErrors);
    };

    const updateContactDetails = async(event) =>{
        event.preventDefault();

        if(Object.keys(errors).length===0){
            try{
                const {data} = await saveContact(contactData);            
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

    useEffect(() => {
        // Fetch initial countries
        const initialCountries = Country.getAllCountries();
        setCountries(initialCountries);
    
        // If there's a selected country, fetch states
        if (contactData.country) {
            const initialStates = State.getStatesOfCountry(contactData.country);
            setStates(initialStates);
    
            // If there's a selected state, fetch cities
            if (contactData.state) {
                const initialCities = City.getCitiesOfState(contactData.country, contactData.state);
                setCities(initialCities);
            }
        }
    }, [contactData.country, contactData.state]);


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
                    <div className="form-input-box">
                        <label for="name-field" className="form-label">Name</label>
                        <input id="name-field" value={contactData.name} maxLength="25" className="form-field" type="text" 
                        onChange={(event)=>{
                            validateField('name', event.target.value);
                            setContactData({...contactData, name:event.target.value})}}/>
                        {errors.name && <span className="errorMessage">{errors.name}</span>}         
                    </div> 

                    <div className="input-box">
                        <label for="email-field" className="form-label">Email</label>
                        <input id="email-field" className="form-field" maxLength="30" value={contactData.email}
                        onChange={(event)=>{
                            validateField('email', event.target.value);
                            setContactData({...contactData, email:event.target.value})}}/>
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
                        <select id="country-field" className="form-field" value={contactData.country}
                            onChange={(event) => {
                                validateField('country', event.target.value);
                                handleCountryChange(event.target.value)}} required>
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
                        <select id="state-field" className="form-field" value={contactData.state}
                            onChange={(event) => {
                                validateField('state', event.target.value);
                                handleStateChange(event.target.value)}} required>
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
                        <select id="city-field" className="form-field" value={contactData.city}
                            onChange={(event) => {
                                validateField('city', event.target.value);
                                setContactData({ ...contactData, city: event.target.value });
                            }} required>
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