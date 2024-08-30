import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansLearningComponent } from './loans-learning.component';

describe('LoansLearningComponent', () => {
  let component: LoansLearningComponent;
  let fixture: ComponentFixture<LoansLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoansLearningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoansLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
