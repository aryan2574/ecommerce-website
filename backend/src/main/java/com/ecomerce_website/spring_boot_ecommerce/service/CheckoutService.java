package com.ecomerce_website.spring_boot_ecommerce.service;

import com.ecomerce_website.spring_boot_ecommerce.dao.PaymentInfo;
import com.ecomerce_website.spring_boot_ecommerce.dto.Purchase;
import com.ecomerce_website.spring_boot_ecommerce.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
