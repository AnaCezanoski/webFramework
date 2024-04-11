import { TestBed } from '@angular/core/testing';

import { TipoJogoService } from './tipo-jogo.service';

describe('TipoJogoService', () => {
  let service: TipoJogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoJogoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
