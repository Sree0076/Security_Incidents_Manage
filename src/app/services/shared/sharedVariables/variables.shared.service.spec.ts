import { TestBed } from '@angular/core/testing';

import { VariablesSharedService } from './variables.shared.service';

describe('VariablesSharedService', () => {
  let service: VariablesSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariablesSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
