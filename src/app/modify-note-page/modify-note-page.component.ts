import {Component, NgZone, OnInit} from '@angular/core';
import {Note} from "../models/notes.model";
import {DatabaseService} from "../services/database.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Assignment} from "../models/assignments.model";
import {Course} from "../models/courses.model";

@Component({
  selector: 'app-modify-note-page',
  templateUrl: './modify-note-page.component.html',
  styleUrls: ['./modify-note-page.component.css']
})
export class ModifyNotePageComponent implements OnInit {
  formTitle : string = "";
  note: Note = new Note();
  courses: Course[] = [];
  courseId: number = -1;
  assignments: Assignment[] = [];
  selectAssignmentDisabled:boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
              private database: DatabaseService,
              private router: Router,
              private ngZone: NgZone) { }

  ngOnInit(): void {
    let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.database.selectNote(id)
      .then((data) => {
        console.info(data);
        this.note = data;
        this.formTitle = 'Modify Note: ' + this.note.title;
      })
      .catch((e) => {
        console.error(e);
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
  btnUpdate_click() {
    this.database.updateNote(this.note, () => {
      console.log("Note updated successfully");
      alert("Note updated successfully");
    });
    this.ngZone.run(() => {
      this.router.navigate(['listNote']);
    });
  }

  btnCancel_click(){
    this.ngZone.run(() => {
      this.router.navigate(['listNote']);
    });
  }

}
