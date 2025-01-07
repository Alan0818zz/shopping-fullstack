package com.example.shoppingweb.Mapper;

import com.example.shoppingweb.DTO.CouponDTO;
import com.example.shoppingweb.model.Category;
import com.example.shoppingweb.model.Coupon;
import java.util.function.Function;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;


@Service
public class CouponDTOMapper implements Function<Coupon, CouponDTO>{  // 明確指定輸入類型是 Coupon，輸出類型是 CouponDTO

    @Override
    public CouponDTO apply(Coupon coupon) {
        return new CouponDTO(
                coupon.getCouponCodeId(),
                coupon.getName(),
                coupon.getDiscount(),
                coupon.getLowLimit(),
                coupon.getStartDate(),
                coupon.getEndDate()
//                coupon.getCategories().stream()
//                        .map(Category::getCategoryId)
//                        .collect(Collectors.toSet())
        );
    }
}
