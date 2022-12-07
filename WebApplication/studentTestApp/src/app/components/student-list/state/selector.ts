import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StudentState } from "./reducer";
export const STATE_KEY = 'student';

const getState = createFeatureSelector<StudentState>(STATE_KEY);

export const getAllStudents = createSelector(
    getState,
    (state) => Object.values(state.entities)
);

export const getEditStudent = createSelector(
    getState,
    (state) => state.editStudent
);

export const getModalState = createSelector(
    getState,
    (state) => state.openModal
);
