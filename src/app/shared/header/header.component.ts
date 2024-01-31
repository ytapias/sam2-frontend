import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',

})
export class HeaderComponent {
  
   nombre : string =  this.usuarioService.getnom();
   email : string =  this.usuarioService.getemail();
   emp : string =  this.usuarioService.getemp();

  constructor(private usuarioService : UsuarioService,
    private router : Router ){

  }

  logout(){
    this.usuarioService.logout();
    this.router.navigateByUrl("/login");
  }

}
