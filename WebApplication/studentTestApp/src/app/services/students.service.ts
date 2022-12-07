import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../Models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private _baseApiUrl = 'https://localhost:44308/api';

  constructor(private _http: HttpClient) { }

  getAll(): Observable<Student[]> {
    return this._http.get<Student[]>(`${this._baseApiUrl}/student`);
  }

  delete(id: number): Observable<void> {
    return this._http.delete<void>(`${this._baseApiUrl}/student/${id}`);
  }

  upsert(student: Student): Observable<Student> {
    return this._http.post<Student>(`${this._baseApiUrl}/student`, student);
  }

}
