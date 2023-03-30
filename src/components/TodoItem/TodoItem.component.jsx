import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TodoContext } from '../../context/todoContext';

import './TodoItem.styles.css';

export default class Todo extends Component {
  static contextType = TodoContext;

  state = {
    id: this.props.todo.id,
  };

  handleEditClick = () => {
    const context = this.context;
    context.addTodoValue.id = this.props.todo.id;
    context.addTodoValue.title = this.props.todo.value.title;
    context.addTodoValue.description = this.props.todo.value.description;
  };

  handleDeleteClick = () => {
    this.props.onDelete(this.props.todo);
  };

  handleDoneClick = () => {
    this.props.onDone(this.props.todo);
  };

  handleArchiveClick = () => {
    this.props.onArchive(this.props.todo);
  };

  render() {
    return (
      <>
        {this.props.todo.isDone ? (
          <td className='table-cell'>
            <s>Задача {this.props.index}:</s>
          </td>
        ) : (
          <td className='table-cell'>Задача {this.props.index}:</td>
        )}

        <td className='table-cell'>
          <input
            type='checkbox'
            defaultChecked={this.props.todo.isDone}
            onChange={this.handleDoneClick}
          />
        </td>

        <td className='table-cell'>
          <h3 className='todo-title'>{this.props.todo.value.title}</h3>
          <p className='todo-description'>
            {this.props.todo.value.description}
          </p>
        </td>

        <td className='table-cell table-cell_buttons'>
          <Link to={`/event/${this.state.id}`}>
            <button
              className='edit-btn'
              onClick={this.handleEditClick}
            ></button>
          </Link>
          <button
            className={`archive-btn ${
              this.props.todo.isArchived && 'archived'
            }`}
            onClick={this.handleArchiveClick}
          ></button>
          <button
            className='delete-btn'
            onClick={this.handleDeleteClick}
          ></button>
        </td>
      </>
    );
  }
}
