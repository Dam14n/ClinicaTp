import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { firestore } from 'firebase';
import { Admin } from 'src/app/clases/admin';
import { Paciente } from 'src/app/clases/paciente';
import { Profesional } from 'src/app/clases/profesional';
import { Usuario } from 'src/app/clases/usuario';
import { TipoUsuario } from 'src/app/enum/tipo-usuario.enum';
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
	styleUrls: ['./registro.component.css'],
	animations: [
		trigger('moveRightToLeft', [
			transition(':enter', [
				style({ transform: 'translateX(200px)' }),
				animate('500ms', style({ transform: 'translateX(0px)' })),
			]),
			// transition(':leave', [
			// 	animate('100ms', style({ transform: 'translateY(200px)' }))
			// ])
		])
	]
})
export class RegistroComponent implements OnInit {
	@Input() showAdmin = false;
	signUpForm = new FormGroup({
		nombre: new FormControl('', Validators.required),
		apellido: new FormControl('', Validators.required),
		clave: new FormControl('', Validators.required),
		confirmarClave: new FormControl('', Validators.required),
		email: new FormControl('', [Validators.required, Validators.email]),
		tipo: new FormControl('', Validators.required),
		verificarRecaptcha: new FormControl(true),
		recaptcha: new FormControl(null, Validators.required)
	}, this.validarClaves);

	hideClave = true;
	hideConfirmarClave = true;
	tiposUsuario = TipoUsuario;
	matcher = new MyErrorStateMatcher();
	tipoUsuario: TipoUsuario;

	esRegistroAdmin = false;
	esRegistroPaciente = false;
	esRegistroProfesional = false;

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
		let usuario: Usuario;
		switch (this.tipoUsuario) {
			case this.tiposUsuario.ADMIN:
				usuario = (usuario as Admin) = {
					nombre: this.signUpForm.controls.nombre.value,
					apellido: this.signUpForm.controls.apellido.value,
					clave: this.signUpForm.controls.clave.value,
					email: this.signUpForm.controls.email.value,
					tipo: this.tiposUsuario.ADMIN,
					estaAprobado: true,
					creation: firestore.Timestamp.now()
				}
				break;
			case this.tiposUsuario.PACIENTE:
				usuario = (usuario as Paciente) = {
					nombre: this.signUpForm.controls.nombre.value,
					apellido: this.signUpForm.controls.apellido.value,
					clave: this.signUpForm.controls.clave.value,
					email: this.signUpForm.controls.email.value,
					imagen1: this.signUpForm.controls.imagen1.value,
					imagen2: this.signUpForm.controls.imagen2.value,
					tipo: this.tiposUsuario.PACIENTE,
					estaAprobado: true,
					creation: firestore.Timestamp.now()
				}
				break;
			case this.tiposUsuario.PROFESIONAL:
				usuario = (usuario as Profesional) = {
					nombre: this.signUpForm.controls.nombre.value,
					apellido: this.signUpForm.controls.apellido.value,
					clave: this.signUpForm.controls.clave.value,
					email: this.signUpForm.controls.email.value,
					especialidades: this.signUpForm.controls.especialidades.value,
					tipo: this.tiposUsuario.PROFESIONAL,
					estaAprobado: false,
					creation: firestore.Timestamp.now(),
					estaConfigurado: false
				}
				break;
		}
		this.authService.usuarioYaExiste(usuario, () => this.mostrarError(), () => this.realizarRegistro(usuario));
	}

	// TODO mostrar error en usuario repetido
	mostrarError = () => {
		console.log("Usuario ya existente!!!!");
	}

	private realizarRegistro = (usuario: Usuario) => {
		this.authService.registrarUsuario(usuario);
		this.router.navigate(['']);
	}

	onSelectionChange = ({ value }) => {
		switch (<any>TipoUsuario[value]) {
			case this.tiposUsuario.ADMIN:
				this.esRegistroPaciente = false;
				this.esRegistroProfesional = false;
				this.esRegistroAdmin = true;
				this.tipoUsuario = this.tiposUsuario.ADMIN;
				break;
			case this.tiposUsuario.PACIENTE:
				this.esRegistroPaciente = true;
				this.esRegistroProfesional = false;
				this.esRegistroAdmin = false;
				this.tipoUsuario = this.tiposUsuario.PACIENTE;
				break;
			case this.tiposUsuario.PROFESIONAL:
				this.esRegistroPaciente = false;
				this.esRegistroProfesional = true;
				this.esRegistroAdmin = false;
				this.tipoUsuario = this.tiposUsuario.PROFESIONAL;
				break;
			default:
				this.esRegistroPaciente = false;
				this.esRegistroProfesional = false;
				this.esRegistroAdmin = false;
				this.tipoUsuario = undefined;
				break;
		}
		delete this.signUpForm.controls.especialidades;
		delete this.signUpForm.controls.imagen1;
		delete this.signUpForm.controls.imagen2;
	}

	onVerficarRecaptcha = () => {
		let recaptcha = this.signUpForm.controls.recaptcha;
		this.signUpForm.controls.verificarRecaptcha.value ? recaptcha.setValidators(Validators.required) : recaptcha.clearValidators();
		this.signUpForm.controls.recaptcha.updateValueAndValidity();
	}

	resolved(captchaResponse: string, res) {
		console.log(`Resolved response token: ${captchaResponse}`);
	  }
}
