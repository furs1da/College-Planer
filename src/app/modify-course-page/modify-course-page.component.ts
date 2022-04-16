import {Component, NgZone, OnInit} from '@angular/core';
import {Course} from "../models/courses.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DatabaseService} from "../services/database.service";

@Component({
  selector: 'app-modify-course-page',
  templateUrl: './modify-course-page.component.html',
  styleUrls: ['./modify-course-page.component.css']
})
export class ModifyCoursePageComponent implements OnInit {

  course: Course = new Course();

  constructor(private activatedRoute: ActivatedRoute,
              private database: DatabaseService,
              private router: Router,
              private ngZone: NgZone) {
  }

  ngOnInit(): void {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(`id is ${id}`);
    this.database.selectCourse(id)
      .then((data) => {
        console.info(data);
        this.course = data;
      })
      .catch((e) => {
        console.error(e);
      });

  }
  formTitle = 'Update Course: ' + this.course.courseName;
  btnUpdate_click() {
    this.database.updateCourse(this.course, () => {
      console.log("Course updated successfully");
      alert("Course updated successfully");
    });
    this.ngZone.run(() => {
      this.router.navigate(['listCourse']);
    });
  }

  btnCancel_click(){
    this.ngZone.run(() => {
      this.router.navigate(['listCourse']);
    });
  }
}
