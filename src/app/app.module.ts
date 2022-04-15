import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ListAssignmentPageComponent } from './list-assignment-page/list-assignment-page.component';
import { AddAssignmentPageComponent } from './add-assignment-page/add-assignment-page.component';
import { ModifyAssignmentPageComponent } from './modify-assignment-page/modify-assignment-page.component';
import { ListCoursePageComponent } from './list-course-page/list-course-page.component';
import { AddCoursePageComponent } from './add-course-page/add-course-page.component';
import { ModifyCoursePageComponent } from './modify-course-page/modify-course-page.component';
import { ListNotePageComponent } from './list-note-page/list-note-page.component';
import { AddNotePageComponent } from './add-note-page/add-note-page.component';
import { ModifyNotePageComponent } from './modify-note-page/modify-note-page.component';
import { ListMarkPageComponent } from './list-mark-page/list-mark-page.component';
import { AddMarkPageComponent } from './add-mark-page/add-mark-page.component';
import { ModifyMarkPageComponent } from './modify-mark-page/modify-mark-page.component';
import { AboutpageComponent } from './aboutpage/aboutpage.component';
import {FormsModule} from "@angular/forms";
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomepageComponent,
    ListAssignmentPageComponent,
    AddAssignmentPageComponent,
    ModifyAssignmentPageComponent,
    ListCoursePageComponent,
    AddCoursePageComponent,
    ModifyCoursePageComponent,
    ListNotePageComponent,
    AddNotePageComponent,
    ModifyNotePageComponent,
    ListMarkPageComponent,
    AddMarkPageComponent,
    ModifyMarkPageComponent,
    AboutpageComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
