//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from "@angular/forms";

import { AppRoutingModule } from '../app-routing.module';
import { ComponentsModule } from '../components/components.module';
//import { ReactiveFormsModule } from '@angular/forms';

//import { RouterModule } from'@angular/router';  --otra forma de poner el router

//Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';

import { SharedModule } from '../shared/shared.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { ConfiguracionComponent } from './mantenimientos/configuracion/configuracion.component';
import { PaisesyciudadesComponent } from './mantenimientos/paisesyciudades/paisesyciudades.component';
import { PrincipalformComponent } from './principalform/principalform.component';
import { EmpresasComponent } from './mantenimientos/empresas/empresas.component';
import { GacetasComponent } from './gacetas/gacetas.component';

import { ClipboardModule } from 'ngx-clipboard';
import { Component, HostListener } from '@angular/core';
import { MarcasComponent } from './marcas/marcas.component';
import { PersonasComponent } from './personas/personas.component';
import { GestionesComponent } from './gestiones/gestiones.component';
import { CargarComponent } from './mantenimientos/cargar/cargar.component';
import { CompararComponent } from './mantenimientos/comparar/comparar.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { RegistroComponent } from './registro/registro.component';


 
@NgModule({
  declarations: [ 
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ConsultasComponent,
    UsuariosComponent,
    ConfiguracionComponent,
    PaisesyciudadesComponent,
    PrincipalformComponent,
    EmpresasComponent,
    GacetasComponent,
    MarcasComponent,
    PersonasComponent,
    GestionesComponent,
    CargarComponent,
    CompararComponent,
    MyprofileComponent,
    RegistroComponent,
  ],
  exports :[
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    FormsModule,
    ReactiveFormsModule,
    EmpresasComponent,
    ClipboardModule

    
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AppRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    ClipboardModule

  ]
})
export class PagesModule { }
