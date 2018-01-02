import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule     } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { RestService } from './rest.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpModule, NgbModule.forRoot(),
  ],
  providers: [AuthService, RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
