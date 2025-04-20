import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBusinessLayoutComponent } from './main-business-layout.component';

describe('MainBusinessLayoutComponent', () => {
  let component: MainBusinessLayoutComponent;
  let fixture: ComponentFixture<MainBusinessLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainBusinessLayoutComponent]
    });
    fixture = TestBed.createComponent(MainBusinessLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
