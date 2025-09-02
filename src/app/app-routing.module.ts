import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from '@shared/components/login-form/login-form.component';
import { RegistrationFormComponent } from '@shared/components/registration-form/registration-form.component';
import { CourseFormComponent } from '@shared/components/course-form/course-form.component';
import { CourseCardComponent } from '@shared/components/course-card/course-card.component';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';

// TODO: create a CoursesListComponent (wrapper for list of CourseCardComponent)
// For now, we can just use CourseCardComponent as placeholder for the courses list.
import { CourseCardComponent as CoursesListComponent } from '@shared/components/course-card/course-card.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent, canActivate: [NotAuthorizedGuard] },
  { path: 'registration', component: RegistrationFormComponent, canActivate: [NotAuthorizedGuard] },
  { path: 'courses', component: CoursesListComponent, canActivate: [AuthorizedGuard] },
  { path: 'courses/add', component: CourseFormComponent, canActivate: [AuthorizedGuard, AdminGuard] },
  { path: 'courses/edit/:id', component: CourseFormComponent, canActivate: [AuthorizedGuard, AdminGuard] },
  { path: 'courses/:id', component: CourseCardComponent, canActivate: [AuthorizedGuard] },
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', redirectTo: '/courses' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}