package com.conatct_list.contact_list.config;

import com.conatct_list.contact_list.contactRepository.UserRepo;
import com.conatct_list.contact_list.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // fetching user from database
        User user = userRepo.findByEmail(username);

        if(user==null){
            throw new UsernameNotFoundException("User not found !!");
        }

        CustomUserDetails customUserDetails = new CustomUserDetails(user);
        return customUserDetails;
    }
}
