const {Parser} = require('json2csv');

export function ExportarCsvExport(
    campos: string[],
    registros: any[],
    transforms?: any[]
): string {
    let json2csvParser: any;
    if (transforms) {
        json2csvParser = new Parser({fields: campos, transforms});
    } else {
        json2csvParser = new Parser({fields: campos});
    }
    return json2csvParser.parse(registros);
}