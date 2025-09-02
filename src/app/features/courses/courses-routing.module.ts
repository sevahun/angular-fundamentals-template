import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseEditComponent } from './course-edit/course-edit.component';

const routes: Routes = [
  { path: '', component: CoursesListComponent },
  { path: 'add', component: CourseAddComponent },
  { path: ':id', component: CourseDetailsComponent },
  { path: 'edit/:id', component: CourseEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}