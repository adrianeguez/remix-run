export function eliminarUndNullVacio(objeto: any) {
    Object.keys(objeto).forEach(
        (nombre) => {
            if (objeto[nombre] === null || objeto[nombre] === undefined || objeto[nombre] === '') {
                delete objeto[nombre];
            }
        }
    )
    return objeto;
}