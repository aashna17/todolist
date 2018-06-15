import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {TodoComponent} from './components/todo.component';
import {HttpModule} from '@angular/http';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent , TodoComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }