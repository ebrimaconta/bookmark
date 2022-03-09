import React, { useState, useRef } from 'react';
import { isValidHttpUrl } from '../utils/utils';

interface ITodoForm {
  edit: {
    id: any;
    value: string;
  };
  setError: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (todo: { id: any; text: string }) => void;
}
function TodoForm({ edit, setError, onSubmit }: ITodoForm) {
  const [input, setInput] = useState(edit ? edit.value : '');

  const inputRef = useRef(null);

  const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (isValidHttpUrl(input)) {
      setError('');
      onSubmit({
        id: Date.now(),
        text: input,
      });
    } else {
      setError('Please enter a vaild url');
    }

    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {edit.id ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
            autoComplete='off'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder=''
            value={input}
            onChange={handleChange}
            name='text'
            className='todo-input'
            ref={inputRef}
            autoComplete='off'
          />
          <button onClick={handleSubmit} className='todo-button'>
            Add URL To Bookmark
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
