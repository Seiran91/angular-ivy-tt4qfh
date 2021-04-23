import { Injectable } from '@angular/core';
import { Student, RegStudent } from './Student';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class ConnectionService {
  data: any;

  constructor( private http: HttpClient, private location: Location ) {

  }

  //private baseURL = 'http://localhost/connection.php';
  private baseURL = 'http://seiran-mvc-data.000webhostapp.com/angulardata.php';

  /* GET requests begin here */
  getStudentsList(): Observable <Student[]> {

    
    if(this.data){
      console.log('nothing fetched');
      return this.data;
    } else{
      this.data = this.http.get<Student[]>(this.baseURL)
      .pipe(
        catchError((err) =>{
          return throwError(err);
        }));
      //console.log(this.data);
      return this.data;

    }

  }

  getStudentDetails(reqStudent: string): Observable <Student[]> {
    return this.http.get<Student[]>(`${this.baseURL}${reqStudent}`)
    .pipe(
      catchError((err) =>{
        return throwError(err);
      })
    )
  }
  /* GET requests end here */

/*---------------------------------------------*/

  /* POST requests begin here */
  addStudent(student: RegStudent) {
    return this.http.post<Student>(this.baseURL, student)
    .pipe(
      catchError((err) =>{
        return throwError(err);
      })
    )
  }
  /* POST requests end here */

/*---------------------------------------------*/

  /* PUT requests begin here */
  updateStudent(studentURL: string, student: Student) {
    console.log(student);
    return this.http.put<Student>(`${this.baseURL}${studentURL}`, student)
    .subscribe({
      next: data =>{
        console.log("Succesful update!"+"\n"+data);
        return true;
      },
      error: err =>{
        console.log(err);
        return false;
      }
    });
  }
  /* PUT requests end here */

/*---------------------------------------------*/

  /* DELETE requests begin here */
  deleteStudent(reqStudent: string) {
    this.http.delete<Student>(`${this.baseURL}${reqStudent}`)
      .subscribe({
        next: data =>{
          console.log("Succesful delete!"+"\n"+data);
          this.location.back();
        },
        error: err =>{console.log(err)}
       });
  }

  /* DELETE requests end here */

}


