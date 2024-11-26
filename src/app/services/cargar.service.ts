import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { catchError } from 'rxjs/operators';

const base_url =environment.base_url;

interface DataItem {
  paisrad: string;
  dominio: string;
  anno: string; // Asegúrate de que los tipos coincidan con lo que esperas en tu objeto
  expedi: string;
  año: string;
  fechapb: string;
  estado: string;
  ts: string;
  
natural: string;
  denomi: string;
  civersion: string;
  clase: string;
  apoderado: string;
  dirapo: string;
  emailapode: string;
  paisapod: string;
  solicitant: string;
  direcsol: string;
  
   emailsol: string;
  nomciu: string;
  depto: string;
  pais: string;
 codpais: string;
   contacto: string;
  dircont: string;
  emailcont: string;
  ciudcont: string;
  paiscont: string;
  tipomarc: string;
  tipoproc: string;
  gaceta: number;
  expedinu: string;
  plazopo: string;
  clases: string;
  fechapub: string;
  tiposol: string;
  expedio: string;
  numpub: string;
  prioridad: string;
  fechapri: string;
  regint: string;
  fregint: string;
  codciud: string;
  direccion: string;
  clasesig: string;
}

@Injectable({
  providedIn: 'root'
})
export class CargarService {

  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers:
      {
        'x-token':this.token
          }

      };
  }

  nuevoArreglo: any[]=[];



   excelDateToJSDate(excelDate: string): Date {
    // Convertir el string a número
    const excelNumber = parseFloat(excelDate);
    // Calcular la fecha
    const date = new Date((excelNumber - 25569) * 86400 * 1000);
    return date;
  }

  


 // public totalUsuarios :number =0;
 //public tiposdetalle:Empresas[]=[];
  cargar(Tipo: string ="",Data :string )
  {
    //const url = `${ base_url }/CargarSQL?tipo=${Tipo}&elementos=${cuantos}&espais=${espais}&nombre=${nombre}`;
    //return this.http.get(url,this.headers);
    console.log('creando');
    const parsedData = JSON.parse(Data); 

    console.log("parsedData");
    console.log(parsedData);
//?tipo=${Tipo}

const data = Object.values(parsedData)[0]; // Obtiene el primer valor del objeto, que debería ser el array de datos
  console.log(data);
  if (Array.isArray(data)) {

      console.log('Primer objeto del arreglo:', data[0]); // Muestra el primer objeto
      console.log('Primer objeto del arreglo..:', data[0][0]); // Muestra el primer objeto
      console.log('Primer objeto del arreglo..:', data[0]['paisrad ']); // Muestra el primer objeto



      this.nuevoArreglo = data.map((item: DataItem) => ({
        
        paisrad: item.paisrad,
        dominio: item.dominio,

        anno: item.anno,
        expedi: item.expedi,
        fechapb: item.fechapb,
        estado: item.estado,
        ts: item.ts,

        natural: item.natural,
        denomi: item.denomi,
        civersion: item.civersion,
        clase: item.clase,
        apoderado: item.apoderado,
        dirapo: item.dirapo,
        emailapode: item.emailapode,
        paisapod: item.paisapod,
        solicitant: item.solicitant,
        direcsol: item.direcsol,

        emailsol: item.emailsol,
        nomciu: item.nomciu,
        depto: item.depto,
        pais: item.pais,
        codpais: item.codpais,
        contacto: item.contacto,
        dircont: item.dircont,
        emailcont: item.emailcont,
        ciudcont: item.ciudcont,
        paiscont: item.paiscont,
        tipomarc: item.tipomarc,
        tipoproc: item.tipoproc,
        gaceta: item.gaceta,
        expedinu: item.expedinu,
        plazopo: item.plazopo,

        clases: item.clases,
        fechapub:item.fechapub,
        tiposol: item.tiposol,
        expedio: item.expedio,
        numpub: item.numpub,
        prioridad: item.prioridad,
        fechapri: item.fechapri,
        regint: item.regint,
        fregint: item.fregint,
        codciud: item.codciud,
        direccion: item.direccion,
        clasesig: item.clasesig,
        // ... y así sucesivamente para el resto de las propiedades
      })
  
    );

      console.log(this.nuevoArreglo);

     // return this.http.post(`${ base_url }/cargarSQL`,this.nuevoArreglo,this.headers);
      return this.http.post(`${base_url}/cargarSQL`, this.nuevoArreglo, this.headers).pipe(
        catchError(err => {
          console.error('Error al hacer el POST:', err);
          return of(null);  // En caso de error, retornas un Observable con `null`
        })
      );
        
    } else {
      console.error('Error: El formato de los datos no es correcto.');
      return of(null);  // Si la validación falla, retornamos un Observable con `null`

    }

  }


/*
  crear(item : String)
  {
      console.log('creando');
      console.log(item);
      
      console.log(this.http.post(`${ base_url }/EmpresasSQL/`,item,this.headers));

      return 0;
  }
*/
}
