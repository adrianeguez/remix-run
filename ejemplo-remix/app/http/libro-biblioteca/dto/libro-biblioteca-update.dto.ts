import {CreateDto} from "~/interfaces/create.dto";

export interface LibroBibliotecaUpdateDto extends CreateDto {
    nombre?: any;
    descripcion?: string;
    generoLibro?: string;
    isbn?: string;
}