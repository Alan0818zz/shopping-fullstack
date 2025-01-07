package com.example.shoppingweb.controller;

import com.example.shoppingweb.DTO.OrderWithLinesRequest;
import com.example.shoppingweb.model.Order;
import com.example.shoppingweb.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/add")
    public ResponseEntity<String> createOrder(@RequestBody OrderWithLinesRequest request) {
        try {
            orderService.createOrder(request.order(), request.orderLines());
            return ResponseEntity.ok("Order and OrderLines created successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating order: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateOrder(
            @RequestParam Integer orderId,
            @RequestBody OrderWithLinesRequest request) {
        try {
            orderService.updateOrder(orderId, request.order(), request.orderLines());
            return ResponseEntity.ok("Order and OrderLines updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating order: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteOrder(@RequestParam Integer orderId) {
        try {
            orderService.deleteOrder(orderId);
            return ResponseEntity.ok("Order deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting order: " + e.getMessage());
        }
    }

    @GetMapping("/memberId")
    public ResponseEntity<?> getOrdersByUserId(@RequestParam Integer userId) {
        try {
            List<Order> orders = orderService.getOrdersByUserId(userId);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching orders: " + e.getMessage());
        }
    }
    @GetMapping
    public ResponseEntity<?> getAllOrders() {
        try {
            List<Map<String, Object>> orders = orderService.getAllOrdersWithDetails();
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching orders: " + e.getMessage());
        }
    }
}