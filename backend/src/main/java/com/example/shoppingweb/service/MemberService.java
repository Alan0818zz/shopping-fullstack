package com.example.shoppingweb.service;

import com.example.shoppingweb.DTO.CouponDTO;
import com.example.shoppingweb.DTO.MemberDTO;
import com.example.shoppingweb.Mapper.MemberDTOMapper;
import com.example.shoppingweb.model.Coupon;
import com.example.shoppingweb.model.Member;
import com.example.shoppingweb.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberDTOMapper memberDTOMapper;

    public MemberService(MemberRepository memberRepository, MemberDTOMapper memberDTOMapper) {
        this.memberRepository = memberRepository;
        this.memberDTOMapper = memberDTOMapper;
    }

    public void registerMember(Member member) {
        LocalDateTime now = LocalDateTime.now();
        member.setRegisterDate(now);
        memberRepository.save(member);
    }

    public Member login(String email, String password) {
        return memberRepository.findByEmailAndPassword(email, password).orElse(null); // If not found, return null
    }
    public List<MemberDTO> getAllMembers() {
        return memberRepository.findAll()
                .stream()
                .map(memberDTOMapper)
                .collect(Collectors.toList());
    }
    public MemberDTO update(Integer id,MemberDTO memberDTO) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Coupon not found"));
        updateMemberFromDTO(member,memberDTO);
        Member updated = memberRepository.save(member);
        return memberDTOMapper.apply(updated);
    }

    public Member findByemail(String email) {
        return memberRepository.findByEmail(email).orElseThrow(() -> new NoSuchElementException("Member not found with id: " + email));
    }
    private void updateMemberFromDTO(Member member, MemberDTO dto) {
        member.setName(dto.name());
        member.setEmail(dto.email());
        member.setPhone(dto.phoneNumber());
    }
}