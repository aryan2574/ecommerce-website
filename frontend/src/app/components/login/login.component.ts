import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { OKTA_AUTH, OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import myAppConfig from '../../config/my-app-config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [OktaAuthModule],
})
export class LoginComponent implements OnInit {
  oktaSignIn: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {
    if (isPlatformBrowser(this.platformId)) {
      // Only initialize OktaSignIn if running in the browser
      import('@okta/okta-signin-widget').then((OktaSignIn) => {
        this.oktaSignIn = new OktaSignIn.default({
          logo: 'assets/images/logo.png',
          baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
          clientId: myAppConfig.oidc.clientId,
          redirectUri: myAppConfig.oidc.redirectUri,
          authParams: {
            pkce: true,
            issuer: myAppConfig.oidc.issuer,
            scopes: myAppConfig.oidc.scopes,
          },
        });
      });
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && this.oktaSignIn) {
      this.oktaSignIn.remove();

      this.oktaSignIn.renderEl(
        { el: '#okta-sign-in-widget' },
        (response: any) => {
          if (response.status === 'SUCCESS') {
            this.oktaAuth.signInWithRedirect();
          }
        },
        (error: any) => {
          throw error;
        }
      );
    }
  }
}
