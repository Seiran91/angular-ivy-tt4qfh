import { Component, OnInit } from '@angular/core';
import { Student } from '../Student';
import { ConnectionService } from '../connection.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];
  
  constructor(private connectionService: ConnectionService) {
   }

   // Initialize students list by calling getList method below
  ngOnInit(): void {
    this.getList();
  }

  // Fetch data from connectionService which is responsible for requests to the server!
  getList(): void {
    
    this.connectionService.getStudentsList()
    .subscribe(
      data => { this.students = data },
      err => { console.log("Something went wrong!" + err) }
      );
  }


}
