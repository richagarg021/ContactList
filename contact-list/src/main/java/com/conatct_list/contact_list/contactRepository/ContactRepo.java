package com.conatct_list.contact_list.contactRepository;

import com.conatct_list.contact_list.domain.Contact;
import com.conatct_list.contact_list.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContactRepo extends JpaRepository<Contact, Long> {
    public Page<Contact> findByUser(User user, Pageable pageable);

    public List<Contact> findByNameStartingWith(String name);



}
