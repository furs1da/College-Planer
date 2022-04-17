import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DatabaseService} from "../services/database.service";
import {Mark} from "../models/marks.model";
import {Assignment} from "../models/assignments.model";
import {Course} from "../models/courses.model";

@Component({
  selector: 'app-modify-mark-page',
  templateUrl: './modify-mark-page.component.html',
  styleUrls: ['./modify-mark-page.component.css']
})

export class ModifyMarkPageComponent implements OnInit {
  mark: Mark = new Mark();
  formTitle : string = "";
  course: Course =  new Course();
  assignment: Assignment = new Assignment();


  constructor(private activatedRoute: ActivatedRoute,
              private database: DatabaseService,
              private router: Router,
              private ngZone: NgZone) { }

  ngOnInit(): void {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(`id is ${id}`);
    this.database.selectMark(id).then((data) => {
        console.info(data);
        this.mark = data;
        this.formTitle = 'Update Mark';
      }).then(()=>{
      this.database.selectAssignment(this.mark.assignmentId).then((data)=> {
        this.assignment = data;
      }).then(()=>{
        this.database.selectCourse(this.assignment.courseId).then((data)=> {
          this.course = data;
      })})
      })
      .catch((e) => {
        console.error(e);
      });
  }




  btnUpdate_click() {
    this.database.updateMark(this.mark, () => {
      console.log("Mark updated successfully");
      alert("Mark updated successfully");
    });
    this.ngZone.run(() => {
      this.router.navigate(['listMark']);
    });
  }

  btnCancel_click(){
    this.ngZone.run(() => {
      this.router.navigate(['listMark']);
    });
  }
}
