import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkCalculatorPageComponent } from './mark-calculator-page.component';

describe('MarkCalculatorPageComponent', () => {
  let component: MarkCalculatorPageComponent;
  let fixture: ComponentFixture<MarkCalculatorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkCalculatorPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkCalculatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
