import {CreateDto} from "~/interfaces/create.dto";

export interface LibroBibliotecaCreateDto extends CreateDto {
    nombre: string;
    descripcion?: string;
    generoLibro: string;
    isbn: string;
}