import TodoForm from './TodoForm';
import Todo from './Todo';
import { Pagination } from 'semantic-ui-react';
import { useState } from 'react';
function TodoList() {
  const [todos, setTodos] = useState<
    {
      id: any;
      text: string;
    }[]
  >([]);
  const [error, setError] = useState('');

  const [count, setCount] = useState<{
    currentPage: any;
    todosPerPage: number;
  }>({
    currentPage: 1,
    todosPerPage: 20,
  });
  const addTodo = (todo: { id: string; text: string }) => {
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const updateTodo = (todoId: number | null, newValue: { id: string; text: string }) => {
    setTodos((prev) => prev.map((item) => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = (id: number) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removedArr);
  };

  const indexOfLastTodo = count.currentPage * count.todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - count.todosPerPage;
  const sliceTodo = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  return (
    <>
      <h1>URL bookmark manager</h1>
      {error}
      <TodoForm
        setError={setError}
        onSubmit={addTodo}
        edit={{
          id: undefined,
          value: '',
        }}
      />
      <Todo todos={sliceTodo} setError={setError} removeTodo={removeTodo} updateTodo={updateTodo} />
      {todos.length >= 1 && (
        <Pagination
          defaultActivePage={1}
          firstItem={null}
          lastItem={null}
          pointing
          secondary
          totalPages={Math.ceil(todos.length / count.todosPerPage)}
          onPageChange={(event, data) => {
            setCount((prev) => ({ ...prev, currentPage: data.activePage }));
          }}
        />
      )}
    </>
  );
}

export default TodoList;
