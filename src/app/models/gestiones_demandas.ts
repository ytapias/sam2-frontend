export class Gestiones_Demandas {
  constructor( 
      public id:number,
      public pais:string,
      public coddeman: number,
      public codactua:number,
      public fechactua: Date,
      public descripcion:string,
      public termino: Date,
      public observaciones:string,
      public pendiente:string,
      public quepend:string,
      
      
      public idestado:number,
      public idempresa:number,
      public marca: string,
      
      public cliente: string,
      public expediente: string,
      public marcademandada: string,
      public estado: string,
      public empresa: string
      
      ) 
  { }
}
