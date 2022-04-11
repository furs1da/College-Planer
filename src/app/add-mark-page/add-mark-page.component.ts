import { Component, OnInit } from '@angular/core';
import {Mark} from "../models/marks.model";

@Component({
  selector: 'app-add-mark-page',
  templateUrl: './add-mark-page.component.html',
  styleUrls: ['./add-mark-page.component.css']
})
export class AddMarkPageComponent implements OnInit {
  formTitle = 'Add Mark';

  mark:Mark = new Mark(0,0,0);
  constructor() { }

  ngOnInit(): void {
  }

  btnSave_click(){

  }
}
