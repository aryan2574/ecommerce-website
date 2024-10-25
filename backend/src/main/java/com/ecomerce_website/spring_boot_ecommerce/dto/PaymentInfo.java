package com.ecomerce_website.spring_boot_ecommerce.dto;

import lombok.Data;

@Data
public class PaymentInfo {

    private int amount;
    private String currency;
    private String stripeEmail;
    private String stripeToken;
    private String stripeTokenType;
    private String stripeBillingName;
    private String stripeBillingAddressCountry;
    private String stripeBillingAddressCountryCode;
    private String stripeBillingAddressZip;
    private String stripeBillingAddressLine1;

    public PaymentInfo() {
    }

    public PaymentInfo(int amount, String currency, String stripeEmail, String stripeToken, String stripeTokenType, String stripeBillingName, String stripeBillingAddressCountry, String stripeBillingAddressCountryCode, String stripeBillingAddressZip, String stripeBillingAddressLine1) {
        this.amount = amount;
        this.currency = currency;
        this.stripeEmail = stripeEmail;
        this.stripeToken = stripeToken;
        this.stripeTokenType = stripeTokenType;
        this.stripeBillingName = stripeBillingName;
        this.stripeBillingAddressCountry = stripeBillingAddressCountry;
        this.stripeBillingAddressCountryCode = stripeBillingAddressCountryCode;
        this.stripeBillingAddressZip = stripeBillingAddressZip;
        this.stripeBillingAddressLine1 = stripeBillingAddressLine1;
    }

    public String getEmail() {
        return stripeEmail;
    }

    public String getDescription() {
        return stripeBillingName;
    }
}
