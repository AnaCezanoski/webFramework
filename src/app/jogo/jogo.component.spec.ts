import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JogoComponent } from './jogo.component';

describe('JogoComponent', () => {
  let component: JogoComponent;
  let fixture: ComponentFixture<JogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
