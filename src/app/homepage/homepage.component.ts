import {Component, NgZone, OnInit} from '@angular/core';
import {Quote} from "../models/quote.model";


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})





export class HomepageComponent implements OnInit {
  title = 'Project Planner';
  quote:Quote = new Quote();
  randomNumber:number = Math.random();
  constructor() { }

  ngOnInit(): void {
    this.quote = new Quote();
    this.randomNumber = Math.random();

    fetch("https://type.fit/api/quotes")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {


      });
  }

}
