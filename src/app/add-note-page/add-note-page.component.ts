import {Component, NgZone, OnInit} from '@angular/core';
import {Note} from "../models/notes.model";
import {Assignment} from "../models/assignments.model";
import {Course} from "../models/courses.model";
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-note-page',
  templateUrl: './add-note-page.component.html',
  styleUrls: ['./add-note-page.component.css']
})
export class AddNotePageComponent implements OnInit {
  formTitle = 'Add Note';
  note:Note = new Note();
  courses: Course[] = [];
  courseId: number = -1;
  assignments: Assignment[] = [];
  selectAssignmentDisabled:boolean = true;

  constructor(private database: DatabaseService,
              private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.database.selectAllCourses().then((data)=>{
      this.courses = data;
    }).catch((error)=>{
      console.error(error)
    });
  }

  onCourseChange(event){
    this.courseId = event;
    this.selectAssignmentDisabled = false;
    this.note.assignmentId = undefined;

    this.database.selectAllAssignmentsByCourse(this.courseId).then((data)=>{
      this.assignments = data;
    }).catch((error)=>{
      console.error(error)
    });
  }

  onAssignmentChange(event){
    this.note.assignmentId = event;
  }

  btnSave_click(){
    this.database.insertNote(this.note, () => {
      console.log("Record added successfully");
      alert("Record added successfully");
      this.ngZone.run(() => {
        this.router.navigate(['listNote/']);
      });
    });
  }
}
