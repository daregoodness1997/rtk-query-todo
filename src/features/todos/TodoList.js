import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTrash } from '@fortawesome/free-solid-svg-icons';

// import queryHooks
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from '../api/apiSlice';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSunmit = e => {
    e.preventDefault();
    // addTodo
    addTodo({ userId: 1, todo: newTodo, complete: false });
    setNewTodo('');
  };

  console.log(newTodo);
  const newItemSection = (
    <form onSubmit={handleSunmit}>
      <label htmlFor='new-todo'>Enter a new todo item</label>
      <div className='nav-section'>
        <input
          type='text'
          id='new-todo'
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder='Enter a new todo'
        />
        <button className='submit'>
          <FontAwesomeIcon icon={faUpload} />
        </button>
      </div>
    </form>
  );

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = todos.map(todo => {
      return (
        <article key={todo.id}>
          <div className='todo'>
            <input
              type='checkbox'
              checked={todo.completed}
              id={todo.id}
              onChange={() =>
                updateTodo({ ...todo, completed: !todo.completed })
              }
            />
            <label htmlFor={todo.id}>{todo.todo}</label>
          </div>
          <button
            className='trash'
            id='trash'
            onClick={() => deleteTodo({ id: todo.id })}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </article>
      );
    });
  } else if (isError) {
    content = <p>{error}</p>;
  }
  return (
    <div className='container'>
      <div className='todo-container'>
        <h1>Todo List</h1>
        {newItemSection}
        <div className='todo-content'>{content}</div>
      </div>
    </div>
  );
};

export default TodoList;
