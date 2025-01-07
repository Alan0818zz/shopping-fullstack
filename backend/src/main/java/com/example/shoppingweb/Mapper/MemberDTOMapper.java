package com.example.shoppingweb.Mapper;

import com.example.shoppingweb.DTO.CouponDTO;
import com.example.shoppingweb.DTO.MemberDTO;
import com.example.shoppingweb.model.Coupon;
import com.example.shoppingweb.model.Member;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class MemberDTOMapper implements Function<Member, MemberDTO> {

    @Override
    public MemberDTO apply(Member member) {
        return new MemberDTO(
                member.getId(),
                member.getName(),
                member.getEmail(),
                member.getPhone(),
                member.getRegisterDate()
        );
    }
}
