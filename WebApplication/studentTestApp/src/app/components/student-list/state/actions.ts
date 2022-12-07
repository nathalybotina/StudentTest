import { createAction, props } from "@ngrx/store";
import { Student } from "../../../Models/student.model";

export const getAllStudents = createAction(
    '[Student API] Get All Students'
);

export const getAllStudentsSuccess = createAction(
    '[Student API] Get All Students Success',
    props<{ students: Student[] }>()
);
export const getAllStudentsError = createAction(
    '[Student API] Get All Students Error',
    props<{ error: string }>()
);

export const editStudent = createAction(
    '[Student API] Edit Student',
    props<{ student: Student | null }>()
);

export const saveStudent = createAction(
    '[Student API] Save Student',
    props<{ student: Student }>()
);

export const saveStudentSuccess = createAction(
    '[Student API] Save Student Success',
    props<{ student: Student }>()
);

export const saveStudentError = createAction(
    '[Student API] Save Student Error',
    props<{ error: string }>()
);

export const deleteStudent = createAction(
    '[Student API] Delete Student',
    props<{ id: number | null }>()
);

export const deleteStudentSuccess = createAction(
    '[Student API] Delete Student Success',
    props<{ id: number | null }>()
);

export const deleteStudentError = createAction(
    '[Student API] Delete Student Error',
    props<{ error: string }>()
);