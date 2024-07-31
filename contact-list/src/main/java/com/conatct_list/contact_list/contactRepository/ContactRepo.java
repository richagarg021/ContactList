package com.conatct_list.contact_list.contactRepository;

import com.conatct_list.contact_list.domain.Contact;
import com.conatct_list.contact_list.domain.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContactRepo extends JpaRepository<Contact, Long> {
    public Page<Contact> findByUser(User user, Pageable pageable);

    public List<Contact> findByNameStartingWithAndUser(String name, User user);

    @Query("SELECT c FROM Contact c WHERE c.user = :user AND " +
            "(LOWER(c.name) LIKE LOWER(CONCAT('%',:search,'%')) OR " +
            "LOWER(c.email) LIKE LOWER(CONCAT('%',:search,'%')) OR " +
            "LOWER(c.phone) LIKE LOWER(CONCAT('%',:search,'%')))")
    List<Contact> findBySearchCriteria(@Param("search")String name, @Param("user") User user);



}
