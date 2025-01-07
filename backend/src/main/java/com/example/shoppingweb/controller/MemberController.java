package com.example.shoppingweb.controller;

import com.example.shoppingweb.DTO.CouponDTO;
import com.example.shoppingweb.DTO.MemberDTO;
import com.example.shoppingweb.model.Member;
import com.example.shoppingweb.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;


import java.util.*;

@RestController
@RequestMapping("/members")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping("/register")
    public ResponseEntity<String> registerMember(@RequestBody Member member) {
        try {
            memberService.registerMember(member);
            return ResponseEntity.ok(member.getName() + "registered successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> loginData) {
        try {
            System.out.println("Login Data: " + loginData);
            String email = loginData.get("email");
            String password = loginData.get("password");
            if (email == null || password == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email and password are required.");
            }

            Member member = memberService.login(email, password);
            if (member == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid account or password.");
            }
            return ResponseEntity.ok(member);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<MemberDTO> update(@PathVariable Integer id,@RequestBody MemberDTO updateData) {
        try {
            MemberDTO updated = memberService.update(id, updateData);
            return ResponseEntity.ok(updated);
        }catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
//            System.err.println("Error updating coupon: " + e.getMessage());
//            e.printStackTrace();
//            throw e;
            return ResponseEntity.badRequest().build();
        }
    }
    // 獲取所有會員資料
    @GetMapping
    public ResponseEntity<List<MemberDTO>> getAllMembers() {
        try {
            List<MemberDTO> memberInfo = memberService.getAllMembers();
            return ResponseEntity.ok(memberInfo);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @GetMapping("/get")
    public ResponseEntity<?> getMember(@RequestParam String email) {
        try {
            Member member = memberService.findByemail(email);
            return ResponseEntity.ok(member);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member not found: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }
}