export class Gestiones {
  constructor( 
      public id:number,
      public idempresa:number,
      public idexpediente:number,
      public expediente: number,
      public idmarca:number,
      public marca: string,
      
      public idpais:number,
      public pais: string,
      
      public clase: number,
      public idtipoproceso: number,
      public tipoproceso: string,

      public fechaactuacion: Date,
      public idtipoactuacion: number,
      public tipoactuacion: string,
      public vence: Date,
      public tipogest: string,
      public observaciones: string,
      public idestado: number,
      public estado: string
      
      ) 
  { }
}
