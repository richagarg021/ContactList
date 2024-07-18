package com.conatct_list.contact_list.service;

import com.conatct_list.contact_list.contactRepository.UserRepo;
import com.conatct_list.contact_list.domain.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user){
        if(emailExists(user.getEmail())){
            throw new RuntimeException("Email address already exists: " + user.getEmail());
        }
        try{
            if(user!=null) {
                user.setRole("USER");
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                userRepo.save(user);
                return user;
            }
        }catch (Exception e){
            e.printStackTrace();
            throw new RuntimeException("Cannot not register user");
        }
        return null;
    }


    public Long getCurrentUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String username = ((UserDetails)principal).getUsername();
            User user = userRepo.findByEmail(username);
            return user.getUser_id();
        } else {
            throw new RuntimeException("User is not authenticated");
        }
    }

    public boolean emailExists(String email){
        return userRepo.findByEmail(email)!=null;
    }
}
