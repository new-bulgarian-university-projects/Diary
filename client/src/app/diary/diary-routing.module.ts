import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiaryListComponent } from './diary-list/diary-list.component';
import { DiaryDetailComponent } from './diary-detail/diary-detail.component';
import { DiaryNewComponent } from './diary-new/diary-new.component';


// dont use children: [] because I want to use only one router-outlet
const base = 'entries';
const routes: Routes = [
  {path: base, component: DiaryListComponent},
  {path: `${base}/:id`, component: DiaryDetailComponent},
  {path: `${base}/:id/new`, component: DiaryNewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiaryRoutingModule { }
