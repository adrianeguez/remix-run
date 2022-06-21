export interface CampoFormularioSelectInterface {
    opciones: SelectInterface[];
}

export interface SelectInterface {
    id: string | number;
    value: any;
    label: string;
}