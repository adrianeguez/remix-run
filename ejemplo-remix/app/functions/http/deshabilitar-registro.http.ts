export async function DeshabilitarRegistroHttp(instanciaServicio: any, registro:any) {
    try{
        return await instanciaServicio.modificarHabilitado(registro);
    }catch (error){
        console.error({error, mensaje:'Error deshabilitando registro'});
    }
}