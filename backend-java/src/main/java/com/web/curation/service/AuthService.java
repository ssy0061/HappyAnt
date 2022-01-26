//package com.web.curation.service;
//
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import com.web.curation.dto.account.JwtRequestDto;
//import com.web.curation.dto.account.JwtResponseDto;
//import com.web.curation.dto.account.MemberSignupRequestDto;
//import com.web.curation.model.member.Member;
//import com.web.curation.repository.member.MemberRepository;
//import com.web.curation.security.JwtTokenProvider;
//import com.web.curation.security.UserDetailsImpl;
//
//import lombok.AllArgsConstructor;
//
//@Service
//@Transactional
//@AllArgsConstructor
//public class AuthService {
//
//    private MemberRepository memberRepository;
//    private PasswordEncoder passwordEncoder;
//
//    private AuthenticationManager authenticationManager;
//    private JwtTokenProvider jwtTokenProvider;
//
//    public JwtResponseDto login(JwtRequestDto request) throws Exception {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
//
//        return createJwtToken(authentication);
//    }
//
//    private JwtResponseDto createJwtToken(Authentication authentication) {
//        UserDetailsImpl principal = (UserDetailsImpl) authentication.getPrincipal();
//        String token = jwtTokenProvider.generateToken(principal);
//        return new JwtResponseDto(token);
//    }
//
//    public String signup(MemberSignupRequestDto request) {
//        boolean existMember = memberRepository.existsById(request.getId());
//
//        if (existMember) return null;
//
//        Member member = new Member(request);
//        member.encryptPassword(passwordEncoder);
//
//        memberRepository.save(member);
//        return member.getEmail();
//    }
//}