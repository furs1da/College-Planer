import {ChangeDetectionStrategy, Component, NgZone, OnInit} from '@angular/core';
import {Course} from "../models/courses.model";
import {Mark} from "../models/marks.model";
import {Assignment} from "../models/assignments.model";
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";
import {waitForAsync} from "@angular/core/testing";


@Component({
  selector: 'app-list-mark-page',
  templateUrl: './list-mark-page.component.html',
  styleUrls: ['./list-mark-page.component.css']
})
export class ListMarkPageComponent implements OnInit {
  marks: Mark[] = []
  assignments: Assignment[] = [];
  courses: Course[] = [];

  constructor(private database: DatabaseService,
              private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
     this.database.selectAllMarks().then((data)=>{
      this.marks = data;


    }).then(()=> {

      for(let i=0; i<this.marks.length; i++){
        this.database.selectAssignment(this.marks[i].assignmentId).then((data)=>{
          this.assignments.push(data);
          this.database.selectCourse(data.courseId).then((data)=>{
            this.courses.push(data);
          }).catch((error)=>{
            console.error(error)
          });

        }).catch((error)=>{
          console.error(error)
        });
      }

      console.log(this.assignments);
    }).catch((error)=>{
      console.error(error)
    });




  }



  btnModify_click(mark: Mark){
    this.router.navigate(['modifyMark/' + mark.id]);
  }

  btnDelete_click(mark: Mark){
    this.database.deleteMark(mark, ()=>{

      alert("Mark deleted successfully.");

      this.ngZone.run(() => {
        window.location.reload()
      });

    });
  }


}
