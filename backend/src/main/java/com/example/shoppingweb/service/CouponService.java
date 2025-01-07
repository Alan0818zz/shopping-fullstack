package com.example.shoppingweb.service;

import com.example.shoppingweb.DTO.CouponDTO;
import com.example.shoppingweb.Mapper.CouponDTOMapper;
import com.example.shoppingweb.model.Coupon;
import com.example.shoppingweb.repository.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class CouponService {

    private final CouponRepository couponRepository;
    private final CouponDTOMapper couponDTOMapper;

    public CouponService(CouponRepository couponRepository, CouponDTOMapper couponDTOMapper) {
        this.couponRepository = couponRepository;
        this.couponDTOMapper = couponDTOMapper;
    }

    public List<CouponDTO> getAllCoupons() {
        return couponRepository.findAll()
                .stream()
                .map(couponDTOMapper)
                .collect(Collectors.toList());
    }
    public CouponDTO getCoupon(Integer id) {
        return couponRepository.findById(id)
                .map(couponDTOMapper)
                .orElseThrow(() -> new NoSuchElementException("Coupon not found"));
    }
    public CouponDTO createCoupon(CouponDTO couponDTO) {
        // 創建新的 Coupon 實體
        // 驗證優惠券名稱是否重複
        if (couponRepository.existsByName(couponDTO.name())) {
            throw new IllegalArgumentException("Coupon name '" + couponDTO.name() + "' already exists");
        }
        // 驗證日期
        validateDates(couponDTO);

        Coupon coupon = new Coupon();
        updateCouponFromDTO(coupon, couponDTO);

        Coupon saved = couponRepository.save(coupon);
        return couponDTOMapper.apply(saved);
    }
    private void validateDates(CouponDTO couponDTO) {
        if (couponDTO.startDate() == null || couponDTO.endDate() == null) {
            throw new IllegalArgumentException("Start date and end date are required");
        }
        if (couponDTO.startDate().isAfter(couponDTO.endDate())) {
            throw new IllegalArgumentException("Start date must be before end date");
        }
//        if (couponDTO.startDate().isBefore(LocalDateTime.now())) {
//            throw new IllegalArgumentException("Start date cannot be in the past");
//        }
    }

    public CouponDTO updateCoupon(Integer id ,CouponDTO couponDTO) {
        //System.out.println("Updating coupon with id: " + couponDTO.couponCodeId());
        // 驗證日期
        validateDates(couponDTO);
        Coupon coupon = couponRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Coupon not found"));

        updateCouponFromDTO(coupon, couponDTO);
        Coupon updated = couponRepository.save(coupon);
        return couponDTOMapper.apply(updated);
    }

    public void deleteCoupon(Integer id) {
        if (!couponRepository.existsById(id)) {
            throw new NoSuchElementException("Coupon not found");
        }
        couponRepository.deleteById(id);
    }

    private void updateCouponFromDTO(Coupon coupon, CouponDTO dto) {
        coupon.setName(dto.name());
        coupon.setDiscount(dto.discount());
        coupon.setLowLimit(dto.lowLimit());
        coupon.setStartDate(dto.startDate());
        coupon.setEndDate(dto.endDate());
    }

}