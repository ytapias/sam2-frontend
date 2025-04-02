import { Component } from '@angular/core';

import { ClipboardModule, ClipboardService } from 'ngx-clipboard';
import {  HostListener } from '@angular/core';
import { gacetas } from 'src/app/models/gacetas.model';
import { GacetasService } from 'src/app/services/gacetas.service';
import { AnalisisService } from 'src/app/services/analisis.service';
import { Analisis } from 'src/app/models/analisis.model';
import Swal from 'sweetalert2';
//import { Document, HeadingLevel, Packer, Paragraph, TextRun  } from 'docx';
import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  Table, 
  TableCell, 
  TableRow, 
  HeadingLevel ,
  ShadingType 
} from 'docx';


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
        
        this.servicioAnalisis.cargar(item.gaceta)
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



//     generateWordDocument(item : Analisis): void {
      
//       let cadena  = 'Señores';
//       let contenido  = `Por medio de la presente solicito se abra investigación en el caso de las marcas, ya que la marca ${item.Cadena1gaceta} de la gaceta ${item.Gaceta} 
// se parece mucho a ${item.Cadena2marca} propiedad de mi cliente, constituyendo una infracción  a los derechos de marca de mi cliente.`;

//       const doc = new Document({
//         sections: [{
//           properties: {},
//           children: [
//             // new Paragraph({
              
//             //   text: cadena,
//             //   heading: HeadingLevel.HEADING_1
//             // }),
//             new Paragraph( {
//               children: [
//              new TextRun({
//                text: 'Señores.',
//                size: 24, // Tamaño de la fuente en puntos (12pt)
//                bold: false, // Opcional: texto en negrita
//                font: 'Arial' // Fuente Arial
//              })
//              ]
//           }),

//             new Paragraph({
              
//               children: [
//                 new TextRun({
//                   text: 'Super Intendencia',
//                   size: 24, // Tamaño de la fuente en puntos (12pt)
//                   bold: true, // Opcional: texto en negrita
//                   font: 'Arial' // Fuente Arial
//                 })
//               ]
//             }),
//             new Paragraph( {
//                children: [
//               new TextRun({
//                 text: 'Ciudad.',
//                 size: 24, // Tamaño de la fuente en puntos (12pt)
//                 bold: false, // Opcional: texto en negrita
//                 font: 'Arial' // Fuente Arial
//               })
//               ]
//            }),
//             new Paragraph(''),
//             new Paragraph(''),
//             new Paragraph({
              
//               children: [
//                 new TextRun({
//                   text: contenido,
//                   size: 24, // Tamaño de la fuente en puntos (12pt)
//                   bold: false, // Opcional: texto en negrita
//                   font: 'Arial' // Fuente Arial
//                 })
//               ]
//             }),
//             new Paragraph(''),
//             new Paragraph(''),
//             new Paragraph( {
//               children: [
//              new TextRun({
//                text: 'Atentamente',
//                size: 24, // Tamaño de la fuente en puntos (12pt)
//                bold: false, // Opcional: texto en negrita
//                font: 'Arial' // Fuente Arial
//              })
//              ]
//           }),
//             new Paragraph(''),
//             new Paragraph({
//               text: 'AAAAAAAAAA',
//               heading: HeadingLevel.HEADING_2,
            
//             }),
//             new Paragraph( {
//               children: [
//              new TextRun({
//                text: 'Ciudad.',
//                size: 24, // Tamaño de la fuente en puntos (12pt)
//                bold: false, // Opcional: texto en negrita
//                font: 'Arial' // Fuente Arial
//              })
//              ]
//               }),

//           ]
//         }]
//       });
  
//       Packer.toBlob(doc).then(blob => {
//         // Descargar el archivo generado
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'generated-document.docx';
//         a.click();
//         window.URL.revokeObjectURL(url);
//         a.remove();
//       });
//     }
generateWordDocument(item: Analisis): void {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            children: [
              new TextRun({
                text: 'COLOMBIA. ',
                size: 24,
                bold: true,
                font: 'Arial',
                
              }),
              new TextRun({
                text: `[Nombre del titular de la marca]`,
                size: 24,
                bold: true,
                font: 'Arial',
              }),
            ],
          }),
          new Paragraph({
            text: '',
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            children: [
            new TextRun({
            bold: true,
            text: `Aviso informativo posible oposición contra la solicitud de registro No. [${item.expedi}] de la marca “${item.Cadena1gaceta}” (nominativa/mixta/figurativa) en clase(s) ${item.clase}`,
            }),
           ],
            heading: HeadingLevel.HEADING_3,
          }),
          new Paragraph({
            text: '',
            heading: HeadingLevel.HEADING_1,
          }),
          

          new Paragraph({
            text: 'AVISO INFORMATIVO',
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            text: '',
            heading: HeadingLevel.HEADING_1,
          }),

          new Paragraph({
            text: 'Estimado(a) Dr.(a):',
          }),
          new Paragraph({
            text: '',
            heading: HeadingLevel.HEADING_1,
          }),

          new Paragraph({
            text: 'Le informamos que la siguiente solicitud de registro de marca ha sido publicada en Colombia:',
          }),
          new Paragraph({
            text: '',
            heading: HeadingLevel.HEADING_1,
          }),

          // Aquí empieza la tabla principal
          new Table({
            
            rows: [
               
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph('Marca solicitada')],
                  }),
                  new TableCell({
                    children: [new Paragraph(item.Cadena1gaceta)],
                  }),
                  
                 
                ],
              }),

              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph('Solicitante')],
                  }),
                  new TableCell({
                    children: [new Paragraph(item.solicitant)],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph('Clase Solicitada')],
                  }),
                  new TableCell({
                    children: [new Paragraph(`${item.clase}`)],
                  }),
                ],
              }),

              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph('Marca(s) previamente registradas')],
                  }),
                  new TableCell({
                    children: [new Paragraph( item.Cadena2marca)],//item.MarcaRegistrada || 
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph('Titular')],
                  }),
                  new TableCell({
                    children: [new Paragraph('Titular')],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph('Clase')],
                  }),
                  new TableCell({
                    children: [new Paragraph(`${item.clase}`)],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph('Probabilidades de éxito')],
                  }),
                  new TableCell({
                    children: [new Paragraph('Porcentaje')],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph('Plazo para presentar oposición')],
                  }),
                  new TableCell({
                    children: [new Paragraph(
                      (item.plazopo instanceof Date
                        ? item.plazopo
                        : new Date(item.plazopo)
                      ).toLocaleDateString()

                    )],//item.plazopo
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({
            text: '',
            heading: HeadingLevel.HEADING_1,
          }),

          new Paragraph({
            text: 'Teniendo en cuenta que las probabilidades de éxito son bajas, no sugerimos proceder con la oposición.',
          }),
          new Paragraph({
            text: '',
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            text: 'Quedamos atentos a sus instrucciones y pendientes de cualquier aclaración o complementación que estime necesarias.',
          }),
          new Paragraph(''),
          new Paragraph({
            text: 'Atentamente,',
          }),
          new Paragraph(''),
          new Paragraph({
            text: '',
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            text: '(Nombre de la asociada encargada)',
          }),
          new Paragraph({
            text: '',
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph({
            text: 'Asociada – Área de Marca',
          }),
        ],
      },
    ],
  });

  // Guardar el documento como un archivo .docx
  Packer.toBlob(doc).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-document.docx';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  });
}

//////////////////////////////////////////////
///////////  FILTROS 
//////////////////////////////////////////////

public filters: any = {
  Gaceta: '',
  Resultadoglobal: '',
  resultado: '',
  Cadena2marca: '',
  Cadena1gaceta: '',
  idempresa: '',
  idmarca: '',
  idgaceta: ''
};
  filteredItems(): Analisis[] {
    return this.ItemsAnalisis.filter(item => {
      return (
        (this.filters.Gaceta === '' || item.Gaceta.toString().includes(this.filters.Gaceta)) &&
        (this.filters.Resultadoglobal === '' || item.Resultadoglobal.includes(this.filters.Resultadoglobal)) &&
        (this.filters.resultado === '' || item.resultado.toString().includes(this.filters.resultado)) &&
        (this.filters.Cadena2marca === '' || item.Cadena2marca.includes(this.filters.Cadena2marca)) &&
        (this.filters.Cadena1gaceta === '' || item.Cadena1gaceta.includes(this.filters.Cadena1gaceta)) &&
        (this.filters.idempresa === '' || item.idempresa.toString().includes(this.filters.idempresa)) &&
        (this.filters.idmarca === '' || item.idmarca.toString().includes(this.filters.idmarca)) &&
        (this.filters.idgaceta === '' || item.idgaceta.toString().includes(this.filters.idgaceta))
      );
    });
  }


 

}
