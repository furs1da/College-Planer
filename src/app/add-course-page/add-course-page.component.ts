import { Component, OnInit } from '@angular/core';
import {Course} from "../models/courses.model";
import {DatabaseService} from "../services/database.service";

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.css']
})
export class AddCoursePageComponent implements OnInit {
  formTitle = 'Add Course';

  course:Course = new Course();
  constructor(private database: DatabaseService) {

  }

  ngOnInit(): void {
  }

  btnSave_click(){
    this.database.insertCourse(this.course,()=>{
      console.log("Record added successfully");
      alert("Record added successfully");
    });
  }
}
