import { NgModule } from '@angular/core';
import {Routes,RouterModule} from '@angular/router'

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { authGuard } from '../guards/auth.guard';
import { roleGuard } from '../guards/role.guard';

import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { ConfiguracionComponent } from './mantenimientos/configuracion/configuracion.component';
import { PaisesyciudadesComponent } from './mantenimientos/paisesyciudades/paisesyciudades.component';
import { PrincipalformComponent } from './principalform/principalform.component';
import { EmpresasComponent } from './mantenimientos/empresas/empresas.component';
import { GacetasComponent } from './gacetas/gacetas.component';
import { MarcasComponent } from './marcas/marcas.component';
import { PersonasComponent } from './personas/personas.component';
import { GestionesComponent } from './gestiones/gestiones.component';
import { CargarComponent } from './mantenimientos/cargar/cargar.component';
import { CompararComponent } from './mantenimientos/comparar/comparar.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { RegistroComponent } from './registro/registro.component';
import { TareasComponent } from './tareas/tareas.component';
import { AnalisisComponent } from './analisis/analisis.component';
import { DemandasComponent } from './demandas/demandas.component';
 
const routes: Routes =[
    {
        path: 'dashboard',
        component:PagesComponent,
        canActivate:[authGuard],
        children:[
          {path: '',component:DashboardComponent, canActivate: [roleGuard],data :{titulo :'Dashboard', roles: [222,223]} },
          {path: 'grafica1',component:Grafica1Component, canActivate: [roleGuard],data :{titulo :'Grafica 1', roles: [222,223]}},
          {path: 'progress',component:ProgressComponent, canActivate: [roleGuard],data :{titulo :'Progress', roles: [222,223]}},
          {path: 'account-settings',component:AccountSettingsComponent, canActivate: [roleGuard],data :{titulo :'Ajustes', roles: [222,223]}},
          {path: 'myprofile',component:MyprofileComponent, canActivate: [roleGuard],data :{titulo :'Ajustes', roles: [222,223] }},
          {path: 'promesas',component:PromesasComponent, canActivate: [roleGuard],data :{titulo :'Promesas', roles: [222,223] }},
          {path: 'rxjs',component:RxjsComponent, canActivate: [roleGuard],data :{titulo :'Rxjs', roles: [222,223] }},
          {path: 'registro',component:RegistroComponent, canActivate: [roleGuard],data :{titulo :'Registro', roles: [222,223]}},
          {path: 'gestiones/:gestion', component: GestionesComponent },  // Ruta con parámetro
          {path: 'gestiones',component:GestionesComponent, canActivate: [roleGuard],data :{titulo :'Gestiones', roles: [222,223]}},
          {path: 'demandas',component:DemandasComponent, canActivate: [roleGuard],data :{titulo :'Opociciones', roles: [222,223]}},
          {path: 'marcas',component:MarcasComponent, canActivate: [roleGuard],data :{titulo :'Marcas', roles: [222,223]}},
          {path: 'personas',component:PersonasComponent, canActivate: [roleGuard],data :{titulo :'Personas', roles: [222,223]}},
          {path: 'analisis',component:AnalisisComponent, canActivate: [roleGuard],data :{titulo :'Analizar Gaceta', roles: [222,223]}},
          

          //mantenimientos
          {path: 'principal',component:PrincipalformComponent, canActivate: [roleGuard],data :{titulo :'Principal', roles: [222]}},
          {path: 'tareas',component:TareasComponent, canActivate: [roleGuard],data :{titulo :'Tareas', roles: [222]}},

          {path: 'usuarios',component:UsuariosComponent, canActivate: [roleGuard],data :{titulo :'Usuario de aplicacion', roles: [222]}},
          {path: 'configuracion',component:ConfiguracionComponent, canActivate: [roleGuard],data :{titulo :'Configurar', roles: [222]}},
          {path: 'paisesyciudades',component:PaisesyciudadesComponent, canActivate: [roleGuard],data :{titulo :'Paises Y Ciudades', roles: [222]}},
          {path: 'empresas',component:EmpresasComponent, canActivate: [roleGuard],data :{titulo :'Empresas', roles: [222]}},
          {path: 'cargar',component:CargarComponent, canActivate: [roleGuard],data :{titulo :'Cargador', roles: [222]}},
          {path: 'comparar',component:CompararComponent, canActivate: [roleGuard],data :{titulo :'Comparar', roles: [222]}},
          {path: 'gacetas',component:GacetasComponent, canActivate: [roleGuard],data :{titulo :'Gacetas Realizadas', roles: [222]}},
        ]
      },
    

/*
--ayudas para crear diferentes rutas
{ path: 'path/:routeParam', component: Mycomponent }, --conm parametros
{ path: 'staticPath', component: Mycomponent },
{ path: '**', component: Mycomponent }, -- comodines
{ path: 'oldPath', redirectTo: '/staticPath'},
{ path: 'path/:routeParam', component: Mycomponent },

*/
];
 

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    

   ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule { }
