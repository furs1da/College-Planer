import { Component, OnInit } from '@angular/core';
import {Assignment} from "../models/assignments.model";

@Component({
  selector: 'app-add-assignment-page',
  templateUrl: './add-assignment-page.component.html',
  styleUrls: ['./add-assignment-page.component.css']
})

export class AddAssignmentPageComponent implements OnInit {
  formTitle = 'Add Assignment';
  //courseId, assignmentNumber, title, dueDate, assignmentFile, fileFormatAttr, fileName, description, weight, isFinished
  assignment:Assignment = new Assignment();

  constructor() { }

  ngOnInit(): void {
  }

  btnSave_click(){
  }

}
