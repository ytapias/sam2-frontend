interface _Empresa{
    _id: string,
    nombre:string,
    identificacion:string
  }

export class Usuario {
    constructor( 
        public nombre: string,
        public email: string,
        public empresa?:_Empresa,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
        ) 
    {
        
    }
}