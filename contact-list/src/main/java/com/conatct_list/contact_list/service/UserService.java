package com.conatct_list.contact_list.service;

import com.conatct_list.contact_list.domain.User;
import com.conatct_list.contact_list.dto.UserDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

public interface UserService {
    public User registerUser(UserDto userDto);
    public Long getCurrentUserId();
    public boolean emailExists(String email);

    void deleteUser(Long id);

    boolean authenticateUser(String email, String password);
}
