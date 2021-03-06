import { Component, OnInit } from '@angular/core';
import {TodoService} from '../services/todo.service';
import {Todo} from '../Todo';

@Component({
  moduleId: module.id,
  selector: 'todo',
  templateUrl: 'todo.component.html',

})
export class TodoComponent implements OnInit {

  todos:Todo[];
  title:string;

  constructor(private _todoService: TodoService){

  }

  ngOnInit(){
    this.todos = [];
    this._todoService.getTodos()
      .subscribe(todos => {
          this.todos = todos;
      } );
  }


  addTodo(event:any, todoText:any){
    var result:any;
    var newTodo = {
      text : todoText.value,
      isCompleted: false
    }


    result = this._todoService.saveTodo(newTodo);
    result.subscribe((x:any) => {
      this.todos.push(newTodo);
      todoText.value = '';
    });
  }


  setEditState(todo:any, state:any){
    if(state){
      todo.isEditMode = state;
    } else {
      delete todo.isEditMode;
    }
  }

  updateStatus(todo:any){
    var _todo ={
      _id:todo._id,
      text : todo.text,
      isCompleted: !todo.isCompleted
    }

    this._todoService.updateTodo(_todo)
      .subscribe(data => {
        todo.isCompleted = !todo.isCompleted
      })

  }

  updateTodoText(event:any, todo:any){
    if(event.charCode === 13){
      todo.text = event.target.value;
      var _todo = {
        _id : todo._id,
        text: todo.text,
        isCompleted: todo.isCompleted
      };

      this._todoService.updateTodo(_todo)
        .subscribe(data => {
          this.setEditState(todo, false)
        })

    }
  }

 deleteTodo(todo:any){
    var todos:any = this.todos;
    
    this._todoService.deleteTodo(todo._id)
      .subscribe(data => {
        if(data.n == 1){
          for(var i = 0; i < todos.length; i++){
            if(todos[i]._id == todo._id){
              todos.splice(i, 1);
            }
          }
        }
      })
  }
}