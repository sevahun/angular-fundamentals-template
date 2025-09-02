import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseEditComponent } from './course-edit/course-edit.component';


@NgModule({
  declarations: [
    CoursesListComponent,
    CourseAddComponent,
    CourseDetailsComponent,
    CourseEditComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule { }
