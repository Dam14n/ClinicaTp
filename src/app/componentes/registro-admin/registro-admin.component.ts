import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent implements OnInit {
	url = '';
	constructor() {
	}

	ngOnInit() {
	}

	onSelectFile(event) {
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();

			reader.readAsDataURL(event.target.files[0]); // read file as data url

			reader.onload = (event) => { // called once readAsDataURL is completed
				this.url = event.target.result.toString();
			}
		}
	}
}
