import {SortFieldInterface} from "~/interfaces/sort-field.interface";
import {SortOrderEnum} from "~/enum/sort-order.enum";
import React from "react";
import {CampoFormularioInterface} from "~/components/form/lib/interfaces/campo-formulario.interface";
import {CampoFormularioAccordeonInterface} from "~/components/form/lib/interfaces/campo-formulario-accordeon.interface";

export interface PanelActionPopoverInterface {
    rightPanelOpened: boolean;
    setRightPanelOpened: (value: (((prevState: boolean) => boolean) | boolean)) => void;
    actionSortFieldOpened: boolean;
    setActionSortFieldOpened: (value: (((prevState: boolean) => boolean) | boolean)) => void;
    popoverOpened: boolean;
    setPopoverOpened: (value: (((prevState: boolean) => boolean) | boolean)) => void;
    popoverTargetRef: React.MutableRefObject<null>;
    sortFields: SortFieldInterface[];
    seleccionarSortField: (sortField: SortFieldInterface) => void;
    seleccionarSortFieldOrder: (sortOrder: SortOrderEnum) => void;
    camposFiltro:CampoFormularioInterface[];
    accordeonCampos?:CampoFormularioAccordeonInterface[];
}