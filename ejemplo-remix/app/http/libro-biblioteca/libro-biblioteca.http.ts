import type {LibroBibliotecaFindDto} from "~/http/libro-biblioteca/dto/libro-biblioteca-find.dto";
import {CONFIG} from "~/config";
import {AbstractHttp} from "~/classes/abstract.http";
import {LibroBibliotecaCreateDto} from "~/http/libro-biblioteca/dto/libro-biblioteca-create.dto";
import {LibroBibliotecaInterface} from "~/http/libro-biblioteca/libro-biblioteca.interface";

export class LibroBibliotecaHttp extends AbstractHttp<LibroBibliotecaFindDto, LibroBibliotecaCreateDto, LibroBibliotecaInterface>{
    constructor(url:string) {
        super(
            url
        );
    }
}