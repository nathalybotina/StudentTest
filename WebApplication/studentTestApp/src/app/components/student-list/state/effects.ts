import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { StudentsService } from "src/app/services/students.service";

import * as actions from './actions';

@Injectable()
export class StudentEffects {
    constructor(private actions$: Actions,
        private _studentService: StudentsService,
        private _router: Router,
        private store: Store<any>) { }


    getAllStudents$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.getAllStudents),
            switchMap(_ =>
                this._studentService.getAll()
                    .pipe(
                        map(results => actions.getAllStudentsSuccess({ students: results })),
                        catchError(error => of(actions.getAllStudentsError({ error })))
                    )
            )
        )
    );

    upsertStudent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.saveStudent),
            switchMap(action =>
                this._studentService.upsert(action.student)
                    .pipe(
                        map(result => actions.saveStudentSuccess({ student: result })),
                        catchError(error => of(actions.saveStudentError({ error })))
                    )
            )
        )
    );

    deleteStudent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.deleteStudent),
            switchMap(action =>
                this._studentService.delete(action.id!)
                    .pipe(
                        map(_ => actions.deleteStudentSuccess({ id: action.id })),
                        catchError(error => of(actions.deleteStudentError({ error })))
                    )
            )
        )
    );

    handleErrors$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(actions.saveStudentError,
                    actions.getAllStudentsError,
                    actions.deleteStudentError),
                tap(error => {
                    console.error(`[Student API] Error: ${error}`);
                })),
        { dispatch: false }
    );

}