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
  copyDetailedStudent: Student[];
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

  updateStudent(putStudent: Student){
    var studentURL = this.location.path();
    var id = this.route.snapshot.paramMap.get("id");
    var index = this.studentService.students.findIndex(function(item, i){
      return item.id == +id;
    });
    // Here the only field that is visible and we need to update is the Name field, the others are fetched from db
    // when we ask for detail's
    this.studentService.updateStudent(studentURL, putStudent)
    .subscribe(
      response => {
        console.log("Student with id: "+response+" updated succesfully!");
        this.studentService.students[index].Name = putStudent.Name;
        this.detailedStudent = Object.assign({},this.copyDetailedStudent);
        this.editShowHideBoolean();
      },
      err => {console.log(err)}
    );
    
  }
  deleteStudent(): void {
    const reqStudent = this.location.path();
    const id = +this.route.snapshot.paramMap.get("id");
    const index = this.studentService.students.findIndex(function(item, i){
      return item.id == +id;
    });
    
    this.studentService.deleteStudent(reqStudent)
    .subscribe(
      response => {
        console.log("Student with id: "+response+" deleted succesfully!");
        this.studentService.students.splice(index,1);
        this.location.back();
      },
      err => {console.log(err)}
    );
  }
  
  goBack(): void{
    this.location.back();
  }

  editShowHideBoolean(): void{
    this.edit = !this.edit;
    this.copyDetailedStudent = Object.assign({},this.detailedStudent);
  }

  IsItAdmin() {
    if(this.studentService.User.user == "admin"){
      return true;
    } else {
      return false;
    }
  }
}
