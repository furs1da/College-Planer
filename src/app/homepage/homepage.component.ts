import {Component, NgZone, OnInit} from '@angular/core';
import {Quote} from "../models/quote.model";
import {Assignment} from "../models/assignments.model";
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";
import {Course} from "../models/courses.model";
import {Mark} from "../models/marks.model";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})





export class HomepageComponent implements OnInit {
  title = 'Project Planner';
  quote:Quote = new Quote();
  todayDate:Date = new Date();
  assignments: Assignment[] = [];
  courses: Course[] = [];
  dateString:string = "";

  constructor(private database: DatabaseService,
              private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {

    if(localStorage.getItem('day') != new Date().toDateString()) {
    fetch("https://type.fit/api/quotes")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        localStorage.setItem('text', data[Math.floor(Math.random() * data.length)]['text']);
        localStorage.setItem('author', data[Math.floor(Math.random()* data.length)]['author']);
        localStorage.setItem('day', new Date().toDateString());
      });
    }
    this.quote = new Quote(localStorage.getItem('text'), localStorage.getItem('author'));

    this.todayDate = new Date();
    this.dateString = this.todayDate.getFullYear() +'-' +(((this.todayDate.getMonth()+1) > 9) ? (this.todayDate.getMonth()+1) : ('0' + (this.todayDate.getMonth()+1) )) + '-' + ((this.todayDate.getDate() > 9) ? this.todayDate.getDate() : ('0' + this.todayDate.getDate()))

    this.database.selectTop3DueAssignments(this.dateString).then((data)=>{
      if(data !== undefined) {
      this.assignments = data;
      }
      console.log(data)
    }).then( ()=> {
      if(this.assignments.length != 0) {

      for(let i=0; i<this.assignments.length; i++){
        this.database.selectCourse(this.assignments[i].courseId).then((data)=>{
          console.log(data);
          this.courses.push(data);

        }).catch((error)=>{
          console.error(error)
        });
      }
      }

    }).catch((error)=>{
      console.error(error)
    });
  }

}
