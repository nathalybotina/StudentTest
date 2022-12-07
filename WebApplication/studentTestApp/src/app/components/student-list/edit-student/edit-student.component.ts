import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { Student } from 'src/app/Models/student.model';
import { saveStudent } from '../state/actions';
import { getEditStudent, getModalState } from '../state/selector';


@Component({
  selector: 'edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.sass']
})
export class EditStudentComponent implements OnInit, OnDestroy {

  private _sub = new Subscription();

  saving = false;
  isNew$ = this._store.select(getEditStudent).pipe(map(f => (f?.id || '') !== ''));

  fieldForm = new FormGroup({
    id: new FormControl(),
    firstName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    userName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    age: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(100)]),
    career: new FormControl('', [Validators.required, Validators.maxLength(50)]),
  })

  constructor(public dialogRef: MatDialogRef<EditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student, private _store: Store<any>) { }

  //#region Angular Hook
  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
  ngOnInit(): void {
    this._sub.add(
      this._store.select(getModalState).subscribe((state) => {
        if (!state) {
          this.dialogRef.close();
        }
      })
    );
    this._sub.add(
      this._store.select(getEditStudent)
        .subscribe(f => {
          if (f == null) {
            this.fieldForm.reset();
          } else {
            const formValue = { ...f }
            this.fieldForm.patchValue(formValue || {});
          }
        })
    )
  }
  //#endregion 

  save() {
    this.fieldForm.markAllAsTouched();
    if (this.fieldForm.valid) {
      this.saving = true;
      this._store.dispatch(saveStudent({ student: { ...this.fieldForm.value as Student } }));
    }
  }
  cancel() {
    this.dialogRef.close();
  }
}
