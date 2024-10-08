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
          {path: '',component:DashboardComponent,data :{titulo :'Dashboard'} },
          {path: 'grafica1',component:Grafica1Component,data :{titulo :'Grafica 1'}},
          {path: 'progress',component:ProgressComponent,data :{titulo :'Progress'}},
          {path: 'account-settings',component:AccountSettingsComponent,data :{titulo :'Ajustes'}},
          {path: 'myprofile',component:MyprofileComponent,data :{titulo :'Ajustes'}},
          {path: 'promesas',component:PromesasComponent,data :{titulo :'Promesas'}},
          {path: 'rxjs',component:RxjsComponent,data :{titulo :'Rxjs'}},

       //   {path: '',redirectTo:'/dashboard',pathMatch:'full'},
          
       //principal
       {path: 'registro',component:RegistroComponent,data :{titulo :'Registro'}},
       //   {path: 'consultas',component:ConsultasComponent,data :{titulo :'Consultas'}},
          {path: 'principal',component:PrincipalformComponent,data :{titulo :'Principal'}},

          { path: 'gestiones/:gestion', component: GestionesComponent },  // Ruta con parámetro
          {path: 'gestiones',component:GestionesComponent,data :{titulo :'Gestiones'}},
          

          {path: 'demandas',component:DemandasComponent,data :{titulo :'Demandas'}},
          {path: 'tareas',component:TareasComponent,data :{titulo :'Tareas'}},
          {path: 'marcas',component:MarcasComponent,data :{titulo :'Marcas'}},
          {path: 'personas',component:PersonasComponent,data :{titulo :'Personas'}},
          {path: 'analisis',component:AnalisisComponent,data :{titulo :'Analizar Gaceta'}},
          

          //mantenimientos
          {path: 'usuarios',component:UsuariosComponent,data :{titulo :'Usuario de aplicacion'}},
          {path: 'configuracion',component:ConfiguracionComponent,data :{titulo :'Configurar'}},
          {path: 'paisesyciudades',component:PaisesyciudadesComponent,data :{titulo :'Paises Y Ciudades'}},
          {path: 'empresas',component:EmpresasComponent,data :{titulo :'Empresas'}},
          {path: 'cargar',component:CargarComponent,data :{titulo :'Cargador'}},
          {path: 'comparar',component:CompararComponent,data :{titulo :'Comparar'}},
          {path: 'gacetas',component:GacetasComponent,data :{titulo :'Gacetas Realizadas'}},
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
