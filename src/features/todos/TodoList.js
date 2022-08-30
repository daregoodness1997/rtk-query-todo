import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');

  const handleSunmit = e => {
    e.preventDefault();
    // addTodo
    setNewTodo('');
  };

  const newItemSection = (
    <form onSubmit={handleSunmit}>
      <label htmlFor='new-todo'>Enter a new todo item</label>
      <div>
        <input
          type='text'
          id='new-todo'
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder='Enter a new todo'
        />
      </div>
      <button className='submit'>
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  return (
    <div className='container'>
      <div className='todo-container'>
        <h1>Todo List</h1>
        {newItemSection}
        {content}
      </div>
    </div>
  );
};

export default TodoList;
