export class gacetas {
    constructor( 
        public gaceta: number,
        public paisrad: string,
        public fechapub: Date,
        public registros: number,
        
        public estado: string = 'Pendiente' // 👈 propiedad agregada con valor por defecto

        ) 
    { }
}

