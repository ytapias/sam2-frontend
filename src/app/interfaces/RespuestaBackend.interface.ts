export interface RespuestaBackend {
    ok: boolean;
    resultado: {
        nuevoID: number;
        mensaje: string;
        total: number;
    };
    msg: string;
}