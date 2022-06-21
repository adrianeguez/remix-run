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
        mensaje?: string;
    };
    max?: {
        value: number;
        mensaje?: string;
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