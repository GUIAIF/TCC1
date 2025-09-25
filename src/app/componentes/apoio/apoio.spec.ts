import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Apoio } from './apoio';

describe('Apoio', () => {
  let component: Apoio;
  let fixture: ComponentFixture<Apoio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Apoio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Apoio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
