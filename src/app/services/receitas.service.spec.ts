import { TestBed } from '@angular/core/testing';

import { CadastrarReceitaService } from './receitas.service';

describe('CadastrarReceitaService', () => {
  let service: CadastrarReceitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastrarReceitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
