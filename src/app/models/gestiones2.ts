export class Gestiones2 {
  constructor( 
      public id:number,
      public idempresa:number,
      public idexpediente:number,
      public expediente: string,
      public idmarca:number,
      public marca: string,
      public nrointerno: string,
      public idpais:number,
      public pais: string,   
      public clase: string,
      public tipoproc: string,
      public fechaactuacion: Date | null,
      public codactua: string,
      public gestion: string,
      public sitermino: string,
      public vence: Date | null,
      public pendiente: string,
      public tipogest: number,
      public um: string,
      public idestado: number,
      public estado: string,
      public idparalegal: number,
      public paralegal: string
      ) 
  { }
}
