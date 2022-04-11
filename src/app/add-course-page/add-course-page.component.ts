import { Component, OnInit } from '@angular/core';
import {Course} from "../models/courses.model";

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.css']
})
export class AddCoursePageComponent implements OnInit {
  formTitle = 'Add Course';

  course:Course = new Course("","");
  constructor() { }

  ngOnInit(): void {
  }

  btnSave_click(){

  }
}
