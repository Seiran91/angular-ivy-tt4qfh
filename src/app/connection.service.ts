import { Injectable } from '@angular/core';
import { Student } from './Student';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  constructor(private http: HttpClient, private location: Location) {}

  //private baseURL = 'http://localhost/connection.php';
  //private baseURL = 'http://seiran-mvc-data.000webhostapp.com/angulardata.php';
  private baseURL = 'https://seiran.eu/connection.php';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /* GET requests begin here */
  getStudentsList(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseURL).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getStudentDetails(reqStudent: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseURL}${reqStudent}`).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }
  /* GET requests end here */

  /*---------------------------------------------*/

  /* POST requests begin here */
  addStudent(student: Student) {
    return this.http.post<Student>(this.baseURL, student).pipe(
      catchError(err => {
        return throwError(err.message);
      })
    );
  }
  /* POST requests end here */

  /*---------------------------------------------*/

  /* PUT requests begin here */
  updateStudent(studentURL: string, student: Student) {
    //console.log(student);
    return this.http
      .put<Student>(`${this.baseURL}${studentURL}`, student, this.httpOptions)
      .pipe(
        catchError(err => {
          return throwError(err.message);
        })
      );
  }
  /* PUT requests end here */

  /*---------------------------------------------*/

  /* DELETE requests begin here */
  deleteStudent(reqStudent: string) {
    return this.http
      .delete<Student>(`${this.baseURL}${reqStudent}`, this.httpOptions)
      .pipe(
        catchError(err => {
          return throwError(err.message);
        })
      );
  }

  /* DELETE requests end here */
}
