import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',

})
export class SidebarComponent {
  menuItems: any[];

  nombre : string =  this.usuarioService.getnom();
  email : string =  this.usuarioService.getemail();
  emp : string =  this.usuarioService.getemp();

  constructor(private sidebarService:SidebarService, 
              private usuarioService : UsuarioService,
              private router : Router){
    this.menuItems= sidebarService.menu;

    //console.log(this.menuItems);
  }

  
  logout(){
    this.usuarioService.logout();
    this.router.navigateByUrl("/login");
  }

}
