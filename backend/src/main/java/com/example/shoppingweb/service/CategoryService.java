package com.example.shoppingweb.service;
import com.example.shoppingweb.DTO.CategoryDTO;
import com.example.shoppingweb.DTO.CreateCategoryDTO;
import com.example.shoppingweb.model.Category;
import com.example.shoppingweb.model.Product;
import com.example.shoppingweb.repository.CategoryRepository;
import com.example.shoppingweb.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public CategoryDTO getCategoryWithProducts(Integer categoryId, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productPage = productRepository.findByCategoryCategoryId(categoryId, pageable);


        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NoSuchElementException("Category not found with ID: " + categoryId));

        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setCategoryId(category.getCategoryId());
        categoryDTO.setCategoryName(category.getCategoryName());
        categoryDTO.setCategoryDiscount(category.getCategoryDiscount());

        List<CategoryDTO.ProductSummaryDTO> productSummaries = productPage.getContent().stream()
                .map(product -> {
                    CategoryDTO.ProductSummaryDTO productSummary = new CategoryDTO.ProductSummaryDTO();
                    productSummary.setId(product.getId());
                    productSummary.setProductName(product.getProductName());
                    productSummary.setImage(product.getImage());
                    productSummary.setPrice(product.getPrice());
                    return productSummary;
                })
                .collect(Collectors.toList());

        categoryDTO.setProducts(productSummaries);
        return categoryDTO;
    }

    public List<CategoryDTO> getAllCategoriesWithProducts() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(this::convertToCategoryDTO)
                .collect(Collectors.toList());
    }

    public boolean existsById(Integer id) {
        return categoryRepository.existsById(id);
    }

    public void deleteById(Integer id) {
        categoryRepository.deleteById(id);
    }
    public CategoryDTO createCategory(CreateCategoryDTO createDTO) {
        Category category = new Category();
        category.setCategoryName(createDTO.getCategoryName());
        category.setCategoryDiscount(createDTO.getCategoryDiscount());
        Category savedCategory = categoryRepository.save(category);
        return convertToSimpleCategoryDTO(savedCategory);
    }

    private CategoryDTO convertToSimpleCategoryDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setCategoryId(category.getCategoryId());
        dto.setCategoryName(category.getCategoryName());
        dto.setCategoryDiscount(category.getCategoryDiscount());
        return dto;
    }

    public CategoryDTO getCategoryDTOById(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return convertToCategoryDTO(category);
    }
    public CategoryDTO updateCategory(Integer id, CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Category not found"));
        // 只更新這兩個欄位
        category.setCategoryName(categoryDTO.getCategoryName());
        category.setCategoryDiscount(categoryDTO.getCategoryDiscount() != null ?
                categoryDTO.getCategoryDiscount() : 0.0);

        Category updatedCategory = categoryRepository.save(category);
        return convertToCategoryDTO(updatedCategory);
    }
    private CategoryDTO convertToCategoryDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setCategoryId(category.getCategoryId());
        dto.setCategoryName(category.getCategoryName());
        dto.setCategoryDiscount(category.getCategoryDiscount());
        // 檢查 products 是否為 null
        if (category.getProducts() != null) {
            List<CategoryDTO.ProductSummaryDTO> productSummaries = category.getProducts().stream()
                    .map(this::convertToProductSummaryDTO)
                    .collect(Collectors.toList());
            dto.setProducts(productSummaries);
        } else {
            // 如果 products 為 null，設置空列表
            dto.setProducts(List.of());
        }
        return dto;
    }

    private CategoryDTO.ProductSummaryDTO convertToProductSummaryDTO(Product product) {
        CategoryDTO.ProductSummaryDTO summaryDTO = new CategoryDTO.ProductSummaryDTO();
        summaryDTO.setId(product.getId());
        summaryDTO.setProductName(product.getProductName());
        summaryDTO.setImage(product.getImage());
        summaryDTO.setPrice(product.getPrice());  // 假設 price 是 Double
        return summaryDTO;
    }

}
