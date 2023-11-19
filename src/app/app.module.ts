import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { JwtInterceptor } from './infrastructure/auth/jwt/jwt.interceptor';
import { AuthService } from './infrastructure/auth/auth.service';
import { AuthModule } from './infrastructure/auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CompanyModule } from './company/company.module';
import { UregisteredUserModule } from './unregistered-user/uregistered-user/uregistered-user.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    ComponentsModule,
    AuthModule,
    CompanyModule,
    HttpClientModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UregisteredUserModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
