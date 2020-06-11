import { transition, trigger, style, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
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
		usuario: new FormControl('', Validators.required),
		clave: new FormControl('', Validators.required),
		confirmarClave: new FormControl('', Validators.required),
		email: new FormControl('', [Validators.required, Validators.email]),
		tipo: new FormControl('', Validators.required)
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
		const usuario = this.signUpForm.controls.usuario.value;
		const clave = this.signUpForm.controls.clave.value;
		this.authService.registrarUsuario(usuario, clave);
		this.router.navigate(['']);
	}

	onSelectionChange = ({ value }) => {
		switch (<any>TipoUsuario[value]) {
			case this.tiposUsuario.ADMIN:
				this.esRegistroPaciente = false;
				this.esRegistroProfesional = false;
				this.esRegistroAdmin = true;
				break;
			case this.tiposUsuario.PACIENTE:
				this.esRegistroPaciente = true;
				this.esRegistroProfesional = false;
				this.esRegistroAdmin = false;
				break;
			case this.tiposUsuario.PROFESIONAL:
				this.esRegistroPaciente = false;
				this.esRegistroProfesional = true;
				this.esRegistroAdmin = false;
				break;
			default:
				this.esRegistroPaciente = false;
				this.esRegistroProfesional = false;
				this.esRegistroAdmin = false;
				break;
		}
	}

}
