import { Injectable } from '@angular/core';

declare let utag: any;

@Injectable({
  providedIn: 'root',
})
export class TealiumTrackingService {
  trackEvent(eventName: string, data: any) {
    if (typeof utag !== 'undefined') {
      utag.link({
        event_name: eventName,
        ...data,
      });
    }
  }

  trackPageView(data: any) {
    if (typeof utag !== 'undefined') {
      utag.view(data);
    }
  }
}
