package com.conatct_list.contact_list.dto;

import com.conatct_list.contact_list.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long userId;
    private String name;
    private String email;
    private String password;
    private String role;

    public User convertToUserEntity(UserDto userDto){
        User user = new User();
        user.setUser_id(userDto.getUserId());
        user.setName(userDto.getName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setRole(userDto.getRole());
        return user;
    }

    public UserDto convertToUserDto(User user){
        UserDto userDto = new UserDto();
        userDto.setUserId(user.getUser_id());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());
        userDto.setRole(user.getRole());
        return userDto;
    }

}
