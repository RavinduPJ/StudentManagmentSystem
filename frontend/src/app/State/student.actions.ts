import { NumberFormatStyle } from "@angular/common";
import { createAction, props } from "@ngrx/store";

export const updateStatus=createAction('[FileUpload] Update Status',props<{value:number}>());
export const selectStatus=createAction('[FileUpload] Select Status')