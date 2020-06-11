import { Component, OnInit, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-registro-paciente',
	templateUrl: './registro-paciente.component.html',
	styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent implements OnInit {
	@Input() parentForm: FormGroup;
	urlImageOne = '';
	urlImageTwo = '';
	
	constructor() {
	}

	ngOnInit() {
	}

	onSelectFile(event) {
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.onload = (readerEvent) => {
				const url = readerEvent.target.result.toString();
				if (event.target.id === "input-image2") {
					this.urlImageTwo = url;
				} else {
					this.urlImageOne = url;
				}
			}
		}
	}
}
