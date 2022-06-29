import {ExportarCsvExport} from "~/functions/export-data/exportar-csv.export";
import {DescargarArchivoStringExport} from "~/functions/export-data/descargar-archivo-string.export";

export function ExportarDescargarCsvExport(
    campos: string[],
    registros: any[],
    transforms?: any[]
) {
    const textoCSV = ExportarCsvExport(campos, registros, transforms);
    DescargarArchivoStringExport(new Date().getTime().toString() + 'exportado.csv', textoCSV);
}