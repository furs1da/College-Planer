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

  formTitle : string = "";

  constructor(private activatedRoute: ActivatedRoute,
              private database: DatabaseService,
              private router: Router,
              private ngZone: NgZone) { }


  ngOnInit(): void {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.database.selectAssignment(id)
      .then((data) => {
        console.info(data);
        this.assignment = data;
        this.formTitle = 'Update Assignment: ' + this.assignment.title;

      }).then(() => {
      this.database.selectCourse(this.assignment.courseId).then((data)=>{
        this.course = data;
      }).catch((error)=>{
        console.error(error)
      });}).catch((e) => {
        console.error(e);
      });

  }

  onFinishedChange(event){
    this.assignment.isFinished = event;
  }


  btnUpdate_click() {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
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
