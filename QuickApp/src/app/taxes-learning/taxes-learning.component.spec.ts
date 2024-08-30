import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesLearningComponent } from './taxes-learning.component';

describe('TaxesLearningComponent', () => {
  let component: TaxesLearningComponent;
  let fixture: ComponentFixture<TaxesLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaxesLearningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaxesLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
