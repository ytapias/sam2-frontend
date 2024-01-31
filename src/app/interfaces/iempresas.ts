export interface Iempresas {
    identificacion: number,
    dv: number,
    nombre: string,
    
    telefono1: string,
    telefono2: string,
    celular: string,
    otro: string,

    direccion: string,
    correo: string,
    idestado: string,
    _id?: string,
    uid?: string,
    
    tipo?: _tipodetalle_tipo,
    ciudad?: _tipodetalle_tipo,

}

interface _tipodetalle_tipo{
    _id: string,
    nombre:string
  }
  
