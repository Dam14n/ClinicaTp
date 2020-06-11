import { Component, OnInit, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-registro-paciente',
	templateUrl: './registro-paciente.component.html',
	styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent implements OnInit {
	@Input() parentForm: FormGroup;
	imagen1Form: FormControl;
	imagen2Form: FormControl;
	urlImageOne = '';
	urlImageTwo = '';
	
	constructor() {
	}

	ngOnInit() {
		this.parentForm.addControl('imagen1', new FormControl('', Validators.required));
		this.parentForm.addControl('imagen2', new FormControl('', Validators.required));
		this.imagen1Form =  this.parentForm.controls.imagen1 as FormControl;
		this.imagen2Form =  this.parentForm.controls.imagen2 as FormControl;
	}

	onSelectFile(event) {
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.onload = (readerEvent) => {
				const url = readerEvent.target.result.toString();
				if (event.target.id === "input-image2") {
					this.urlImageTwo = url;
					this.imagen2Form.setValue(url);
				} else {
					this.urlImageOne = url;
					this.imagen1Form.setValue(url);
				}
			}
		}
	}
}
