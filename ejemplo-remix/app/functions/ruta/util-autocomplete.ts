export const UtilAutocomplete = (
    setActionAutocompleteAbierto,
    setCamposFiltrosBusqueda,
    camposFiltrosBusqueda,
    seleccionoListaAutocomplete
)=>{
    return {
        actualizarValorCampoAutocompleteGlobal : () => {
            setActionAutocompleteAbierto(false);
            setCamposFiltrosBusqueda([
                ...camposFiltrosBusqueda.map(
                    (f) => {
                        if (f.formControlName === seleccionoListaAutocomplete.campoFormulario.formControlName) {
                            f.initialValue = seleccionoListaAutocomplete.registro;
                            f.actualValue = seleccionoListaAutocomplete.registro;
                            if (f.autocomplete) {
                                f.autocomplete.valorActual = seleccionoListaAutocomplete.registro;
                            }
                        }
                        return f;
                    }
                )
            ]);
        },
    };
}