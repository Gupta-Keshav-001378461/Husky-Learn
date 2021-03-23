import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatErrorComponent } from './format-error.component';

describe('FormatErrorComponent', () => {
  let component: FormatErrorComponent;
  let fixture: ComponentFixture<FormatErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormatErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
