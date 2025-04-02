import { Component } from '@angular/core';
//import { ClipboardService } from 'ngx-clipboard';
import { Analisis } from 'src/app/models/analisis.model';
import { gacetas } from 'src/app/models/gacetas.model';
import { AnalisisService } from 'src/app/services/analisis.service';
import { GacetasService } from 'src/app/services/gacetas.service';
import * as XLSX from 'xlsx';

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
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: []
})
export class AnalisisComponent {

 
  public Items: any[] = [];
  public marcasEnGaceta: any[] = [];
  public marcasSimilares: any[] = [];

  public seleccionados: any[] = [];    // ✅ Arreglo para guardar los seleccionados


  public paises = [
    { nombre: 'Colombia', codigo: 'CO' },
    { nombre: 'México', codigo: 'ME' },
    { nombre: 'Argentina', codigo: 'AR' },
    { nombre: 'Chile', codigo: 'CL' }
  ];

  public codigoPaisSeleccionado: string = '';
  public paisSeleccionado: boolean = false;
  public gacetaSeleccionada: any = null;
  public marcaSeleccionada: any = null;

  constructor(private servicio: GacetasService, private servicioAnalisis: AnalisisService) {}

  // Método para filtrar gacetas según el país seleccionado
  get gacetasFiltradas(): any[] {
    return this.Items.filter(item => item.paisrad === this.codigoPaisSeleccionado);
  }

  // Método para manejar la selección de un país
  seleccionarPais() {
    this.paisSeleccionado = true;
    this.gacetaSeleccionada = null;
    this.marcaSeleccionada = null;
    this.cargarGacetas();
  }

  // Método para cargar las gacetas desde el servicio
  cargarGacetas() {
    this.servicio.cargar().subscribe((res: any) => {
      this.Items = res['resultado'];
      //this.marcasEnGaceta= res['resultado'];
    });
  }

  // Método para manejar la selección de una gaceta
  abrirDetalle(gaceta: any) {

    this.gacetaSeleccionada = gaceta;
    console.log("GAceta");
    console.log(this.gacetaSeleccionada);
    this.paisSeleccionado = false;
    this.marcaSeleccionada = null;

    this.servicioAnalisis.cargar(this.gacetaSeleccionada).subscribe((res: any) => {
      //this.Items = res['resultado'];
      this.marcasEnGaceta= res['resultado'];
    });


    // Simulación de marcas dentro de la gaceta (Esto se debe cambiar por datos reales del backend)
   /* this.marcasEnGaceta = [
      { nombre: 'Marca A', id: 1 },
      { nombre: 'Marca B', id: 2 },
      { nombre: 'Marca C', id: 3 }
    ];
    */
  }

  // Método para manejar la selección de una marca
  seleccionarMarca(marca: any) {
    this.marcaSeleccionada = marca;
    console.log("GAceta");
    console.log(this.gacetaSeleccionada);
    console.log("Marca");
    console.log(this.marcaSeleccionada.nombre);
    
    
    // Llamada al servicio para obtener marcas similares (Simulado por ahora)
    this.servicioAnalisis.cargarMarcasSimilares(this.gacetaSeleccionada,this.marcaSeleccionada.nombre)
      .subscribe((res: any) => {
        this.marcasSimilares = res['resultado'];
        console.log(res['resultado']);

        console.log(this.marcasSimilares);
      });
  }


   // ✅ Función para agregar o quitar una fila del array de seleccionados
   toggleSeleccion(marca: any, event: any) {
    if (event.target.checked) {
        this.seleccionados.push(marca);
    } else {
        this.seleccionados = this.seleccionados.filter(item => item !== marca);
    }
    console.log("Seleccionados:", this.seleccionados); // Para verificar en consola
}

// ✅ Función que se ejecuta al hacer clic en el botón
procesarSeleccionados() {
    console.log("Marcas seleccionadas:", this.seleccionados);
    alert(`Has seleccionado ${this.seleccionados.length} marcas`);
}


  //////////////////////////////////////////////
  /////////// exportar WORD
  /////////////////////////////////////////////

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
                      text: `${item.duenomarca}`,
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
                          children: [new Paragraph(item.duenomarca)],
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
}
