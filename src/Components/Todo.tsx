import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { MdDeleteForever } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';

interface ITodo {
  todos: {
    id: any;
    text: string;
  }[];
  removeTodo: (id: any) => void;
  updateTodo: (id: any, value: { id: string; text: string }) => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
}
function Todo({ todos, updateTodo, removeTodo, setError }: ITodo) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });
  const submitUpdate = (value: any) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} setError={setError} onSubmit={submitUpdate} />;
  }

  return (
    <>
      {todos.map(
        (
          todo: {
            id: any;
            text: string;
          },
          index: number
        ) => (
          <div className={'todo-row'} key={index}>
            <div key={todo.id}>{todo.text}</div>
            <div className='icons'>
              <MdDeleteForever onClick={() => removeTodo(todo.id)} className='delete-icon' />
              <AiFillEdit
                onClick={() => {
                  setEdit({ id: todo.id, value: todo.text });
                }}
                className='edit-icon'
              />
            </div>
          </div>
        )
      )}
    </>
  );
}

export default Todo;
