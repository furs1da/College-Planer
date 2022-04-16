import {Component, NgZone, OnInit} from '@angular/core';
import {Assignment} from "../models/assignments.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DatabaseService} from "../services/database.service";
import {Course} from "../models/courses.model";

@Component({
  selector: 'app-modify-assignment-page',
  templateUrl: './modify-assignment-page.component.html',
  styleUrls: ['./modify-assignment-page.component.css']
})
export class ModifyAssignmentPageComponent implements OnInit {

  assignment: Assignment = new Assignment();
  course: Course = new Course();

  constructor(private activatedRoute: ActivatedRoute,
              private database: DatabaseService,
              private router: Router,
              private ngZone: NgZone) { }


  ngOnInit(): void {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(`id is ${id}`);
    this.database.selectAssignment(id)
      .then((data) => {
        console.info(data);
        this.assignment = data;
      })
      .catch((e) => {
        console.error(e);
      });

    //can't access this.assignment
    this.database.selectCourse(this.assignment.courseId)
      .then((data) => {
        console.info(data);
        this.course = data;
      })
      .catch((e) => {
        console.error(e);
      });

  }

  formTitle =  + this.course.courseCode + '' + this.course.courseName +
    'Update Assignment: #' + this.assignment.assignmentNumber;

  btnUpdate_click() {
    this.database.updateAssignment(this.assignment, () => {
      console.log("Assignment updated successfully");
      alert("Assignment updated successfully");
    });
    this.ngZone.run(() => {
      this.router.navigate(['listAssignment']);
    });
  }

  btnCancel_click(){
    this.ngZone.run(() => {
      this.router.navigate(['listAssignment']);
    });
  }

}
