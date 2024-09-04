package com.ecomerce_website.spring_boot_ecommerce.dao;

import com.ecomerce_website.spring_boot_ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

// Repository interface for Product - Spring data rest automatically exposes endpoints for CRUD operations on the entity
// interfaces that provide methods for accessing and manipulating data in the database. By extending interfaces like JpaRepository,
// they inherit a wide range of methods for CRUD operations.

@RepositoryRestResource(collectionResourceRel = "product", path = "product")
public interface ProductRepository extends JpaRepository<Product, Long> {
    //    Spring data rest automatically exposes endpoints for CRUD operations on the entity - localhost:8080/api/products/search/findByCategoryId?id=1
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);
}
