import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
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

  countries: Country[] = [];

  shippingAdressStates: State[] = [];
  billingAdressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private checkoutFormService: CheckoutFormService
  ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
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
        nameOnCard: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{16}'),
        ]),
        securityCode: new FormControl('', [
          Validators.required,
          Validators.pattern('[0-9]{3}'),
        ]),
        expirationMonth: ['', Validators.required],
        expirationYear: ['', Validators.required],
      }),
    });

    // Get the current month
    const startMonth: number = new Date().getMonth() + 1;

    this.checkoutFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data: number[]) => {
        this.creditCardMonths = data;
      });

    this.checkoutFormService
      .getCreditCardYears()
      .subscribe((data: number[]) => {
        this.creditCardYears = data;
      });

    this.checkoutFormService.getCountries().subscribe((data: Country[]) => {
      this.countries = data;
    });
  }

  onSubmit(): void {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }

    if (this.checkoutFormGroup.valid) {
      console.log('Form Submitted:', this.checkoutFormGroup.value);
    } else {
      console.log('Form is invalid');
    }
  }

  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email');
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

    let startMonth: number;

    if (new Date().getFullYear() === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.checkoutFormService
      .getCreditCardMonths(startMonth)
      .subscribe((data: number[]) => {
        this.creditCardMonths = data;
      });
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;

    this.checkoutFormService
      .getStates(countryCode)
      .subscribe((data: State[]) => {
        if (formGroupName === 'shippingAddress') {
          this.shippingAdressStates = data;
        } else {
          this.billingAdressStates = data;
        }

        formGroup?.get('state')?.setValue(data[0]?.name || '');
      });
  }
}
