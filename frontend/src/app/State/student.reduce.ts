import { updateStatus } from "./student.actions";
import { Action, createReducer, on,createSelector,State } from "@ngrx/store"
import { initialState } from "./student.state";

export const _studentReducer=createReducer(
    initialState,
    on(updateStatus,(state,action)=>{
        console.log(action)
        return {
            ...state,
            updatestatus:action.value
        };
    })
)

export function studentReducer(state: { updatestatus: number } | undefined,action: Action){
    return _studentReducer(state,action)
}

