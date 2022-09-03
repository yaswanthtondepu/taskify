import React, { useRef } from 'react'
import { Todo } from '../model';
import {AiFillDelete, AiFillEdit} from 'react-icons/ai';
import {MdDone} from 'react-icons/md';
import './styles.css';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    index: number;
}

const SingleTodo:React.FC<Props> = ({todo, todos,setTodos, index}) => {

    const [edit, setEdit] = React.useState<boolean>(false);
    const [editTodo, setEditTodo] = React.useState<string>(todo.todo);

    const handleDone = (id:number) => {
        setTodos(todos.map((todo) => {
            if(todo.id === id){
                return {...todo, isDone: !todo.isDone}
            }
            return todo;
        }))
    }

    const handleDelete = (id:number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    const handleEdit = (e:React.FormEvent,id:number) => {
        e.preventDefault();
        setTodos(todos.map((todo) => {
            if(todo.id === id){
                return {...todo, todo: editTodo}
            }
            return todo;
        }))
        setEdit(false);
    }

    React.useEffect(() => {
        inputRef.current?.focus();
    },[edit]);
     
    

    const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
         {
                (provided, snapshot) => (
                    <form className={`todos__single ${snapshot.isDragging?'drag':''}`}
                    onSubmit={(e)=>handleEdit(e, todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                        {edit?(
                            <input 
                            type="input"
                            ref = {inputRef}
                            value={editTodo}
                            placeholder="Edit your task"
                            onChange={(e)=> setEditTodo(e.target.value)}
                            className="todos__single--text"/>
                        ):( 
                            todo.isDone? ( <s className="todos__single--text">{todo.todo}</s>):
                            ( <span className="todos__single--text">{todo.todo}</span>)
                        )}
                        <div>
                            <span className="icon" onClick={() =>{
                                    if(!edit && !todo.isDone){
                                        setEdit(!edit);
                                    }
                                }}>
                                <AiFillEdit />
                            </span>
                            <span className="icon" onClick={()=> handleDelete(todo.id)}>
                                <AiFillDelete/>
                            </span>
                            <span className="icon" onClick={()=> handleDone(todo.id)}>
                                <MdDone/>
                            </span>
                        </div>
                    </form>
                )
         }
    </Draggable>
   
  )
}

export default SingleTodo