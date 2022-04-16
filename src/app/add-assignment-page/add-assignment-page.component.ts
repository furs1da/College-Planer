import { Component, OnInit } from '@angular/core';
import {Assignment} from "../models/assignments.model";
import {Course} from "../models/courses.model";
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-assignment-page',
  templateUrl: './add-assignment-page.component.html',
  styleUrls: ['./add-assignment-page.component.css']
})

export class AddAssignmentPageComponent implements OnInit {
  formTitle = 'Add Assignment';
  courses: Course[] = []
  //courseId, assignmentNumber, title, dueDate, assignmentFile, fileFormatAttr, fileName, description, weight, isFinished
  assignment:Assignment = new Assignment();

  constructor(private database: DatabaseService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.database.selectAllCourses().then((data)=>{
      this.courses = data;
    }).catch((error)=>{
      console.error(error)
    });
  }

  btnSave_click(){
  }

  onCourseChange(event){
    this.assignment.courseId=event;
  }

}
