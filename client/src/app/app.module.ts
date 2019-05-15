import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiaryNavComponent } from './diary-nav/diary-nav.component';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { DiaryModule } from './diary/diary.module';
import { AppConfigService } from './utils/AppConfigService';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EntryService } from './diary/entry.service';
import { MaterialModule } from './material/material.module';
import { UserComponent } from './user/user.component';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenInterceptor } from './auth/auth.interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    DiaryNavComponent,
    HomeComponent,
    UserComponent,
    PageNotFoundComponent
  ],
  imports: [
    AuthModule,
    DiaryModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [
    EntryService,
    AuthService,
    AuthGuardService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.loadAppConfig();
        };
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
