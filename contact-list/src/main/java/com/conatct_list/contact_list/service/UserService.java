package com.conatct_list.contact_list.service;

import com.conatct_list.contact_list.domain.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

public interface UserService {
    public User registerUser(User user);
    public Long getCurrentUserId();
    public boolean emailExists(String email);
}
