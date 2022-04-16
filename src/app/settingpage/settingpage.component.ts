import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../services/database.service";

@Component({
  selector: 'app-settingpage',
  templateUrl: './settingpage.component.html',
  styleUrls: ['./settingpage.component.css']
})
export class SettingpageComponent implements OnInit {

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
  }

  btnCreateDatabase_click(){
    this.database.initDB();
  }
  btnClearDatabase_click(){
    this.database.clearDB();
  }
}
