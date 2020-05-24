import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  signUpForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    clave: new FormControl('', Validators.required),
    confirmarClave: new FormControl('', Validators.required)
  }, this.validarClaves);
  hideClave = true;
  hideConfirmarClave = true;

  matcher = new MyErrorStateMatcher();
  constructor(
    private authService: AuthService,
    private router: Router) {
  }
  ngOnInit() {
  }

  validarClaves(group: FormGroup) {
    const clave = group.controls.clave.value;
    const confirmarClave = group.controls.confirmarClave.value;
    return clave === confirmarClave ? null : { notSame: true };
  }

  cancelar() {
    this.router.navigate(['']);
  }

  registrarUsuario() {
    const usuario = this.signUpForm.controls.usuario.value;
    const clave = this.signUpForm.controls.clave.value;
    this.authService.registrarUsuario(usuario, clave);
    this.router.navigate(['']);
  }

}
