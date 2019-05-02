import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiaryRoutingModule } from './diary-routing.module';
import { DiaryListComponent } from './diary-list/diary-list.component';
import { DiaryItemComponent } from './diary-list/diary-item/diary-item.component';
import { MaterialModule } from '../material/material.module';
import { DiaryDetailComponent } from './diary-detail/diary-detail.component';
import { DiaryNewComponent } from './diary-new/diary-new.component';

@NgModule({
  declarations: [DiaryListComponent,
    DiaryItemComponent,
    DiaryDetailComponent,
    DiaryNewComponent
  ],
  imports: [
    CommonModule,
    DiaryRoutingModule,
    MaterialModule
  ]
})
export class DiaryModule { }
