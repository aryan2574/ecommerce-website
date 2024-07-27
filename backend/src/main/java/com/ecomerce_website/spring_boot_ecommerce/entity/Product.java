package com.ecomerce_website.spring_boot_ecommerce.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.util.Date;

// Entity class for Product - Entities are the tables in the database
// @Data is a Lombok annotation to create all the getters, setters, equals, hash, and toString methods, based on the fields
// @Entity is a JPA annotation to make this class ready for JPA
// @Table is a JPA annotation to specify the table to be used for this entity
// Each field is a column in the table

@Entity
@Table(name = "product")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ProductCategory category;

    @Column(name = "sku")
    private String sku;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "unitPrice")
    private BigDecimal unitPrice;

    @Column(name = "imageUrl")
    private String imageUrl;

    @Column(name = "active")
    private boolean active;

    @Column(name = "unitsInStock")
    private int unitsInStock;

    @Column(name = "dateCreated")
    @CreationTimestamp
    private Date dataCreated;

    @Column(name = "lastUpdated")
    @UpdateTimestamp
    private Date lastUpdated;
}
