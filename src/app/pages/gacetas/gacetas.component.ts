import { Component } from '@angular/core';

import { ClipboardModule, ClipboardService } from 'ngx-clipboard';
import {  HostListener } from '@angular/core';
import { gacetas } from 'src/app/models/gacetas.model';
import { GacetasService } from 'src/app/services/gacetas.service';
import { AnalisisService } from 'src/app/services/analisis.service';
import { Analisis } from 'src/app/models/analisis.model';


@Component({
  selector: 'app-gacetas',
  templateUrl: './gacetas.component.html',
  styleUrls: []
})
export class GacetasComponent {

  public Items: gacetas[]=[];
  public ItemsAnalisis: Analisis[]=[];


  // export class TuComponenteComponent {
    textoACopiar: string = 'Texto que quieres copiar al portapapeles';
  
    constructor(private servicio: GacetasService,
      private servicioAnalisis: AnalisisService,
      private clipboardService: ClipboardService) 
      { 
        this.cargar();

      }
  
      cargar() {

       
        this.servicio.cargar()
        .subscribe ( (res1:any) => 
        {
            console.log(res1);
            this.Items= res1['resultado'];
            // this.labels1= res1['resultado'];
            // this.labels1= res1['resultado'].cantidad;
    
         //   console.log(this.ItemsALL);
    
      
        });
    
      //  console.log(this.Items);
      }



    copiarAlPortapapeles() {
      this.clipboardService.copyFromContent(this.textoACopiar);
      console.log(this.textoACopiar);
      alert('Texto copiado al portapapeles: ' + this.textoACopiar);
    }


    textoPegado: string="";

    @HostListener('paste', ['$event'])
    handlePaste(event: ClipboardEvent) {
      const clipboardData = event.clipboardData || (window as any).clipboardData;
      this.textoPegado = clipboardData.getData('text');
      // Puedes agregar lógica adicional después de obtener los datos del portapapeles
      console.log('Texto pegado desde el portapapeles: ' + this.textoPegado);
      alert('Texto copiado del  portapapeles: ' +  this.textoPegado);
    }


    abrirDetalle(item : gacetas)
    {
        console.log(item.gaceta);
        
        this.servicioAnalisis.cargar(0,10,item.gaceta)
        .subscribe ( (res1:any) => 
        {
            console.log(res1);
            this.ItemsAnalisis= res1['resultado'];
            // this.labels1= res1['resultado'];
            // this.labels1= res1['resultado'].cantidad;
    
        console.log(this.ItemsAnalisis);
    
      
        });
    

    }



}
