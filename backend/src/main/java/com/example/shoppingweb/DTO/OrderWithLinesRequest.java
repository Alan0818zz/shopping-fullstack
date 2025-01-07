package com.example.shoppingweb.DTO;

import com.example.shoppingweb.model.Order;
import com.example.shoppingweb.model.OrderLine;

import java.util.List;

public record OrderWithLinesRequest(
        Order order,
        List<OrderLine> orderLines
) {}