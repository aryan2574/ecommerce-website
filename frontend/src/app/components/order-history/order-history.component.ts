import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { OrderHistory } from '../../common/order-history';
import { OrderHistoryService } from '../../services/order-history.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})
export class OrderHistoryComponent implements OnInit {
  orderHistoryList: OrderHistory[] = [];
  storage: Storage | undefined;
  constructor(
    private orderHistoryService: OrderHistoryService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.storage = sessionStorage;
    }

    this.handleOrderHistory();
  }

  handleOrderHistory() {
    // read the user's email address from the session storage
    const theEmail = JSON.parse(this.storage?.getItem('userEmail') as string);

    // retrieve data from the service
    this.orderHistoryService.getOrderHistory(theEmail).subscribe((data) => {
      this.orderHistoryList = data._embedded.orders;
    });
  }
}
