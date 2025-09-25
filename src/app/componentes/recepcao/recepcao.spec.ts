import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recepcao } from './recepcao';

describe('Recepcao', () => {
  let component: Recepcao;
  let fixture: ComponentFixture<Recepcao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Recepcao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recepcao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
