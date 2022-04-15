import { Component, OnInit } from '@angular/core';
import {Course} from "../models/courses.model";
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";
import {Mark} from "../models/marks.model";

@Component({
  selector: 'app-list-mark-page',
  templateUrl: './list-mark-page.component.html',
  styleUrls: ['./list-mark-page.component.css']
})
export class ListMarkPageComponent implements OnInit {
  marks: Mark[] = []
  constructor(private database: DatabaseService,
              private router: Router) { }

  ngOnInit(): void {
    this.database.selectAllMarks().then((data)=>{
      this.marks = data;
    }).catch((error)=>{
      console.error(error)
    });
  }

  btnModify_click(mark: Mark){
    this.router.navigate(['modifyMark/' + mark.id]);
  }

  btnDelete_click(mark: Mark){
    this.database.deleteMark(mark, ()=>{
      console.log("Mark deleted successfully.");
      alert("Mark deleted successfully.");
    });

    this.ngOnInit();
  }


}
