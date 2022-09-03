import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';


import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './model';


const App: React.FC = () => {

  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const[completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e:React.FormEvent) => {
    e.preventDefault();
    if(todo){
      setTodos([...todos, {id:Date.now(), todo, isDone:false}]);
      setTodo('');
    }
  }

  const onDragEnd = (result:DropResult) => {
    const{source, destination} = result;
    if(!destination) return;
    if(source.droppableId === destination.droppableId && source.index === destination.index) return;

    let add, active = todos, completed = completedTodos;

    if(source.droppableId === 'TodosList'){
      add = active[source.index];
      active.splice(source.index, 1);
    }
    else{
      add = completed[source.index];
      completed.splice(source.index, 1);
    }


     if(destination.droppableId === 'TodosList'){
      active.splice(destination.index, 0, add);
    }
    else{
      completed.splice(source.index, 0, add);
    }

    active.forEach(todo => todo.isDone = false);
    completed.forEach(todo => todo.isDone = true);

    setCompletedTodos(completed);
    setTodos(active);



  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
     <span className="heading">Taskify</span>
     <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
     <TodoList 
      todos={todos}
      setTodos={setTodos}
      completedTodos={completedTodos}
      setCompletedTodos ={setCompletedTodos}/>
    </div>
    </DragDropContext>
  );
}

export default App;
