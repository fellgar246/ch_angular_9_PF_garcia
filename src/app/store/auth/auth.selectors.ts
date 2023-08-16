import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, authFeatureKey } from "./auth.reducer";


export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectAuthUser = createSelector(selectAuthState, (state)=> state.authUser)

//! Revisar si se borra
export const selectAuthUserRole = createSelector(selectAuthState, (state)=> state.authUser?.role)

export const selectIsAdmin = createSelector(selectAuthState, (state)=> state.authUser?.role === 'administrador')
