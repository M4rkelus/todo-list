import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TodoContext } from '../../context/todoContext';

import './TodoItem.styles.css';

export default class Todo extends Component {
  static contextType = TodoContext;

  state = {
    id: this.props.todo.id,
  };

  componentDidMount() {
    const titles = document.querySelectorAll('.todo-title');
    const descriptions = document.querySelectorAll('.todo-description');

    for (let i = 0; i < titles.length; i++) {
      const title = titles[i];
      const description = descriptions[i];

      if (this.isEllipsisActive(title) || this.isEllipsisActive(description)) {
        title.parentNode.classList.add('pointer');
      }
    }
  }

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

  handleOpenClick = (event) => {
    event.currentTarget.classList.toggle('table-cell_open');
  };

  isEllipsisActive = (element) => {
    if (element.clientWidth < element.scrollWidth) {
      const style = element.currentStyle || window.getComputedStyle(element);
      return style.textOverflow === 'ellipsis';
    }
    return false;
  };

  render() {
    const { todo } = this.props;

    return (
      <>
        {todo.isDone ? (
          <td className='table-cell'>
            <s>Задача {this.props.index}:</s>
          </td>
        ) : (
          <td className='table-cell'>Задача {this.props.index}:</td>
        )}

        <td className='table-cell'>
          <input
            type='checkbox'
            defaultChecked={todo.isDone}
            onChange={this.handleDoneClick}
          />
        </td>

        <td className={`table-cell`} onClick={this.handleOpenClick}>
          <h3 className='todo-title'>{todo.value.title}</h3>
          <p className='todo-description'>{todo.value.description}</p>
        </td>

        <td className='table-cell table-cell_buttons'>
          <Link to={`/event/${todo.id}`}>
            <button
              title='редактировать'
              className='edit-btn'
              onClick={this.handleEditClick}
            ></button>
          </Link>
          <button
            title='архивировать'
            className={`archive-btn ${todo.isArchived && 'archived'}`}
            onClick={this.handleArchiveClick}
          ></button>
          <button
            title='удалить'
            className='delete-btn'
            onClick={this.handleDeleteClick}
          ></button>
        </td>
      </>
    );
  }
}
