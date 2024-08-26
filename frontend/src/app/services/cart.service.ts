import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {}

  addToCart(theCartItem: CartItem) {
    // Check if the item already exists in the cart
    const existingCartItem = this.cartItems.find(
      (tempCartItem) => tempCartItem.id === theCartItem.id
    );

    if (existingCartItem) {
      // Increment the quantity
      existingCartItem.quantity++;
    } else {
      // Add the item to the array
      this.cartItems.push(theCartItem);
    }

    // Compute cart total price and total quantity
    this.computeCartTotals();
  }

  computeCartTotals() {
    const totalPriceValue = this.cartItems.reduce(
      (total, currentItem) =>
        total + currentItem.quantity * currentItem.unitPrice,
      0
    );

    const totalQuantityValue = this.cartItems.reduce(
      (total, currentItem) => total + currentItem.quantity,
      0
    );

    // Publish the new values to all subscribers
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // Log cart data for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart');
    this.cartItems.forEach((tempCartItem) => {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(
        `name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`
      );
    });

    console.log(
      `totalPrice: ${totalPriceValue.toFixed(
        2
      )}, totalQuantity: ${totalQuantityValue}`
    );
    console.log('---');
  }
}
