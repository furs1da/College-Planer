import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {AddCoursePageComponent} from "./add-course-page/add-course-page.component";
import {AddAssignmentPageComponent} from "./add-assignment-page/add-assignment-page.component";
import {AddMarkPageComponent} from "./add-mark-page/add-mark-page.component";
import {AddNotePageComponent} from "./add-note-page/add-note-page.component";
import {ListCoursePageComponent} from "./list-course-page/list-course-page.component";
import {ListAssignmentPageComponent} from "./list-assignment-page/list-assignment-page.component";
import {ListMarkPageComponent} from "./list-mark-page/list-mark-page.component";
import {ListNotePageComponent} from "./list-note-page/list-note-page.component";
import {ModifyCoursePageComponent} from "./modify-course-page/modify-course-page.component";
import {ModifyAssignmentPageComponent} from "./modify-assignment-page/modify-assignment-page.component";
import {ModifyMarkPageComponent} from "./modify-mark-page/modify-mark-page.component";
import {ModifyNotePageComponent} from "./modify-note-page/modify-note-page.component";
import {AboutpageComponent} from "./aboutpage/aboutpage.component";
import {SettingpageComponent} from "./settingpage/settingpage.component";


const routes: Routes = [
  {path: "", component: HomepageComponent},
  {path: "home",component: HomepageComponent},
  {path: "addCourse",component: AddCoursePageComponent},
  {path: "addAssignment", component: AddAssignmentPageComponent},
  {path: "addMark", component: AddMarkPageComponent},
  {path: "addNote", component: AddNotePageComponent},
  {path: "listCourse", component: ListCoursePageComponent},
  {path: "listAssignment", component: ListAssignmentPageComponent},
  {path: "listMark", component: ListMarkPageComponent},
  {path: "listNote", component: ListNotePageComponent},
  {path: "modifyCourse/:id", component: ModifyCoursePageComponent},
  {path: "modifyAssignment/:id", component: ModifyAssignmentPageComponent},
  {path: "modifyMark/:id", component: ModifyMarkPageComponent},
  {path: "modifyNote/:id", component: ModifyNotePageComponent},
  {path: "about", component: AboutpageComponent},
  {path: "setting", component: SettingpageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
