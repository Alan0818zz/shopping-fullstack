package com.example.shoppingweb.service;

import com.example.shoppingweb.model.Order;
import com.example.shoppingweb.model.OrderLine;
import com.example.shoppingweb.model.Product;
import com.example.shoppingweb.repository.OrderLineRepository;
import com.example.shoppingweb.repository.OrderRepository;
import com.example.shoppingweb.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private OrderLineRepository orderLineService;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderLineService orderLineRepository;
    public void createOrder(Order order, List<OrderLine> orderLines) {
        if (order.getMember() == null || order.getAddress() == null) {
            throw new IllegalArgumentException("Member and Address are required fields.");
        }

        order.setOrderDate(LocalDateTime.now());
        order.setDeliveryDate(LocalDateTime.now().plusDays(3));

        Order savedOrder = orderRepository.save(order);
        for (OrderLine line : orderLines) {
            line.setOrder(savedOrder);
        }
        orderLineService.saveAll(orderLines);
    }
    public void updateOrder(Integer orderId, Order updatedOrder, List<OrderLine> updatedOrderLines) {
        Order existingOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found."));

        if (updatedOrder.getAddress() != null) {
            existingOrder.setAddress(updatedOrder.getAddress());
        }
        if (updatedOrder.getPaymentMethod() != null) {
            existingOrder.setPaymentMethod(updatedOrder.getPaymentMethod());
        }
        if (updatedOrder.getOrderStatus() != null) {
            existingOrder.setOrderStatus(updatedOrder.getOrderStatus());
        }
        orderRepository.save(existingOrder);
        List<OrderLine> existingOrderLines = orderLineService.findByOrderId(orderId);
        List<OrderLine> toDelete = existingOrderLines.stream()
                .filter(line -> updatedOrderLines.stream()
                        .noneMatch(updatedLine -> updatedLine.getOrderLineId() == line.getOrderLineId()))
                .toList();
        orderLineService.deleteAll(toDelete);

        for (OrderLine updatedLine : updatedOrderLines) {
            updatedLine.setOrder(existingOrder);
            orderLineService.save(updatedLine);
        }
    }
    public void deleteOrder(Integer orderId) {
        Order existingOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found."));

        List<OrderLine> orderLines = orderLineService.findByOrderId(orderId);
        if (!orderLines.isEmpty()) {
            orderLineService.deleteAll(orderLines);
        }
        orderRepository.delete(existingOrder);
    }
    public List<Order> getOrdersByUserId(Integer userId) {
        return orderRepository.findByMemberId(userId);
    }
    public List<Map<String, Object>> getAllOrdersWithDetails() {
        List<Order> orders = orderRepository.findAll();  // 改為獲取所有訂單
        return orders.stream().map(order -> {
            List<Map<String, Object>> orderLines = orderLineRepository.findByOrderId(order.getId())
                    .stream()
                    .map(orderLine -> {
                        Product product = productRepository.findById(orderLine.getProduct().getId()).orElse(null);
                        Map<String, Object> lineInfo = new HashMap<>();
                        lineInfo.put("productName", product != null ? product.getProductName() : null);
                        lineInfo.put("quantity", orderLine.getQuantity());
                        lineInfo.put("note", orderLine.getNote());
                        return lineInfo;
                    })
                    .collect(Collectors.toList());

            Map<String, Object> orderInfo = new HashMap<>();
            orderInfo.put("orderId", order.getId());
            orderInfo.put("member", order.getMember() != null ? order.getMember().getName() : null);
            orderInfo.put("orderDate", order.getOrderDate());
            orderInfo.put("deliveryDate", order.getDeliveryDate());
            orderInfo.put("shippingDate", order.getShippingDate());
            orderInfo.put("orderStatus", order.getOrderStatus());
            orderInfo.put("paymentMethod", order.getPaymentMethod());
            orderInfo.put("totalCost", order.getTotalCost());
            orderInfo.put("address", order.getAddress());
            orderInfo.put("note", order.getNote());
            orderInfo.put("orderLines", orderLines);

            return orderInfo;
        }).collect(Collectors.toList());
    }
}
