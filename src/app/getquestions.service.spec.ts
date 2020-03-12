import { TestBed } from '@angular/core/testing';

import { GetquestionsService } from './getquestions.service';

describe('GetquestionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetquestionsService = TestBed.get(GetquestionsService);
    expect(service).toBeTruthy();
  });
});
