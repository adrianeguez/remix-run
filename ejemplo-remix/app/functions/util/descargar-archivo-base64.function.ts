import {TipoArchivoEnum} from "~/enum/tipo-archivo.enum";

export function DescargarArchivoBase64Function(registroSeleccionadoRuta: any,
                                               tipoArchivo: TipoArchivoEnum = TipoArchivoEnum.Archivo) {
    if (registroSeleccionadoRuta.sisArchivo && tipoArchivo === TipoArchivoEnum.Archivo) {
        const a = document.createElement("a");
        a.target = '_blank';
        a.href = `data:${registroSeleccionadoRuta.sisArchivo.mimetype};base64,` + registroSeleccionadoRuta.sisArchivo.buffer;
        a.download = registroSeleccionadoRuta.sisArchivo.originalname;
        a.click();
    }
    if (registroSeleccionadoRuta.sisImagen && tipoArchivo === TipoArchivoEnum.Imagen) {
        const a = document.createElement("a");
        a.target = '_blank';
        a.href = `data:${registroSeleccionadoRuta.sisImagen.mimetype};base64,` + registroSeleccionadoRuta.sisImagen.buffer;
        a.download = registroSeleccionadoRuta.sisImagen.originalname;
        a.click();
    }
}