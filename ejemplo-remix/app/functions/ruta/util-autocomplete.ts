export const UtilAutocomplete = (
    setActionAutocompleteAbierto,
    setCamposFiltrosBusqueda,
    camposFiltrosBusqueda,
    seleccionoListaAutocomplete,
    useFormReturnAutocompleteActual
)=>{
    return {
        actualizarValorCampoAutocompleteGlobal : () => {
            setActionAutocompleteAbierto(false);
            setCamposFiltrosBusqueda([
                ...camposFiltrosBusqueda.map(
                    (f) => {
                        if (f.formControlName === seleccionoListaAutocomplete.campoFormulario.formControlName) {
                            // f.initialValue = seleccionoListaAutocomplete.registro;
                            f.actualValue = seleccionoListaAutocomplete.registro;
                            console.log(
                                'useFormReturnAutocompleteActual',
                                useFormReturnAutocompleteActual
                            );
                            useFormReturnAutocompleteActual.setValue(
                                seleccionoListaAutocomplete.campoFormulario.formControlName,
                                seleccionoListaAutocomplete.registro
                            )
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