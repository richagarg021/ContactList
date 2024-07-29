package com.conatct_list.contact_list.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class User {
    @Id
    @Column(name = "user_id", unique = true, updatable = true )
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long user_id;

    @NotBlank(message = "Name cannot be blank")
    private  String name;

    @NotBlank(message = "Email cannot be blank")
    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}", flags = Pattern.Flag.CASE_INSENSITIVE)
    @Column(unique = true)
    private String email;

    @NotBlank(message = "Password cannot be blank")
    private String password;

    private String role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Contact> contactList = new ArrayList<>();

}
