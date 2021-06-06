import { Component, OnInit } from '@angular/core';
import { Student } from '../Student';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConnectionService } from '../connection.service';
import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})


export class StudentDetailsComponent implements OnInit {

  detailedStudent: Student[];
  edit: boolean = false;
  req_error_msg: string = "Content which are you looking for doesn't exist";
  
  constructor(private route: ActivatedRoute,
    private studentService: ConnectionService,
    private location: Location) {
    
  }

  ngOnInit(): void {
    this.getStudentDetails();
  }

  getStudentDetails(): void {
    const reqStudent = this.location.path();
    this.studentService.getStudentDetails(reqStudent)
      .subscribe(
        response => this.detailedStudent = response,
        err => {console.log(err.message);}
        );
  }

  goBack(): void{
    this.location.back();
  }

  editShowHideBoolean(): void{
    this.edit = !this.edit
  }

  updateStudent(putStudent: Student){
    //console.log(putStudent);
    const studentURL = this.location.path();
    this.studentService.updateStudent(studentURL, putStudent)
    .subscribe(
      response => {
        console.log("Student with id: "+response+" updated succesfully!");
        this.editShowHideBoolean();
      },
      err => {console.log(err)}
    );
    
  }
  deleteStudent(): void {
    const reqStudent = this.location.path();
    this.studentService.deleteStudent(reqStudent)
    .subscribe(
      response => {
        console.log("Student with id: "+response+" deleted succesfully!");
        this.location.back();
      },
      err => {console.log(err)}
    );
  }

}
