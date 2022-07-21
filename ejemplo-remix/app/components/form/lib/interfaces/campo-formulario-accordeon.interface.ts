import {LibroBibliotecaEnum} from "~/http/libro-biblioteca/form/libro-biblioteca.enum";
import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";

export interface CampoFormularioAccordeonInterface {
    id: string;
    labelJSXElement: JSX.Element;
    accordeonAbierto?: boolean;
    descripcion: string;
    campos: string[];
    camposFormulario: CampoFormularioInterface[];
}