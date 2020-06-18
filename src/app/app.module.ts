import { NgModule } from '@angular/core';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import exporting from 'highcharts/modules/exporting.src.js';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { AppComponent } from './app.component';
import { AtenderComponent } from './componentes/atender/atender.component';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { CargarTurnosComponent } from './componentes/cargar-turnos/cargar-turnos.component';
import { ConfiguracionProfesionalComponent } from './componentes/configuracion-profesional/configuracion-profesional.component';
import { ErrorComponent } from './componentes/error/error.component';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
import { LoginComponent } from './componentes/login/login.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { RegistroAdminComponent } from './componentes/registro-admin/registro-admin.component';
import { RegistroMasMenuComponent } from './componentes/registro-mas-menu/registro-mas-menu.component';
import { RegistroPacienteComponent } from './componentes/registro-paciente/registro-paciente.component';
import { RegistroProfesionalComponent } from './componentes/registro-profesional/registro-profesional.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { VerTurnosComponent } from './componentes/ver-turnos/ver-turnos.component';
import { VerUsuariosComponent } from './componentes/ver-usuarios/ver-usuarios.component';
import { AngularFirebaseModule } from './modulos/angular-firebase/angular-firebase.module';
import { AngularMaterialModule } from './modulos/angular-material/angular-material.module';
import { RuteoModule } from './modulos/ruteo/ruteo.module';
import { DateFormatPipe } from './pipe/date-format.pipe';
import { EnumToArrayPipe } from './pipe/enum-to-array.pipe';
import { ExcludeFilterPipe } from './pipe/exclude-filter.pipe';
export function highchartModules() {
  return [exporting]
}
@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    LoginComponent,
    ErrorComponent,
    EnumToArrayPipe,
    ExcludeFilterPipe,
    RegistroAdminComponent,
    RegistroPacienteComponent,
    RegistroProfesionalComponent,
    MenuComponent,
    BienvenidoComponent,
    RegistroMasMenuComponent,
    VerTurnosComponent,
    CargarTurnosComponent,
    VerUsuariosComponent,
    ConfiguracionProfesionalComponent,
    AtenderComponent,
    EstadisticasComponent,
    DateFormatPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RuteoModule,
    MatNativeDateModule,
    AngularMaterialModule,
    AngularFireStorageModule,
    AngularFirebaseModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ChartModule
  ],
  providers: [EnumToArrayPipe, ExcludeFilterPipe, DateFormatPipe, { provide: HIGHCHARTS_MODULES, useFactory: highchartModules }],
  bootstrap: [AppComponent]
})
export class AppModule { }
