import { Component, OnInit } from '@angular/core';
import {  Student } from '../Student';
import { ConnectionService } from '../connection.service';
import { Location } from '@angular/common';

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
        console.log("Student added succesfully with id: "+ data);
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
    this.model.Name = '';
    this.model.Email = '';
    this.model.Title = '';
  }

}
