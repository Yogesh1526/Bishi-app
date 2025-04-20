import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupLayoutComponent } from './group-layout.component';

describe('GroupLayoutComponent', () => {
  let component: GroupLayoutComponent;
  let fixture: ComponentFixture<GroupLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupLayoutComponent]
    });
    fixture = TestBed.createComponent(GroupLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
