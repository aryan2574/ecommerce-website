import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list-table.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  errorMessage: string = '';
  
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts(): void {
    this.productService.getProductList().subscribe(data => {
      this.products = data;
    });
  }
}
