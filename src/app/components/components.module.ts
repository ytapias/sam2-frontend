import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { ReactiveFormsModule,FormsModule } from "@angular/forms";


import { DonutComponent } from './donut/donut.component';
//import { ModalFormularioComponent } from './modal-formulario/modal-formulario.component';


@NgModule({
  declarations: [
    IncrementadorComponent,
    DonutComponent,
//    ModalFormularioComponent
  ],
  exports: [
    IncrementadorComponent,
    DonutComponent,
  //  ModalFormularioComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ComponentsModule { }
