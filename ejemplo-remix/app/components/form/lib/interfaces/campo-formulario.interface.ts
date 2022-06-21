import {
    CampoFormularioValidatorsInterface
} from "~/components/form/lib/interfaces/campo-formulario-validators.interface";
import {CampoFormularioType} from "~/components/form/lib/enum/campo-formulario.type";

export interface CampoFormularioInterface {
    formControlName: string;
    help: string;
    patternMessage?: string;
    fileMessage?: string;
    initialValue: any;
    disabled?: boolean;
    validators: CampoFormularioValidatorsInterface;
    type: CampoFormularioType;
    valid: boolean;
    actualValue?: any;
    placeholder?: string;
    label: string;
    // select?: SelectField;
    // mask?: Mask;
    // autoComplete?: AutoComplete;
    // column?: '1' | '2' | '3' | '6' | '4' | '8' | '10' | '12';
    // textarea?: TextAreaField;
    // number?: NumberField;
    // file?: FileField;
    // inputNumber?: InputNumber;
    // matStepper?: MatStepperArray;
    // separator?: {
    //     html: string;
    // };

}




