import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepassewordComponent } from './changepasseword.component';

describe('ChangepassewordComponent', () => {
  let component: ChangepassewordComponent;
  let fixture: ComponentFixture<ChangepassewordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangepassewordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepassewordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
