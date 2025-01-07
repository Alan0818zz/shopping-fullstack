package com.example.shoppingweb.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "coupons")
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Integer couponCodeId; // Changed from String to Integer

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double discount;

    @Column(name = "low_limit")
    private Integer lowLimit;

    @Column(name = "start_date", nullable = false)
    private LocalDateTime startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDateTime endDate;

//    @ManyToMany
//    @JoinTable(
//            name = "COUPON_CATEGORIES",
//            joinColumns = @JoinColumn(name = "coupon_code_id"),
//            inverseJoinColumns = @JoinColumn(name = "category_id")
//    )
//    private Set<Category> categories = new HashSet<>();
    // 建構函數
    public Coupon() {}


    // Getters and Setters
    public Integer getCouponCodeId() {
        return couponCodeId;
    }

    public void setCouponCodeId(Integer couponCodeId) {
        this.couponCodeId = couponCodeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public Integer getLowLimit() {
        return lowLimit;
    }

    public void setLowLimit(Integer lowLimit) {
        this.lowLimit = lowLimit;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

//    public Set<Category> getCategories() {
//        return categories;
//    }
//
//    public void setCategories(Set<Category> categories) {
//        this.categories = categories;
//    }
//
//    // 方便的方法來添加/移除分類
//    public void addCategory(Category category) {
//        this.categories.add(category);
//    }
//
//    public void removeCategory(Category category) {
//        this.categories.remove(category);
//    }
}
