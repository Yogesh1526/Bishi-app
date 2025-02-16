import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpdetailsComponent } from './grpdetails.component';

describe('GrpdetailsComponent', () => {
  let component: GrpdetailsComponent;
  let fixture: ComponentFixture<GrpdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GrpdetailsComponent]
    });
    fixture = TestBed.createComponent(GrpdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
