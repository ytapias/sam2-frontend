interface _tipodetalle_tipo{
    _id: string,
    nombre:string
}

export class tp_tiposdetalle {
    constructor( 
        public codigo: string,
        public nombre: string,
        public otro: string,
        public idestado: string,
        public _id?: string,
        public uid?: string,
        public tipo?: _tipodetalle_tipo,
        ) 
    { }
}

