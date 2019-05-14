import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiaryDetailComponent } from './diary-detail/diary-detail.component';
import { DiaryNewComponent } from './diary-new/diary-new.component';
import { DiaryComponent } from './diary.component';
import { AuthGuardService } from '../auth/auth-guard.service';


// dont use children: [] because I want to use only one router-outlet
const base = 'entries';
const routes: Routes = [
  {path: base, component: DiaryComponent},
  {
    path: `${base}/new`,
    component: DiaryNewComponent,
    canActivate: [AuthGuardService]
  },
  {path: `${base}/:id`, component: DiaryDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiaryRoutingModule { }
