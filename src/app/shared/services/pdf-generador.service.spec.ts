import { TestBed } from '@angular/core/testing';

import { PdfGeneradorService } from './pdf-generador.service';

describe('PdfGeneradorService', () => {
  let service: PdfGeneradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfGeneradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
