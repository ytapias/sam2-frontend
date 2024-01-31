 
interface Empresas{
  _id: string,
  nombre:string
}

interface Marca{
  _id: string,
  marca:string
}

interface Pais{
  _id: string,
  nombre:string,
  codpais:string
}
interface Tipo{
  _id: string,
  nombre:string,
  codigo:string
}
 
interface Persona{
  _id: string,
  nombre:string,
  identificacion:string
}
 

export class Expedientes {
  constructor( 
    public idempresa: number,  
    public empresa:string,
      public marca:string,
      public idmarca:number,
      public pais: string,
      public idpais: number,
  //    public idtipomarca: number,
  //    public tipomarca: number,
      public idtipoproceso: number,
      public tipoproceso: string,
      public idapoderado: number,
      public apoderado: string,
      public idagente:  number,
      public agente:  string,

      public idtipoestadotramite:  number,

      public tipoestadotramite: string,

      public idtiposolicitud :  number,
      public tiposolicitud :  string,
      public expediente: string,
      public resolucion: string,
      public dominio: string,
      public anno: number,
      public clase: string,

      public fechapb: Date,
      public certif: string,
      public ctlcert: string,
      public fechaconb: Date,
      public tiporesolucion: string,
      public vencimb: Date,
      public fecharesb: Date,
      public gaceta: string,
      public tipoprod: string,

      public gaccert:  String,
      public nrointerno: String,
      public prioridad: String,
      public fechapri:  Date,

      public pag:  number,
      public expedipri:  Date,
      public yourref:  String,
      public licenuso:  String,
    //  public parecidos:  Boolean,
      public pagcert: String,
      public fechapub:  Date,
      public mactiva:String,
      public fechainac: Date,
      public idimagen: String,
      public ptram:  Date,
      public ts: number,
      public vcniza: number,
      public rvidicac:  String,
      public tiposol: number,
      public wordenw: number,
      public declauso: String,
      public frrenova:  Date,
         
      public otro: string,
      public idestado:number,
      public estado: string,
      public id: number
      ) 
  { }
}


  
  