import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/Models/student.model';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { deleteStudent, editStudent } from './state/actions';
import { getAllStudents } from './state/selector';

@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.sass']
})
export class StudentListComponent implements OnInit, OnDestroy {

  //private props
  private _sub = new Subscription();

  displayedColumns: string[] = ['firstName', 'lastName', 'userName', 'age', 'career', 'actions'];
  dataSource = new MatTableDataSource([] as Student[]);

  constructor(private _store: Store<any>, private _dialog: MatDialog) {

  }

  //#region Angular Hooks

  ngOnInit(): void {
    this._sub.add(
      this._store.select(getAllStudents)
        .subscribe(students => {
          this.dataSource = new MatTableDataSource(students as Student[] || []);
        }));
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  //#endregion 

  openDialog(student: Student | null) {
    this._store.dispatch(editStudent({ student: student }));
    this._dialog.open(EditStudentComponent, {
      data: student || {},
      width: '50%'
    });
  }

  edit(student: Student): void {
    console.log('edit');
    this.openDialog(student)
  }
  delete(student: Student): void {
    console.log('delete');
    this._store.dispatch(deleteStudent({ id: student.id }));
  }

  selected(_student: Student): void {
    //Intended empty
  }

}
