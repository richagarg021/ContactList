package com.conatct_list.contact_list.service;


import com.conatct_list.contact_list.contactRepository.ContactRepo;
import com.conatct_list.contact_list.contactRepository.UserRepo;
import com.conatct_list.contact_list.domain.Contact;
import com.conatct_list.contact_list.domain.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import static com.conatct_list.contact_list.constants.Constant.PHOTO_DIRECTORY;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
@Transactional
public class ContactServiceImpl implements ContactService{

    @Autowired
    private ContactRepo contactRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private UserServiceImpl userService;

    public Page<Contact> getAllContacts(int pageNumber, int pageSize){
        User user = userRepo.findById(userService.getCurrentUserId()).get();
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        return contactRepo.findByUser(user, pageable);
    }

    public Contact getContact(Long id){
        Contact contact = contactRepo.findById(id).orElse(null);
        if(contact!=null){
            User user = contact.getUser();
            if(user.getUser_id().equals(userService.getCurrentUserId())){
                return contact;
            }
            else{
                throw new RuntimeException("Cannot access this user: Access Denied!");
            }
        }
        else{
            throw new RuntimeException("Contact not found!");
        }

//        return contactRepo.findById(id).orElseThrow(() -> new RuntimeException("Contact not found"));
    }

    public Contact createContact(Contact contact){
        User user = userRepo.findById(userService.getCurrentUserId()).get();
        contact.setUser(user);
        return contactRepo.save(contact);
    }

    @Transactional
    public void deleteContact(Long id){
        Contact contact = contactRepo.findById(id).orElse(null);
        if(contact!=null){
            User user = contact.getUser();
            if(user.getUser_id().equals(userService.getCurrentUserId())){
                contactRepo.delete(contact);
            }
            else{
                throw new RuntimeException("Cannot access this user: Access Denied!");
            }
        }
        else
            throw new RuntimeException("Contact not found");
    }

    public Contact updateContact(Long id, Contact contact){
        Contact contactDb = contactRepo.findById(id).orElse(null);
        if(contactDb!=null){
            User user = contactDb.getUser();
            if(user.getUser_id().equals(userService.getCurrentUserId())){
                contactDb.setName(contact.getName());
                contactDb.setEmail(contact.getEmail());
                contactDb.setPhone(contact.getPhone());
                contactDb.setCity(contact.getCity());
                contactDb.setPhotoUrl("");
                contactRepo.save(contactDb);
                return contactDb;
            }
            else{
                throw new RuntimeException("Cannot access this user: Access Denied!");
            }
        }
        else
            throw new RuntimeException("Contact not found");
    }

    public String uploadPhoto(Long id, MultipartFile file){
        Contact contact = getContact(id);
        String photoUrl = photoFunction(id, file);
        contact.setPhotoUrl(photoUrl);
        contactRepo.save(contact);
        return  photoUrl;
    }

    public String fileExtension(String filename){
        return Optional.of(filename).filter(name -> name.contains("."))
                .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".png");
    }

    public String photoFunction(Long id, MultipartFile image){
        String fileName = id + fileExtension(image.getOriginalFilename());
        try{
            Path fileStorageLocation = Paths.get(PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if(!Files.exists(fileStorageLocation)) {
                Files.createDirectories(fileStorageLocation);
            }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(fileName), REPLACE_EXISTING);
            return ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/contacts/image/" + fileName).toUriString();
        }
        catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Unable to save image");
        }
    }
}
