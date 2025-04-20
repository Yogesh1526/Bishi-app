import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTransationComponent } from './group-transation.component';

describe('GroupTransationComponent', () => {
  let component: GroupTransationComponent;
  let fixture: ComponentFixture<GroupTransationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupTransationComponent]
    });
    fixture = TestBed.createComponent(GroupTransationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
