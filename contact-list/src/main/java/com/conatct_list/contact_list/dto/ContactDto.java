package com.conatct_list.contact_list.dto;

import com.conatct_list.contact_list.domain.Contact;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ContactDto {
    private Long id;

    private String name;

    private String email;

    private String phone;

    private String Country;

    private String State;
    private String City;

    private String photoUrl;

    public Contact convertToContactEntity(ContactDto contactDto){
        Contact contact = new Contact();
        contact.setId(contactDto.getId());
        contact.setName(contactDto.getName());
        contact.setEmail(contactDto.getEmail());
        contact.setPhone(contactDto.getPhone());
        contact.setCountry(contactDto.getCountry());
        contact.setState(contactDto.getState());
        contact.setCity(contactDto.getCity());
        contact.setPhotoUrl(contactDto.getPhotoUrl());
        return contact;
    }

    public ContactDto convertToContactDto(Contact contact){
        ContactDto contactDto = new ContactDto();
        contactDto.setId(contact.getId());
        contactDto.setName(contact.getName());
        contactDto.setEmail(contact.getEmail());
        contactDto.setPhone(contact.getPhone());
        contactDto.setCountry(contact.getCountry());
        contactDto.setState(contact.getState());
        contactDto.setCity(contact.getCity());
        contactDto.setPhotoUrl(contact.getPhotoUrl());
        return contactDto;
    }

}
