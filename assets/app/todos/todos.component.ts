import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ToastrService } from '../services/toastr.service';
import { Todo } from '../models/todo';

@Component({
    selector: 'my-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  constructor(private todoService: TodoService, private cd: ChangeDetectorRef, private toastr: ToastrService) {

  }

  ngOnInit() {
    this.todoService.getTodos()
      .subscribe(todos => this.todos = todos)
  }

  addTodo(event, todoText) {
    //console.log(event);
    if (event.which === 1 || event.which === 13) {
      let result;
      let newTodo = {
        text: todoText.value,
        isCompleted: false
      };

      result = this.todoService.saveTodo(newTodo)
        .subscribe(res => {
          this.todos.push(newTodo);
          todoText.value = '';
          this.toastr.success('Todo added', 'Success!');
        });
    }
  }

  updateStatus(todo) {
    let newTodo = {
      _id: todo._id,
      text: todo.text,
      isCompleted: !todo.isCompleted
    };

    this.todoService.updateTodo(newTodo)
      .subscribe(data => {
        todo.isCompleted = !todo.isCompleted;
        this.toastr.success('Todo status changed', 'Success!');
      });
  }


  setEditState(todo, state) {
    console.log(todo, state);
    if (state) {
      todo.isEditMode = true;
    } else {
      delete todo.isEditMode;
    }
  }

  updateTodoText(event, todo) {
    if (event.which === 13) {
      todo.text = event.target.value;
      let newTodo = {
        _id: todo._id,
        text: todo.text,
        isCompleted: todo.isCompleted
      };

      this.todoService.updateTodo(newTodo)
      .subscribe(data => {
        this.setEditState(todo, false);
        this.toastr.success('Todo updated!', 'Success!');
      });
    }
  } 

  deleteTodo(todo) {
    let todos = this.todos;
    this.todoService.deleteTodo(todo._id)
      .subscribe(data => {
        if (data.n == 1) {
          for(let i=0; i<todos.length; i+=1) {
            if (todos[i]['_id'] == todo._id) {
              todos.splice(i, 1);
              this.toastr.info('Todo deleted!', 'Success!');
            }
          }
        }
      })
  }

}