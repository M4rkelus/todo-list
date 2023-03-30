import React, { Component } from 'react';

import Filter from '../Filter/Filter.component';
import TodoItem from '../TodoItem/TodoItem.component';

import { TodoContext } from '../../context/todoContext';

import './TodoList.styles.css';

export default class Todos extends Component {
  static contextType = TodoContext;

  state = {
    todos: this.context.todos,
    filterTodos: this.context.filterTodos,
  };

  componentDidMount() {
    const todos = this.context.todos || [];
    const filterTodos = this.filterTodos(todos, 'all');
    this.setState({ todos, filterTodos });
    this.handleToday();
  }

  handleDelete = (todo) => {
    const todos = this.state.todos.filter((t) => t.id !== todo.id);
    const filterTodos = this.state.filterTodos.filter((t) => t.id !== todo.id);
    this.setState({ todos, filterTodos });
    this.context.todos = todos;

    localStorage.setItem('state', JSON.stringify(this.context));
  };

  handleDone = (todo) => {
    const todos = [...this.state.todos];
    todos.map((t) => {
      if (t.id === todo.id) {
        t.isDone = !t.isDone;
      }
      return t;
    });
    this.setState({ todos });
    this.context.todos = todos;

    localStorage.setItem('state', JSON.stringify(this.context));
  };

  handleArchive = (todo) => {
    const todos = [...this.state.todos];
    todos.map((t) => {
      if (t.id === todo.id) {
        t.isArchived = !t.isArchived;
      }
      return t;
    });
    this.setState({ todos });
    this.context.todos = todos;

    localStorage.setItem('state', JSON.stringify(this.context));
  };

  handleToday = () => {
    const todos = [...this.state.todos];
    todos.map((t) => {
      if (t.value.date === new Date().toLocaleDateString()) {
        t.isToday = true;
      }
      return t;
    });
    this.setState({ todos });

    localStorage.setItem('state', JSON.stringify(this.context));
  };

  handleFilter = (filter) => {
    const filterTodos = this.filterTodos(this.state.todos, filter);
    this.setState({ filterTodos });
  };

  filterTodos = (todos, filter) => {
    switch (filter) {
      case 'all':
        return todos;
      case 'done':
        return todos.filter((todo) => todo.isDone);
      case 'undone':
        return todos.filter((todo) => !todo.isDone);
      case 'unarchived':
        return todos.filter((todo) => !todo.isArchived);
      case 'today':
        return todos.filter((todo) => todo.isToday);
      default:
        return todos;
    }
  };

  render() {
    const pathname = window.location.pathname;
    const archive = this.state.todos.filter((todo) => todo.isArchived);
    const done = this.state.todos.filter((todo) => todo.isDone);
    const todoItemMarkup = (todo, index) => (
      <tr className='table-row' key={todo.id}>
        <TodoItem
          id={todo.id}
          index={index + 1}
          todo={todo}
          onDelete={this.handleDelete}
          onDone={this.handleDone}
          onArchive={this.handleArchive}
        />
      </tr>
    );

    const todoListMarkup = this.state.filterTodos.map((todo, index) =>
      todoItemMarkup(todo, index)
    );

    const archiveMarkup = archive.length ? (
      archive.map((todo, index) => todoItemMarkup(todo, index))
    ) : (
      <tr className='table-row'>
        <td className='table-cell table-cell_text'>
          <p className='table-row__text'>Нет задач в архиве</p>
        </td>
      </tr>
    );

    const doneMarkup = done.length ? (
      done.map((todo, index) => todoItemMarkup(todo, index))
    ) : (
      <tr className='table-row'>
        <td className='table-cell table-cell_text'>
          <p className='table-row__text'>Нет выполненных задач</p>
        </td>
      </tr>
    );

    return (
      <>
        {pathname === '/' && <Filter onFilter={this.handleFilter} />}
        <table className='todos-table'>
          <tbody>
            {pathname === '/' && todoListMarkup}
            {pathname === '/archive' && archiveMarkup}
            {pathname === '/done' && doneMarkup}
          </tbody>
        </table>
      </>
    );
  }
}
