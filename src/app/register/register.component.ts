import { Component, OnInit } from '@angular/core';
import {  Student } from '../Student';
import { ConnectionService } from '../connection.service';
import { Location } from '@angular/common';
import 'bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //model = new RegStudent(null,"","","");
  model: Student = {
                  id: null,
                  Name: null,
                  Email: null,
                  Title: null
                };

  constructor(private connectionService: ConnectionService, private location: Location) { }

  ngOnInit(): void {
  }

  newStudent() {
    this.connectionService.addStudent(this.model)
    .subscribe(
      data =>{
        //The unary + operator converts its operand to Number type.
        this.model.id = +data;
        // Copy model because get reset before its gets pushed into array
        const std = Object.assign({}, this.model);
        this.connectionService.students.push(std);
        // Sort array after new register
        this.connectionService.students.sort((a,b) => a.Name.localeCompare(b.Name));
        console.log("Student added succesfully with id: "+ data + "and Name: " + std.Name);
        this.emptyModel();
        },
      err =>{
        console.log(err)
      }
    );
  }
  back():void{
    this.location.back();
  }
  emptyModel(){
    this.model.id = null;
    this.model.Name = null;
    this.model.Email = null;
    this.model.Title = null;
  }

}
