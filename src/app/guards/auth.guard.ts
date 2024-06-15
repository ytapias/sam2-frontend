import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

import { tap,map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

    const userService = inject(UsuarioService);
    
    //console.log('paso por el guard');
    return userService.validarToken().pipe(
    
        tap( (estaAutenticado) =>  {
      //    console.log('debntro dle  ---- guard');
          // console.log("AUTENTICADO= "+estaAutenticado);
  
  
          if ( !estaAutenticado ) {
       //     console.log('debntro dle  ---- guard');
        
            router.navigateByUrl('/login');
          }
        })
    
      );
  }
