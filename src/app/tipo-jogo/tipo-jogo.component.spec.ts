import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoJogoComponent } from './tipo-jogo.component';

describe('TipoJogoComponent', () => {
  let component: TipoJogoComponent;
  let fixture: ComponentFixture<TipoJogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipoJogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoJogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
