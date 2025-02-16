import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWinnersComponent } from './all-winners.component';

describe('AllWinnersComponent', () => {
  let component: AllWinnersComponent;
  let fixture: ComponentFixture<AllWinnersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllWinnersComponent]
    });
    fixture = TestBed.createComponent(AllWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
