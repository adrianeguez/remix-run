import type {
    CampoFormularioValidatorsInterface
} from "~/components/form/lib/interfaces/campo-formulario-validators.interface";
import type {CampoFormularioType} from "~/components/form/lib/enum/campo-formulario.type";
import type {CampoFormularioSelectInterface} from "~/components/form/lib/interfaces/campo-formulario-select.interface";
import type {CampoFormularioNumberInterface} from "~/components/form/lib/interfaces/campo-formulario-number.interface";
import type {
    CampoFormularioAutocompleteInterface
} from "~/components/form/lib/interfaces/campo-formulario-autocomplete.interface";
import {CampoFormularioToggleInterface} from "~/components/form/lib/interfaces/campo-formulario-toggle.interface";
import {CampoFormularioFileInterface} from "~/components/form/lib/interfaces/campo-formulario-file.interface";

export interface CampoFormularioInterface {
    formControlName: string;
    help: string;
    // patternMessage?: string;
    // fileMessage?: string;
    initialValue: any;
    disabled?: boolean;
    validators: CampoFormularioValidatorsInterface;
    type: CampoFormularioType;
    valid: boolean;
    actualValue?: any;
    placeholder?: string;
    label: string;
    select?: CampoFormularioSelectInterface;
    number?: CampoFormularioNumberInterface;
    autocomplete?: CampoFormularioAutocompleteInterface;
    toggle?: CampoFormularioToggleInterface;
    icon?: JSX.Element;
    file?: CampoFormularioFileInterface;
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




