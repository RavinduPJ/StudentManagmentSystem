import { TestBed } from '@angular/core/testing';

import { FirstTabService } from './first-tab.service';

describe('FirstTabService', () => {
  let service: FirstTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirstTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
