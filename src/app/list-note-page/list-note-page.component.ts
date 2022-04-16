import {ChangeDetectionStrategy, Component, NgZone, OnInit} from '@angular/core';
import {Course} from "../models/courses.model";
import {Note} from "../models/notes.model";
import {Assignment} from "../models/assignments.model";
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";
import {waitForAsync} from "@angular/core/testing";

@Component({
  selector: 'app-list-note-page',
  templateUrl: './list-note-page.component.html',
  styleUrls: ['./list-note-page.component.css']
})
export class ListNotePageComponent implements OnInit {
  notes: Note[] = [];
  assignments: Assignment[] = [];
  courses: Course[] = [];

  constructor(private database: DatabaseService,
              private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {

    this.database.selectAllNotes().then((data)=>{
      this.notes = data;
    }).then(()=> {

      for(let i=0; i<this.notes.length; i++){
        this.database.selectAssignment(this.notes[i].assignmentId).then((data)=>{
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

  btnModify_click(note: Note){
    this.router.navigate(['modifyNote/' + note.id]);
  }

  btnDelete_click(note: Note){

    this.database.deleteNote(note, ()=>{
      alert("Note deleted successfully.");
      this.ngZone.run(() => {
        window.location.reload()
      });
    });

  }

}
