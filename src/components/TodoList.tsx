import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
import './styles.css';

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList:React.FC<Props> = ({todos,setTodos, completedTodos, setCompletedTodos}) => {
  return (
  <div className="container">
    <Droppable droppableId='TodosList'>
        {
            (provided,snapshot) => (
                 <div className={`todos ${snapshot.isDraggingOver? "dragactive":""}`} ref={provided.innerRef} {...provided.droppableProps}>
        
                        <span className="todos__heading">
                            Active Tasks
                        </span>
                        {todos.map((todo, index) => (
                            <SingleTodo 
                            todo={todo} 
                            index={index}
                            todos={todos} 
                            key={todo.id}
                            setTodos={setTodos}
                            completedTodos={completedTodos}
                            setCompletedTodos={setCompletedTodos}
                            />

                            
                        ))}
                        {provided.placeholder}
                </div>
            )
        }
        
    </Droppable>

    <Droppable droppableId='TodosCompletedList'>
        {
            (provided, snapshot) => (
                 <div className={`todos remove ${snapshot.isDraggingOver? "dragcomplete":""}`} ref={provided.innerRef} {...provided.droppableProps}>
                    <span className="todos__heading">
                        Completed Tasks
                    </span>
                    {
                        completedTodos.map((todo,index) => (
                        <SingleTodo 
                        todo={todo} 
                        index={index}
                        todos={completedTodos} 
                        key={todo.id}
                        setTodos={setCompletedTodos}
                        completedTodos={completedTodos}
                        setCompletedTodos={setCompletedTodos}/>
                        ))
                    }
                    {provided.placeholder}
                </div>
            )
        }
        
    </Droppable>
  </div>
  )
}

export default TodoList