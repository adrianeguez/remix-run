export interface CampoFormularioValidatorsInterface {
    required?: string | boolean;
    minLength?: {
        value: number;
        mensaje?: string;
    };
    maxLength?: {
        value: number;
        mensaje?: string;
    };
    min?: {
        value: number;
        validationFn: (value: any) => boolean;
    };
    max?: {
        value: number;
        validationFn: (value: any) => boolean;
    };
    email?: {
        mensaje?: string;
    };
    pattern?: {
        pattern: RegExp;
        mensaje: string;
    };
    url?: {
        mensaje?: string;
    };
}