import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";
import {Note} from "../models/notes.model";
import {Course} from "../models/courses.model";

@Component({
  selector: 'app-list-note-page',
  templateUrl: './list-note-page.component.html',
  styleUrls: ['./list-note-page.component.css']
})
export class ListNotePageComponent implements OnInit {
  notes: Note[] = []
  constructor(private database: DatabaseService,
              private router: Router) { }

  ngOnInit(): void {
    this.database.selectAllNotes().then((data)=>{
      this.notes = data;
    }).catch((error)=>{
      console.error(error)
    });
  }

  btnModify_click(note: Note){
    this.router.navigate(['modifyNote/' + note.id]);
  }

  btnDelete_click(note: Note){
    this.database.deleteNote(note, ()=>{
      console.log("Note deleted successfully.");
      alert("Note deleted successfully.");
    });

    this.ngOnInit();
  }

}
