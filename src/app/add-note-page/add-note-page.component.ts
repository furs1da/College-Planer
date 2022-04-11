import { Component, OnInit } from '@angular/core';
import {Note} from "../models/notes.model";

@Component({
  selector: 'app-add-note-page',
  templateUrl: './add-note-page.component.html',
  styleUrls: ['./add-note-page.component.css']
})
export class AddNotePageComponent implements OnInit {
  formTitle = 'Add Note';
  note:Note = new Note("asd", "", "", "", "", 0);
  constructor() { }

  ngOnInit(): void {
  }

  btnSave_click(){

  }
}
