import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionProfesionalComponent } from './configuracion-profesional.component';

describe('ConfiguracionProfesionalComponent', () => {
  let component: ConfiguracionProfesionalComponent;
  let fixture: ComponentFixture<ConfiguracionProfesionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionProfesionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionProfesionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
