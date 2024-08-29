import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipLearningComponent } from './scholarship-learning.component';

describe('ScholarshipLearningComponent', () => {
  let component: ScholarshipLearningComponent;
  let fixture: ComponentFixture<ScholarshipLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScholarshipLearningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScholarshipLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
