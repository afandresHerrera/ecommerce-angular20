import { TestBed } from '@angular/core/testing';

import { ProductApiService } from './product-api.service';
import { provideHttpClient } from '@angular/common/http';

describe('ProductApiService', () => {
  let service: ProductApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    })
    service = TestBed.inject(ProductApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
