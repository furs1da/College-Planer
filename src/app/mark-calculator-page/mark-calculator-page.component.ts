import {Component, NgZone, OnInit} from '@angular/core';
import {Mark} from "../models/marks.model";
import {CourseResults} from "../models/courseResults";
import {Assignment} from "../models/assignments.model";
import {Course} from "../models/courses.model";
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-mark-calculator-page',
  templateUrl: './mark-calculator-page.component.html',
  styleUrls: ['./mark-calculator-page.component.css']
})
export class MarkCalculatorPageComponent implements OnInit {
  formTitle = 'Calculate Mark';
  courses: Course[] = []
  courseId: number = -1;
  courseResult: CourseResults = new CourseResults();
  noResults:string = "";

  constructor(private database: DatabaseService,
              private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.database.selectAllCourses().then((data)=>{
      this.courses = data;
    }).catch((error)=>{
      console.error(error)
    });
  }

  onCourseChange(event){
    this.courseId = event;
    this.database.calculateCourse(this.courseId).then((data)=>{
      if(data === undefined) {
        this.noResults = "You have not received any marks on this course yet...";
      }
      else {
        this.noResults = "";
        this.courseResult = data;
        this.courseResult.achieved = +this.courseResult.achieved.toFixed(2);
        this.courseResult.average = +this.courseResult.average.toFixed(2);
      }
    }).catch((error)=>{
      console.error(error)
    });
  }

}
