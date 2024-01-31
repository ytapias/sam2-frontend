import { Expedientes } from "./expedientes";

 
interface Empresas{
  _id: string,
  nombre:string
}

interface Tipo{
  _id: string,
  nombre:string,
  codigo:string
}

export class Gestiones {
  constructor( 
    public empresa:Empresas,
      public expediente: Expedientes,
      public tipoproceso: Tipo,
      public fechact: Date,
      public sitermino: Boolean,
      public vence: Date,
      public tipoactuacion: Tipo,
      public tipogestion: string,
      public observaciones: string,
    
      public otro: string,
      public idestado: string,
      public _id?: string,
      public uid?: string,
      ) 
  { }
}
