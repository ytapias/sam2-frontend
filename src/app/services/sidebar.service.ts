import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu : any[]=[
    {
      titulo: 'Dashboard',
      icono:'mdi mdi-gauge',
      submenu: [
        { titulo:'Main',url:'/'},
        { titulo:'ProgressBar',url:'progress'},
        { titulo:'Graficas',url:'grafica1'},
        { titulo:'Promesas',url:'promesas'},
        { titulo:'Rxjs',url:'rxjs'},
      ]
    },
    {
      titulo: 'Funcional',
      icono:'mdi mdi-folder-lock-open',
      submenu: [
        { titulo:'Registro',url:'registro'},
        // { titulo:'Consultas',url:'consultas'},
        { titulo:'Expedientes',url:'principal'},
        { titulo:'Gestiones',url:'gestiones'},
        { titulo:'Tareas',url:'tareas'},
        { titulo:'Marcas',url:'marcas'},
        { titulo:'Personas',url:'personas'},
        { titulo:'Analizar Gaceta',url:'analisis'},
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono:'mdi mdi-apps',
      submenu: [
        { titulo:'Configuracion',url:'configuracion'},
        { titulo:'Paises y Ciudades',url:'paisesyciudades'},
        { titulo:'Usuarios',url:'usuarios'},
        { titulo:'Empresas',url:'empresas'},
       
        { titulo:'Comparar',url:'comparar'},
        { titulo:'Cargador Gacetas',url:'cargar'},
        { titulo:'Analizar Gacetas',url:'gacetas'},

      ]
    }
  ];

  constructor() { }
}
