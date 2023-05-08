import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ListComponent } from './pages/list/list.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from './environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [AppComponent, SigninComponent, SignupComponent, ListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
