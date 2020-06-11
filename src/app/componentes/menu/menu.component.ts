import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/servicios/auth-guard.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public authGuardService: AuthGuardService, public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  puedeNavegar = link => this.authGuardService.puedeNavegar(link);

  onSalir = () => this.authService.logout();

}
