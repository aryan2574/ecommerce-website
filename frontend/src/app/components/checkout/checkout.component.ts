import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      }),
      shippingAddress: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        zipCode: ['', Validators.required],
      }),
      billingAddress: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        zipCode: ['', Validators.required],
      }),
      creditCard: this.formBuilder.group({
        cardType: ['', Validators.required],
        nameOnCard: ['', Validators.required],
        cardNumber: ['', Validators.required],
        securityCode: ['', Validators.required],
        expirationMonth: ['', Validators.required],
        expirationYear: ['', Validators.required],
      }),
    });
  }

  onSubmit(): void {
    if (this.checkoutFormGroup.valid) {
      console.log('Form Submitted:', this.checkoutFormGroup.value);
    } else {
      console.log('Form is invalid');
    }
  }

  copyShippingAddressToBillingAddress(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    const shippingAddress = this.checkoutFormGroup.get('shippingAddress');
    const billingAddress = this.checkoutFormGroup.get('billingAddress');

    if (isChecked && shippingAddress && billingAddress) {
      billingAddress.setValue(shippingAddress.value);
    } else if (billingAddress) {
      billingAddress.reset();
    }
  }
}
