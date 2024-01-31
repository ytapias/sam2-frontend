export interface Iusuarios {
    nombre: string,
    email: string,
    empresa?:_Empresa,
    password?: string,
    img?: string,
    google?: boolean,
    role?: string,
    uid?: string,
}

interface _Empresa{
    _id: string,
    nombre:string,
    identificacion:string
  }

  