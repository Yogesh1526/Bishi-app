import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainbusinessComponent } from './mainbusiness.component';

describe('MainbusinessComponent', () => {
  let component: MainbusinessComponent;
  let fixture: ComponentFixture<MainbusinessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainbusinessComponent]
    });
    fixture = TestBed.createComponent(MainbusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
