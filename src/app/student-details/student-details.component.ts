import { Component, OnInit } from '@angular/core';
import { Student, RegStudent } from '../Student';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})


export class StudentDetailsComponent implements OnInit {

  detailedStudent: any;
  edit: boolean = false;
  req_error_msg: string;
  
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
        err => this.req_error_msg = err.message
        );
  }

  goBack(): void{
    this.location.back();
  }

  editShowHideBoolean(): void{
    this.edit = !this.edit
  }

  updateStudent(putStudent: Student){
    console.log(putStudent);
    const studentURL = this.location.path();
    if(this.studentService.updateStudent(studentURL, putStudent)){
      this.editShowHideBoolean();
    }else{console.log("Oops!")}
    
  }
  deleteStudent(): void {
    const reqStudent = this.location.path();
    this.studentService.deleteStudent(reqStudent);
  }

}
