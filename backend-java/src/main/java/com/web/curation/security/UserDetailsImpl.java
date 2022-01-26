//package com.web.curation.security;
//
//import java.util.ArrayList;
//
//import java.util.Collection;
//
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//
//import com.web.curation.model.Role;
//import com.web.curation.model.member.Member;
//
//import lombok.AllArgsConstructor;
//
//@AllArgsConstructor
//public class UserDetailsImpl implements UserDetails {
//    /**
//	 * 
//	 */
//	private static final long serialVersionUID = 1L;
//	private static final String ROLE_PREFIX = "ROLE_";
//    private final Member member;
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        Role role = member.getRole();
//        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(ROLE_PREFIX + role.toString());
//        Collection<GrantedAuthority> authorities = new ArrayList<>(); //List인 이유 : 여러개의 권한을 가질 수 있다
//        authorities.add(authority);
//
//        return authorities;
//    }
//
//    @Override
//    public String getPassword() {
//        return member.getPassword();
//    }
//
//    @Override
//    public String getUsername() {
//        return member.getEmail();
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
//
//    public String getName() {
//        return member.getName();
//    }
//}