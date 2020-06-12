import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMasMenuComponent } from './registro-mas-menu.component';

describe('RegistroMasMenuComponent', () => {
  let component: RegistroMasMenuComponent;
  let fixture: ComponentFixture<RegistroMasMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroMasMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroMasMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
