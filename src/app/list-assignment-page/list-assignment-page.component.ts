import { Component, OnInit } from '@angular/core';
import {Assignment} from "../models/assignments.model";
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";
import {Course} from "../models/courses.model";

@Component({
  selector: 'app-list-assignment-page',
  templateUrl: './list-assignment-page.component.html',
  styleUrls: ['./list-assignment-page.component.css']
})
export class ListAssignmentPageComponent implements OnInit {
  assignments: Assignment[] = []
  constructor(private database: DatabaseService,
              private router: Router) { }

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
    this.database.deleteAssignment(assignment, ()=>{
      console.log("Assignment deleted successfully.");
      alert("Assignment deleted successfully.");
    });

    this.ngOnInit();
  }

}
