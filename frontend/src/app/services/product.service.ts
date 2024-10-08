import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { environment } from '../../environments/environment';

interface GetResponse<T> {
  _embedded: {
    [key: string]: T[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly BASE_URL = environment.ayushEcommerceApiUrl;
  private readonly PRODUCTS_URL = `${this.BASE_URL}/product`;
  private readonly PRODUCT_CATEGORY_URL = `${this.BASE_URL}/product-category`;

  constructor(private httpClient: HttpClient) {}

  private getItems<T>(url: string, key: string): Observable<T[]> {
    return this.httpClient
      .get<GetResponse<T>>(url)
      .pipe(map((response) => response._embedded[key]));
  }

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.PRODUCTS_URL}/search/findByCategoryId?id=${categoryId}`;
    return this.getItems<Product>(searchUrl, 'product');
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.PRODUCTS_URL}/search/findByNameContaining?name=${keyword}`;
    return this.getItems<Product>(searchUrl, 'product');
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.getItems<ProductCategory>(
      this.PRODUCT_CATEGORY_URL,
      'productCategory'
    );
  }

  getProduct(productId: number): Observable<Product> {
    const searchURL = `${this.PRODUCTS_URL}/${productId}`;
    return this.httpClient.get<Product>(searchURL);
  }

  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId: number
  ): Observable<Product> {
    const searchUrl =
      `${this.PRODUCTS_URL}` +
      `/search/findByCategoryId?id=${theCategoryId}` +
      `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<Product>(searchUrl);
  }

  searchProductsPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: string
  ): Observable<Product> {
    const searchUrl =
      `${this.PRODUCTS_URL}` +
      `/search/findByNameContaining?name=${theKeyword}` +
      `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<Product>(searchUrl);
  }
}
