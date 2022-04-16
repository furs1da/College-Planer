import {Component, NgZone, OnInit} from '@angular/core';
import {Course} from "../models/courses.model";
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-course-page',
  templateUrl: './list-course-page.component.html',
  styleUrls: ['./list-course-page.component.css']
})
export class ListCoursePageComponent implements OnInit {
  courses: Course[] = []
  canBeDeleted:boolean = true;


  constructor(private database: DatabaseService,
              private router: Router, private ngZone: NgZone) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    this.router.onSameUrlNavigation = 'reload';
  }

  ngOnInit(): void {
    this.database.selectAllCourses().then((data)=>{
      this.courses = data;
    }).catch((error)=>{
        console.error(error)
    });
  }

  btnModify_click(course: Course){
    this.router.navigate(['modifyCourse/' + course.id]);
  }

  btnDelete_click(course: Course){
    this.canBeDeleted = true;
    this.database.findAssignmentByCourse(course.id).then((data)=>{
      if(data !== undefined) {
        this.canBeDeleted = false;
        alert("This course cannot be deleted.");
      }
      console.log(this.canBeDeleted);
      if(this.canBeDeleted) {
        this.database.deleteCourse(course, ()=>{

          console.log("Course deleted successfully.");
          alert("Course deleted successfully.");

          this.ngZone.run(() => {
            this.router.navigate(['listCourse/']);
          });

        });
      }
    });
  }

}
