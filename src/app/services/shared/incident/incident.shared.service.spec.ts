import { TestBed } from '@angular/core/testing';

import { IncidentSharedService } from './incident.shared.service';

describe('IncidentSharedService', () => {
  let service: IncidentSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncidentSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
