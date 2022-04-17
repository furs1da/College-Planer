import {Component, NgZone, OnInit} from '@angular/core';
import {Assignment} from "../models/assignments.model";
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";
import {Course} from "../models/courses.model";
import {Mark} from "../models/marks.model";


@Component({
  selector: 'app-list-assignment-page',
  templateUrl: './list-assignment-page.component.html',
  styleUrls: ['./list-assignment-page.component.css']
})
export class ListAssignmentPageComponent implements OnInit {
  assignments: Assignment[] = [];
  canBeDeleted:boolean = true;

  constructor(private database: DatabaseService,
              private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.database.selectAllAssignments().then((data)=>{
      this.assignments = data;
    }).catch((error)=>{
      console.error(error)
    });
  }

  btnModify_click(assignment: Assignment){
    this.router.navigate(['modifyAssignment/' + assignment.id]);
  }

  btnDelete_click(assignment: Assignment){
    this.canBeDeleted = true;
    this.database.findMarkByAssignment(assignment.id).then((data)=>{
      if(data !== undefined) {

        this.canBeDeleted = false;
        alert("This course cannot be deleted.");
      }

    }).then(()=>{
      this.database.findNoteByAssignment(assignment.id).then((data)=>{
        if(data !== undefined) {
          if(this.canBeDeleted){
            alert("This course cannot be deleted.");
          }
          this.canBeDeleted = false;
        }
      });
    }).finally(()=>{
      if(this.canBeDeleted) {
        this.database.deleteAssignment(assignment, ()=>{

          console.log("Assignment deleted successfully.");
          alert("Assignment deleted successfully.");

          this.ngZone.run(() => {
            window.location.reload();
          });

        });
      }
    });

  }

}
