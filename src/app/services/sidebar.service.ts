import { Injectable } from '@angular/core';

import { UsuarioService } from './usuario.service';  // Importa tu servicio de usuario


@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu : any[]=[
    {
      titulo: 'Dashboard',
      icono:'mdi mdi-gauge',
      submenu: [
        { titulo:'Main',url:'/', roles: [222, 223]},
      ]
    },
    {
      titulo: 'Funcional',
      icono:'mdi mdi-folder-lock-open',
      submenu: [
        { titulo:'Registro',url:'registro', roles: [222, 223]},
        // { titulo:'Consultas',url:'consultas'},    
        { titulo:'Gestiones',url:'gestiones', roles: [222, 223]},
        { titulo:'Opocisiones',url:'demandas', roles: [222, 223]},
        
        { titulo:'Marcas',url:'marcas', roles: [222, 223]},
        { titulo:'Personas',url:'personas', roles: [222, 223]},
        { titulo:'Analizar Gaceta',url:'analisis', roles: [222, 223]},
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono:'mdi mdi-apps',
      submenu: [
        { titulo:'Configuracion',url:'configuracion', roles: [222]},
        { titulo:'Paises y Ciudades',url:'paisesyciudades', roles: [222]},
        { titulo:'Usuarios',url:'usuarios', roles: [222]},
        { titulo:'Tareas',url:'tareas', roles: [222]},
        { titulo:'Comparar',url:'comparar', roles: [222]},
        { titulo:'Cargador Gacetas',url:'cargar', roles: [222]},
        { titulo:'Analizar Gacetas',url:'gacetas', roles: [222]},

      ]
    },
    {
      titulo: 'Otros',
      icono:'mdi mdi-apps',
      submenu: [
        { titulo:'Empresas',url:'empresas', roles: [222]},
        { titulo:'Expedientes',url:'principal', roles: [222]},
        { titulo:'ProgressBar',url:'progress', roles: [222]},
        { titulo:'Graficas',url:'grafica1', roles: [222]},
        { titulo:'Promesas',url:'promesas', roles: [222]},
        { titulo:'Rxjs',url:'rxjs', roles: [222]},

      ]
    }
  ];

  constructor(private usuarioService: UsuarioService) { }

  // Método para obtener el menú filtrado por el rol del usuario
  getMenu() {
    const userRole = this.usuarioService.role;  // Obtenemos el rol del usuario

    // Filtramos el menú para que solo muestre los items permitidos para ese rol
    return this.menu.map(section => {
      return {
        ...section,
        submenu: section.submenu.filter((item: { roles: number[]; }) => item.roles.includes(userRole))
      };
    }).filter(section => section.submenu.length > 0);  // Eliminamos secciones vacías
  }

}
