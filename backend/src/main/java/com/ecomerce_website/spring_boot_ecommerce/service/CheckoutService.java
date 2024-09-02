package com.ecomerce_website.spring_boot_ecommerce.service;

import com.ecomerce_website.spring_boot_ecommerce.dto.Purchase;
import com.ecomerce_website.spring_boot_ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
