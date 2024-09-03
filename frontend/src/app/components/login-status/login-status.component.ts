import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  OKTA_AUTH,
  OktaAuthModule,
  OktaAuthStateService,
} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css',
  providers: [OktaAuthModule],
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;
  userFullName: string = '';

  constructor(
    private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {}

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe((result) => {
      this.isAuthenticated = result.isAuthenticated!;
      this.getUserDetails();
    });
  }

  getUserDetails() {
    if (this.isAuthenticated) {
      // Fetch the logged in user details (user's claims)

      // user full name is exposed as a property name
      this.oktaAuth.getUser().then((res) => {
        this.userFullName = res.name as string;
      });
    }
  }

  logout() {
    // Terminates the session with Okta and removes the current tokens
    this.oktaAuth.signOut();
  }
}
