/// <reference types="@angular/localize" />
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import '@angular/compiler';

import myAppConfig from './app/config/my-app-config';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './app/services/auth-interceptor.service';

const oktaConfig = myAppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(OktaAuthModule),
    { provide: OKTA_CONFIG, useValue: oktaAuth },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
}).catch((err) => console.error(err));
