import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

import { tap,map } from 'rxjs/operators';



export const roleGuard: CanActivateFn = (route, state) => {
 
  const router = inject(Router);
  const usuarioService = inject(UsuarioService);

  const rolesPermitidos = route.data['roles'] as Array<number>;
  const roleUsuario = usuarioService.role;

  // Verifica si el rol del usuario está en los roles permitidos
  if (rolesPermitidos && rolesPermitidos.includes(roleUsuario)) {
    return true; // Permite el acceso si el rol es válido
  }

  // Si no tiene el rol adecuado, redirige al dashboard
  return usuarioService.validarToken().pipe(
    tap((estaAutenticado) => {
      if (!estaAutenticado || !rolesPermitidos.includes(roleUsuario)) {
        router.navigateByUrl('/dashboard');
      }
    }),
    map(estaAutenticado => estaAutenticado && rolesPermitidos.includes(roleUsuario)) // Asegura que solo pasa si cumple los roles
  );
}
