import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logeando = false;
  progresoDeAncho: string;
  intentoHacerLogin = false;
  showInvalidLogin = false;

  clase = 'progress-bar progress-bar-info progress-bar-striped ';
  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    clave: new FormControl('', Validators.required)
  });
  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/Home']);
    }
  }

  get form() {
    return this.loginForm.controls;
  }

  entrar() {
    if (!this.loginForm.invalid) {
      this.intentoHacerLogin = true;
      const usuario = this.loginForm.value.usuario;
      const clave = this.loginForm.value.clave;
      this.authService.login(usuario, clave, () => { this.router.navigate(['/Home']); }, this.onLoginError);
    }
  }

  entrarComoAdmin() {
    this.loginForm.controls.usuario.setValue('admin');
    this.loginForm.controls.clave.setValue('admin');
    this.entrar();
  }

  onLoginError = () => {
    this.showInvalidLogin = true;
  }

}
