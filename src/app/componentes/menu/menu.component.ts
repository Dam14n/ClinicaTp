import { Component, Input, OnInit } from '@angular/core';
import { Navegacion } from 'src/app/clases/navegacion';
import { AuthService } from 'src/app/servicios/auth.service';
import { NavegacionComponent } from '../abstract/navegacion/navegacion.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends NavegacionComponent implements OnInit {
  
  constructor(authService: AuthService) {
    super(authService)
  }

  ngOnInit(): void {
  }

}
