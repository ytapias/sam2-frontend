
export class Usuario {
    constructor( 
        public id: number,
        public idempresa:number,
        public empresa:string,
        public login: string,
        public password: string,
        public email: string,
        public idrole:number,
        public role: string,
        public idpersona:number,
        public idtipoidentificacion: number,
        public identificacion: string,
        public nombre: string,
        public idestado: number,
        public estado: string,
   
        ) 
    {
        
    }
}