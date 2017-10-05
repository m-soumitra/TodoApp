import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { TodoComponent } from './todo/todo.component';
import { TodoService } from './app-services/todo.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToasterModule
  ],
  providers: [ToasterService, TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
