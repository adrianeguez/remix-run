import {SortFieldInterface} from "~/interfaces/sort-field.interface";
import {SortOrderEnum} from "~/enum/sort-order.enum";
import React from "react";

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
}