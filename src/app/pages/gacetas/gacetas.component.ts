import { Component } from '@angular/core';

import { ClipboardModule, ClipboardService } from 'ngx-clipboard';
import {  HostListener } from '@angular/core';
import { gacetas } from 'src/app/models/gacetas.model';
import { GacetasService } from 'src/app/services/gacetas.service';
import { AnalisisService } from 'src/app/services/analisis.service';
import { Analisis } from 'src/app/models/analisis.model';
import Swal from 'sweetalert2';
import { Document, HeadingLevel, Packer, Paragraph, TextRun  } from 'docx';


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
    analisisGaceta(item : gacetas)
    {
        console.log(item.gaceta);
        
        this.servicioAnalisis.analisis(item)
        .subscribe ( (res1:any) => 
        {
            console.log(res1);
           // this.ItemsAnalisis= res1['resultado'];

                Swal.fire(
                  'res!',
                  `El RESULTADO ${ res1['resultado']} .`,
                  'success'
                );

             

            // this.labels1= res1['resultado'];
            // this.labels1= res1['resultado'].cantidad;
    
        console.log(this.ItemsAnalisis);
    
      
        });
    

    }



    generateWordDocument(item : Analisis): void {
      
      let cadena  = 'Señores';
      let contenido  = `Por medio de la presente solicito se abra investigación en el caso de las marcas, ya que la marca ${item.Cadena1gaceta} de la gaceta ${item.Gaceta} 
se parece mucho a ${item.Cadena2marca} propiedad de mi cliente, constituyendo una infracción  a los derechos de marca de mi cliente.`;

      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            // new Paragraph({
              
            //   text: cadena,
            //   heading: HeadingLevel.HEADING_1
            // }),
            new Paragraph( {
              children: [
             new TextRun({
               text: 'Señores.',
               size: 24, // Tamaño de la fuente en puntos (12pt)
               bold: false, // Opcional: texto en negrita
               font: 'Arial' // Fuente Arial
             })
             ]
          }),

            new Paragraph({
              
              children: [
                new TextRun({
                  text: 'Super Intendencia',
                  size: 24, // Tamaño de la fuente en puntos (12pt)
                  bold: true, // Opcional: texto en negrita
                  font: 'Arial' // Fuente Arial
                })
              ]
            }),
            new Paragraph( {
               children: [
              new TextRun({
                text: 'Ciudad.',
                size: 24, // Tamaño de la fuente en puntos (12pt)
                bold: false, // Opcional: texto en negrita
                font: 'Arial' // Fuente Arial
              })
              ]
           }),
            new Paragraph(''),
            new Paragraph(''),
            new Paragraph({
              
              children: [
                new TextRun({
                  text: contenido,
                  size: 24, // Tamaño de la fuente en puntos (12pt)
                  bold: false, // Opcional: texto en negrita
                  font: 'Arial' // Fuente Arial
                })
              ]
            }),
            new Paragraph(''),
            new Paragraph(''),
            new Paragraph( {
              children: [
             new TextRun({
               text: 'Atentamente',
               size: 24, // Tamaño de la fuente en puntos (12pt)
               bold: false, // Opcional: texto en negrita
               font: 'Arial' // Fuente Arial
             })
             ]
          }),
            new Paragraph(''),
            new Paragraph({
              text: 'AAAAAAAAAA',
              heading: HeadingLevel.HEADING_2,
            
            }),
            new Paragraph( {
              children: [
             new TextRun({
               text: 'Ciudad.',
               size: 24, // Tamaño de la fuente en puntos (12pt)
               bold: false, // Opcional: texto en negrita
               font: 'Arial' // Fuente Arial
             })
             ]
              }),

          ]
        }]
      });
  
      Packer.toBlob(doc).then(blob => {
        // Descargar el archivo generado
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'generated-document.docx';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      });
    }
 

}
