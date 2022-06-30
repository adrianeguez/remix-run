import {UseFormReturn} from "react-hook-form/dist/types";
import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import {CampoFormularioAccordeonInterface} from "~/components/form/lib/interfaces/campo-formulario-accordeon.interface";

export interface CampoFormularioComponentInterface {
    useFormReturn: UseFormReturn<any, any>;
    campos: CampoFormularioInterface[];
    accordeonCampos?: CampoFormularioAccordeonInterface[];
}