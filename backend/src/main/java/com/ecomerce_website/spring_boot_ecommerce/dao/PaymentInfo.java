package com.ecomerce_website.spring_boot_ecommerce.dao;

import lombok.Data;

@Data
public class PaymentInfo {

    private int amount;
    private String currency;
}
