import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from 'src/app/components/student-list/student-list.component';
import { LoadStudentsGuard } from './components/student-list/guards/load-students.guard';

const routes: Routes = [
  { path: 'students', component: StudentListComponent, canActivate: [LoadStudentsGuard] },
  { path: '', redirectTo: '/students', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
