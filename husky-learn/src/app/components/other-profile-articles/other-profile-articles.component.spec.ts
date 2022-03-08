import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherProfileArticlesComponent } from './other-profile-articles.component';

describe('OtherProfileArticlesComponent', () => {
  let component: OtherProfileArticlesComponent;
  let fixture: ComponentFixture<OtherProfileArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherProfileArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherProfileArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
