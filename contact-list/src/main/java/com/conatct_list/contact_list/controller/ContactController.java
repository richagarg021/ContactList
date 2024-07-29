package com.conatct_list.contact_list.controller;

import com.conatct_list.contact_list.domain.Contact;
import com.conatct_list.contact_list.service.ContactService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import static com.conatct_list.contact_list.constants.Constant.PHOTO_DIRECTORY;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@RestController
@CrossOrigin("*")
@RequestMapping("/contacts")
@Transactional
public class ContactController {
    @Autowired
    public ContactService contactService;

    @GetMapping
    public ResponseEntity<Page<Contact>> getAllContacts(@RequestParam(value = "pageNumber", defaultValue = "0") int pageNumber,
                                                        @RequestParam(value = "pageSize", defaultValue = "12") int pageSize){
        try{
            return ResponseEntity.ok().body(contactService.getAllContacts(pageNumber, pageSize));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getContact(@PathVariable("id") Long id){
        try{
            return ResponseEntity.ok().body(contactService.getContact(id));
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Contact> createContact(@Valid @RequestBody Contact contact){
        try{
            return ResponseEntity.ok().body(contactService.createContact(contact));
        }
        catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable("id") Long id){
        try {
            this.contactService.deleteContact(id);
            return new ResponseEntity<>("Contact deleted successfully!", HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateContact(@PathVariable("id") Long id, @Valid @RequestBody Contact contact){
        try{
            Contact c = contactService.updateContact(id, contact);
            return ResponseEntity.ok().body(c);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/photo")
    public ResponseEntity<String> uploadPhoto(@RequestParam("id") Long id, @RequestParam("file")MultipartFile file){
        return ResponseEntity.ok().body(contactService.uploadPhoto(id, file));
    }

    @GetMapping(path = "/image/{filename}", produces = {IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE})
    public byte[] getPhoto(@PathVariable("filename") String filename) throws IOException{
        return Files.readAllBytes(Paths.get(PHOTO_DIRECTORY + filename));
    }

    @GetMapping("/search")
    public Contact[] searchContacts(@RequestParam String name){
        List<Contact> contactList = contactService.searchByName(name);
        Contact[] conatctArray = contactList.toArray(new Contact[0]);
        return conatctArray;
    }
}
