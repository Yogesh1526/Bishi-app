import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanApplicantComponent } from './loan-applicant.component';

describe('LoanApplicantComponent', () => {
  let component: LoanApplicantComponent;
  let fixture: ComponentFixture<LoanApplicantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanApplicantComponent]
    });
    fixture = TestBed.createComponent(LoanApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
