package com.conatct_list.contact_list.controller;

import com.conatct_list.contact_list.domain.User;
import com.conatct_list.contact_list.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Map;

@CrossOrigin("http://localhost:3002")
@RestController
@RequestMapping("/")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> regsiterUser(@RequestBody User user){
        try{
            User u = userService.registerUser(user);
            return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>("Registration failed", HttpStatus.BAD_REQUEST);
        }

    }

}
