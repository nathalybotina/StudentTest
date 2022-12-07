import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Student } from "../../../Models/student.model";
import * as actions from './actions';

export interface StudentState extends EntityState<Student> {
    editStudent: Student | null,
    isLoading: boolean,
    openModal: boolean,
}

const INITIAL_STATE: StudentState = {
    entities: {},
    ids: [],
    editStudent: null,
    isLoading: false,
    openModal: false
};

const studentsAdapter = createEntityAdapter<Student>({
    selectId: student => student.id!,
    sortComparer: (a, b) => a.firstName.localeCompare(b.firstName)
});

export const initialStudentsState = studentsAdapter.getInitialState(INITIAL_STATE);

export const studentsReducer = createReducer<StudentState>(
    initialStudentsState,
    on(actions.getAllStudents, (state,) => studentsAdapter.setAll([],
        {
            ...state,
            isLoading: true
        })),
    on(actions.getAllStudentsSuccess, (state, action) => studentsAdapter.setAll(action.students, {
        ...state,
        isLoading: false
    })),
    on(actions.getAllStudentsError, (state, action) => studentsAdapter.setAll([], {
        ...state,
        isLoading: false
    })),
    on(actions.editStudent, (state, action) => ({
        ...state,
        editStudent: action.student,
        openModal: true
    })),
    on(actions.saveStudentSuccess, (state, action) => studentsAdapter.upsertOne(action.student, {
        ...state,
        editStudent: null,
        openModal: false
    })),
    on(actions.deleteStudentSuccess, (state, action) => studentsAdapter.removeOne(action.id!, {
        ...state,
        editStudent: null,
        openModal: false
    }))
)