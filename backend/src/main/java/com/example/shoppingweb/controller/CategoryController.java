package com.example.shoppingweb.controller;

import com.example.shoppingweb.DTO.CategoryDTO;
import com.example.shoppingweb.DTO.CreateCategoryDTO;
import com.example.shoppingweb.model.Product;
import com.example.shoppingweb.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    // 獲取所有分類
    // 獲取所有分類（包含產品摘要）

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        try {
            List<CategoryDTO> categories = categoryService.getAllCategoriesWithProducts();
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // 獲取單一分類（包含產品摘要）
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> getCategoryById(@PathVariable Integer id) {
        try {
            CategoryDTO category = categoryService.getCategoryDTOById(id);
            return ResponseEntity.ok(category);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    // 創建新分類
    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CreateCategoryDTO createDTO) {
        try {
            if (createDTO.getCategoryName() == null || createDTO.getCategoryName().trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            CategoryDTO newCategory = categoryService.createCategory(createDTO);
            return ResponseEntity.ok(newCategory);
        } catch (Exception e) {
            System.err.println("Error creating category: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Error creating category: " + e.getMessage());
        }
    }


    @GetMapping("/slug/{categoryId}")
    public ResponseEntity<CategoryDTO> getCategoryWithProducts(
            @PathVariable Integer categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        CategoryDTO categoryDTO = categoryService.getCategoryWithProducts(categoryId, page, size);
        return ResponseEntity.ok(categoryDTO);
    }
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(
            @PathVariable Integer id,
            @RequestBody CategoryDTO categoryDTO) {
        try {
            CategoryDTO updatedCategory = categoryService.updateCategory(id, categoryDTO);
            return ResponseEntity.ok(updatedCategory);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Integer id) {
        try {
            if (!categoryService.existsById(id)) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body(new HashMap<String, String>() {{
                            put("message", "找不到該分類");
                        }});
            }
            categoryService.deleteById(id);
            return ResponseEntity.ok(new HashMap<String, String>() {{
                put("message", "分類刪除成功");
            }});

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new HashMap<String, String>() {{
                        put("message", "刪除分類失敗: " + e.getMessage());
                    }});
        }
    }
}
