import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    StudentDetailsComponent,
    PagenotfoundComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [StudentsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
