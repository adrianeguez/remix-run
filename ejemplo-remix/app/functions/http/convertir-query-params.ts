export function convertirQueryParams(objeto: any): string {
    Object.keys(objeto).forEach(
        (nombre) => {
            if (objeto[nombre] === null || objeto[nombre] === undefined || objeto[nombre] === '') {
                delete objeto[nombre];
            }
        }
    )
    return new URLSearchParams(objeto) as any;
}