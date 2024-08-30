import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditLearningComponent } from './credit-learning.component';

describe('CreditLearningComponent', () => {
  let component: CreditLearningComponent;
  let fixture: ComponentFixture<CreditLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreditLearningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
