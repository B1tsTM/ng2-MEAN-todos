import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdCardModule, MdCheckboxModule, MaterialModule } from '@angular/material';

import { AppComponent } from "./app.component";
import { TodosComponent } from "./todos/todos.component";
import { TodoService } from "./services/todo.service";
import { ToastrService } from "./services/toastr.service";

@NgModule({
    declarations: [ AppComponent, TodosComponent ],
    imports:  [ BrowserModule, MdCardModule, MdCheckboxModule, MaterialModule.forRoot() ],
    providers: [ TodoService, ToastrService ],
    bootstrap: [ AppComponent ]
})
export class AppModule {

}