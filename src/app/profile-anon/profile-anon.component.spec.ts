import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAnonComponent } from './profile-anon.component';

describe('ProfileAnonComponent', () => {
  let component: ProfileAnonComponent;
  let fixture: ComponentFixture<ProfileAnonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAnonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAnonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
