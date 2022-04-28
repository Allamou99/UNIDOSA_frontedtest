import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { ExamComponent } from './exam/exam.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'adminpage',component:AdminpageComponent},
  {path:'login',component:LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'user',component:ExamComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
