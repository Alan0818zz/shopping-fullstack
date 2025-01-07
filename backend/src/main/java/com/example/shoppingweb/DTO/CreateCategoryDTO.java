package com.example.shoppingweb.DTO;

public class CreateCategoryDTO {
    private String categoryName;
    private Double categoryDiscount;

    // 基本建構子
    public CreateCategoryDTO() {}

    // getters and setters
    public String getCategoryName() {
        return categoryName;
    }

    public Double getCategoryDiscount() {
        return categoryDiscount;
    }

}
