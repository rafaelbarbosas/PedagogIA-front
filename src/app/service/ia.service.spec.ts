import { TestBed } from '@angular/core/testing';

import { IaService } from './ia.service';

describe('IaBackendService', () => {
  let service: IaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // TODO - fazer testes
});
