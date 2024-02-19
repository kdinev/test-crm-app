import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CRMAppService } from './crmapp.service';

describe('CRMAppService', () => {
  let service: CRMAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CRMAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
