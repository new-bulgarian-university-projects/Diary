import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiaryListComponent } from './diary-list/diary-list.component';

const routes: Routes = [
  {path: 'diaries', component: DiaryListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiaryRoutingModule { }
