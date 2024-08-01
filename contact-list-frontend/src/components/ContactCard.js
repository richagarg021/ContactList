import React, {useState  } from "react";
import "./ContactCard.css";
import { deleteContact } from "../services/contactService";
import { useNavigate} from "react-router-dom";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="confirmation-heading">
                    <h3>Delete Confirmation</h3>
                    <button onClick={onClose}>X</button>
                </div>
                <div className="confirmation"><p>Are you sure you want to delete this contact?</p></div>
                <div className="line-break"></div>
                <div className="btns">
                    <button className="cancel" onClick={onClose}>Cancel</button>
                    <button className="delete" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    );
};

function ContactCard({contact, getAllContacts}){

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const deleteContactDetail = async(id) =>{
        try{
            const response = await deleteContact(id);
            console.log(response);
            getAllContacts();
        }catch(error){
            console.log(error);
        }
    }

    return (
        <>
            <div className="contactCard">
                <div className="nameAndPhoto">
                    <div className="imageWrapper">
                        <img className="contactImg" src={contact.photoUrl} alt=""/>
                    </div>
                    <div className="name">{contact.name.length > 20 ? contact.name.substring(0, 19) + "..." : contact.name}</div>
                </div>

                <div className="contactDetails">
                    <div className="detailsIcon">
                        <img className="icon" src="/images/email-icon.png" alt=""/>
                    </div>
                    <div className="details">{contact.email.length > 24 ? contact.email.substring(0,23) + "..." : contact.email}</div>
                </div>

                <div className="contactDetails">
                    <div className="detailsIcon">
                        <img className="icon" src="/images/phone-icon.png" alt=""/>
                    </div>
                    <div className="details">{contact.phone}</div>
                </div>

                <div className="contactDetails">
                    <div className="detailsIcon">
                        <img className="icon" src="/images/city-icon.png" alt=""/>
                    </div>
                    <div className="details">{contact.city}</div>
                </div>
                <div className="btnContainer">
                    <button className="btn" onClick={()=> navigate(`/user/contacts/${contact.id}`)}>Edit</button>
                    <button className="btn" onClick={() => setIsModalOpen(true)}>Delete</button>
                </div>
                <DeleteConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
                        onConfirm={() => deleteContactDetail(contact.id)}
                />

            </div>
        </>
    );
}

export default ContactCard;