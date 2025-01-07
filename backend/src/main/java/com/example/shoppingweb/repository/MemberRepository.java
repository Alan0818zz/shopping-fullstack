package com.example.shoppingweb.repository;
import org.springframework.data.jpa.repository.Query;
import com.example.shoppingweb.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    @Query("SELECT m FROM Member m WHERE m.email = :email AND m.password = :password")
    Optional<Member> findByEmailAndPassword(@Param("email") String email, @Param("password") String password);

    Optional<Member> findByEmail(String email);
}
