package com.ChitChat.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String username;

    private String password;

    @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE)
    private Image profileImage;

    private boolean isAdmin = false;

    @ManyToMany(mappedBy = "participants", cascade = CascadeType.REMOVE)
    private List<Conversation> conversations;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Message> messages;

    @OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE)
    private List<Token> tokens;

    public void setAdmin(){
        this.isAdmin = true;
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(!isAdmin){
            return AuthorityUtils.createAuthorityList("ROLE_USER");
        }else{
            return AuthorityUtils.createAuthorityList("ROLE_ADMIN");
        }
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
