import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  storage: Storage | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // this.storage = sessionStorage;
      this.storage = localStorage;
      const data = this.storage
        ? (JSON.parse(
            this.storage.getItem('cartItems') as string
          ) as CartItem[])
        : [];

      if (data) {
        this.cartItems = data;
        this.computeCartTotals();
      }
    }
  }

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

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    // Get index of item in the array
    const itemIndex = this.cartItems.findIndex(
      (tempCartItem) => tempCartItem.id === theCartItem.id
    );

    // If found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      // Compute cart total price and total quantity
      this.computeCartTotals();
    }
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

    // Persist cart data
    this.persistCartItems();
  }

  persistCartItems() {
    this.storage?.setItem('cartItems', JSON.stringify(this.cartItems));
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
