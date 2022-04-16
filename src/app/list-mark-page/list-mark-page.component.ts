import {ChangeDetectionStrategy, Component, NgZone, OnInit} from '@angular/core';
import {Course} from "../models/courses.model";
import {Mark} from "../models/marks.model";
import {Assignment} from "../models/assignments.model";
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-list-mark-page',
  templateUrl: './list-mark-page.component.html',
  styleUrls: ['./list-mark-page.component.css']
})
export class ListMarkPageComponent implements OnInit {
  marks: Mark[] = []
  assignment: Assignment = new Assignment();
  course: Course = new Course();
  constructor(private database: DatabaseService,
              private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.database.selectAllMarks().then((data)=>{
      this.marks = data;
    }).catch((error)=>{
      console.error(error)
    });
  }

  getAssignmentInfo(id:number) : Assignment {
    this.database.selectAssignment(id).then((data)=>{
      this.assignment = data;
    }).catch((error)=>{
      console.error(error)
    });

    return this.assignment;
  }

  getCourseInfo(id:number) : Course {
    this.database.selectCourse(id).then((data)=>{
      this.course = data;
    }).catch((error)=>{
      console.error(error)
    });

    return this.course;
  }

  btnModify_click(mark: Mark){
    this.router.navigate(['modifyMark/' + mark.id]);
  }

  btnDelete_click(mark: Mark){
    this.database.deleteMark(mark, ()=>{
      console.log("Mark deleted successfully.");
      alert("Mark deleted successfully.");
      this.ngZone.run(() => {
        this.router.navigate(['listMark/']);
      });
    });
  }


}
