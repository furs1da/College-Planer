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

  assignments: Assignment[] = [];
  courses: Course[] = [];

  assignment: Assignment = new Assignment();
  course: Course = new Course();

  formTitle : string = "";

  constructor(private activatedRoute: ActivatedRoute,
              private database: DatabaseService,
              private router: Router,
              private ngZone: NgZone) { }


  ngOnInit(): void {
    this.database.selectAllAssignments()
      .then((data) => {
        this.assignments = data;
      }).then(()=>{
        for (let i = 0; i<this.assignments.length; i++){
          this.database.selectCourse(this.assignments[i].courseId).then((data)=>{
            this.courses.push(data);
          }).catch((error)=>{
            console.error(error)
          });
        }

    }).catch((e) => {
        console.error(e);
      });


    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));


    //even these two show undefined.
    console.log("RESULT")
    console.info(this.assignments[id]);
    console.info(this.courses[this.assignment.courseId]);

    this.formTitle =  + this.course.courseCode + '' + this.course.courseName +
      'Update Assignment: #' + this.assignment.assignmentNumber;
  }



  btnUpdate_click() {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.database.updateAssignment(this.assignments[id], () => {
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
