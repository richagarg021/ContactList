package com.conatct_list.contact_list.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "contacts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class Contact {
    @Id
    @Column(name = "id", unique = true, updatable = true)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Name cannot be blank")
    private String name;

    @NotBlank(message = "Email cannot be blank")
    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.(com|org|in)$", flags = Pattern.Flag.CASE_INSENSITIVE)
    private String email;

    @NotBlank(message = "Phone number cannot be blank")
//    @Size(min = 10, max = 10, message = "Invalid Phone Number")
    private String phone;

    private String Country;

    private String State;
    private String City;

    private String photoUrl;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;

}
