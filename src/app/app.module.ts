import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule, JwtInterceptor } from '@auth0/angular-jwt';
import { AuthService } from './infrastructure/auth/auth.service';
import { CompanyModule } from './company/company.module';
import { UregisteredUserModule } from './unregistered-user/uregistered-user/uregistered-user.module';
import { ApiService, ConfigService } from './infrastructure/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    AuthModule,
    CompanyModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UregisteredUserModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          // Implement your token retrieval logic here
          return localStorage.getItem('access_token');
        },
        // Other JWT configuration options if needed
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    AuthService,
    ApiService,
    ConfigService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
