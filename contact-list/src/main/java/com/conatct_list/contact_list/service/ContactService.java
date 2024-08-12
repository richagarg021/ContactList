package com.conatct_list.contact_list.service;

import com.conatct_list.contact_list.domain.Contact;
import com.conatct_list.contact_list.domain.User;
import com.conatct_list.contact_list.dto.ContactDto;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ContactService {
    public Page<Contact> getAllContacts(int pageNumber, int pageSize);
    public Contact getContact(Long id);
    public Contact createContact(ContactDto contactDto);

    public void deleteContact(Long id);

    public Contact updateContact(Long id, ContactDto contactDto);
    public String uploadPhoto(Long id, MultipartFile file);
    public String photoFunction(Long id, MultipartFile image);

    public String fileExtension(String filename);
    public List<Contact> searchByName(String name);

}
