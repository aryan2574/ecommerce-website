import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { ProductService } from './services/product.service';
import { OktaAuthModule } from '@okta/okta-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    CartStatusComponent,
    LoginStatusComponent,
  ],
  providers: [ProductService, OktaAuthModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
}
