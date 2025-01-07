package com.example.shoppingweb.DTO;

import java.time.LocalDateTime;

public record MemberDTO(
        Integer memberId,
        String name,
        String email,
        String phoneNumber,
        LocalDateTime registerDat
) {}
