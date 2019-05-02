import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiaryNavComponent } from './diary-nav/diary-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { DiaryModule } from './diary/diary.module';
import { AppConfigService } from './utils/AppConfigService';
import { HttpClientModule } from '@angular/common/http';
import { EntryService } from './diary/entry.service';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    DiaryNavComponent,
    HomeComponent
  ],
  imports: [
    AuthModule,
    DiaryModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [
    EntryService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.loadAppConfig();
        };
      }
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
