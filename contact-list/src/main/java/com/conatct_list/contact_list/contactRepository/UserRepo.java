package com.conatct_list.contact_list.contactRepository;

import com.conatct_list.contact_list.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    public User findByEmail(String email);
}
