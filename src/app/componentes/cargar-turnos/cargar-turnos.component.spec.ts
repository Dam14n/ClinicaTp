import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarTurnosComponent } from './cargar-turnos.component';

describe('CargarTurnosComponent', () => {
  let component: CargarTurnosComponent;
  let fixture: ComponentFixture<CargarTurnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarTurnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
