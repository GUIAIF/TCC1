import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anexo } from './anexo';

describe('Anexo', () => {
  let component: Anexo;
  let fixture: ComponentFixture<Anexo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Anexo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Anexo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
