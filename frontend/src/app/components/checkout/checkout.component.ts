import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CheckoutFormService } from '../../services/checkout-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';

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

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  currentYear: number = new Date().getFullYear();

  countries: Country[] = [];

  shippingAdressStates: State[] = [];
  billingAdressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private checkoutFromService: CheckoutFormService
  ) {}

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

    const startMonth: number = new Date().getMonth() + 1;

    this.checkoutFromService
      .getCreditCardMonths(startMonth)
      .subscribe((data: any) => {
        this.creditCardMonths = data;
      });

    this.checkoutFromService.getCreditCardYears().subscribe((data: any) => {
      this.creditCardYears = data;
    });

    this.checkoutFromService.getCountries().subscribe((data: any) => {
      this.countries = data;
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

      this.billingAdressStates = this.shippingAdressStates;
    } else if (billingAddress) {
      billingAddress.reset();
      this.billingAdressStates = [];
    }
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const selectedYear: number = Number(
      creditCardFormGroup?.value.expirationYear
    );

    // If the current year equals to the selected year, then start with the current month

    let startMonth: number;

    if (this.currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.checkoutFromService
      .getCreditCardMonths(startMonth)
      .subscribe((data: any) => {
        this.creditCardMonths = data;
      });
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;

    this.checkoutFromService.getStates(countryCode).subscribe((data: any) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAdressStates = data;
      } else {
        this.billingAdressStates = data;
      }

      formGroup?.get('state')?.setValue(data[0].name);
    });
  }
}
