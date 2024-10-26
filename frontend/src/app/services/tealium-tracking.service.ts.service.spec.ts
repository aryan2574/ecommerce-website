import { TestBed } from '@angular/core/testing';

import { TealiumTrackingServiceTsService } from './tealium-tracking.service.ts.service';

describe('TealiumTrackingServiceTsService', () => {
  let service: TealiumTrackingServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TealiumTrackingServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
