import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScamsLearningComponent } from './scams-learning.component';

describe('ScamsLearningComponent', () => {
  let component: ScamsLearningComponent;
  let fixture: ComponentFixture<ScamsLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScamsLearningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScamsLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
