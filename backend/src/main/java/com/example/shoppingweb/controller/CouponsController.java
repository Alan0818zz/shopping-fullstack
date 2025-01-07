package com.example.shoppingweb.controller;

import com.example.shoppingweb.DTO.CouponDTO;
import com.example.shoppingweb.service.CouponService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/coupons")
public class CouponsController {
    @Autowired
    private CouponService couponService;

    // 獲取所有優惠券
    @GetMapping
    public ResponseEntity<List<CouponDTO>> getAllCoupons() {
        try {
            List<CouponDTO> coupons = couponService.getAllCoupons();
            return ResponseEntity.ok(coupons);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    // 單一優惠券
    @GetMapping("/{id}")
    public ResponseEntity<CouponDTO> getCoupon(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(couponService.getCoupon(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
    // 新增優惠券
    @PostMapping
    public ResponseEntity<CouponDTO> createCoupon(@RequestBody CouponDTO couponDTO) {
        try {
            CouponDTO created = couponService.createCoupon(couponDTO);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            System.err.println("Error updating coupon: " + e.getMessage());
            e.printStackTrace();
            throw e;
//            return ResponseEntity.badRequest().build();
        }
    }

    // 更新優惠券
    @PutMapping("/{id}")
    public ResponseEntity<CouponDTO> updateCoupon(@PathVariable Integer id, @RequestBody CouponDTO couponDTO) {
        try {
            CouponDTO updated = couponService.updateCoupon(id, couponDTO);
            return ResponseEntity.ok(updated);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
//            System.err.println("Error updating coupon: " + e.getMessage());
//            e.printStackTrace();
//            throw e;
            return ResponseEntity.badRequest().build();
        }
    }

    // 刪除優惠券
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCoupon(@PathVariable Integer id) {
        try {
            couponService.deleteCoupon(id);
            return ResponseEntity.ok("Coupon deleted successfully");
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
