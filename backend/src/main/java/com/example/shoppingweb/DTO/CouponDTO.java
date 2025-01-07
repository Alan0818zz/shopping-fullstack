package com.example.shoppingweb.DTO;

import java.time.LocalDateTime;

public record CouponDTO(
        Integer couponCodeId,
        String name,
        Double discount,
        Integer lowLimit,
        LocalDateTime startDate,
        LocalDateTime endDate
) {}




