/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CkPasswordService } from './CkPassword.service';

describe('Service: CkPassword', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CkPasswordService]
    });
  });

  it('should ...', inject([CkPasswordService], (service: CkPasswordService) => {
    expect(service).toBeTruthy();
  }));
});
