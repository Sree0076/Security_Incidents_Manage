import { TestBed } from '@angular/core/testing';

import { ForwardServiceService } from './forward.service.service';

describe('ForwarServiceService', () => {
  let service: ForwardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForwardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
