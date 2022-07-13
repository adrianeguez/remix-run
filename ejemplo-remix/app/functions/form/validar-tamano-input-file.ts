export function ValidarTamanoInputFile(archivo, tamanioMaximoEnBytes) {
    if (archivo) {
        if (archivo[0]) {
            if (archivo[0].size > tamanioMaximoEnBytes) {
                return `Archivo muy pesado. Max: ${tamanioMaximoEnBytes / 1000000}Mb`
            } else {
                return true
            }
        } else {
            return true
        }
    } else {
        return true;
    }
    // const fileList: FileList = evento.target.files;
    // if (evento.target.files.length > 0) {
    //     const file: File = fileList[0];
    //     if (file) {
    //         if (file.size <= this.field.file.tamanioMaximoEnBytes) {
    //             this.field.valid = f.controls[this.field.formControlName].valid;
    //             this.field.actualValue = this.file;
    //             this.fieldChanged.emit(this.field);
    //         } else {
    //             return
    //         }
    //     }
    // }
}