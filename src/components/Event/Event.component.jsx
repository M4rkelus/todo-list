import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { TodoContext } from '../../context/todoContext';

import { ErrorMessages } from '../../utils/constants';

import './Event.styles.css';
import SuccessModal from '../SuccessModal/SuccessModal.component';

export default class Event extends Component {
  static contextType = TodoContext;

  state = {
    defaultValue: {
      id: '',
      title: '',
      description: '',
    },
    value: this.context.addTodoValue,
    showSuccessModal: false,
    redirect: false,
  };

  componentDidMount() {
    const localTheme = JSON.parse(localStorage.getItem('state')).theme;

    if (this.context.addTodoValue.id !== '') {
      localStorage.setItem(
        'state',
        JSON.stringify({
          todos: this.context.todos,
          filterTodos: this.context.filterTodos,
          addTodoValue: this.state.value,
          theme: localTheme,
        })
      );
    }
  }

  componentDidUpdate(prevState) {
    const localTheme = JSON.parse(localStorage.getItem('state')).theme;

    if (prevState === this.state) return;
    localStorage.setItem(
      'state',
      JSON.stringify({
        todos: this.context.todos,
        filterTodos: this.context.filterTodos,
        addTodoValue: this.state.value,
        theme: localTheme,
      })
    );
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      value: {
        ...this.state.value,
        [name]: value,
      },
    });
  };

  addNewTodo = ({ title, description }) => {
    if (!title) return alert(ErrorMessages.NO_TITLE_ERROR);
    if (title.length < 2) return alert(ErrorMessages.TITLE_LENGTH_ERROR);
    const newTodo = {
      id: this.getTime(),
      value: {
        date: new Date().toLocaleDateString(),
        title,
        description,
      },
      isDone: false,
      isSuccessType: true,
    };

    this.context.todos = [...this.context.todos, newTodo];

    this.showModal(true);
  };

  editTodo = () => {
    if (this.state.value.title.length < 2)
      return alert(ErrorMessages.TITLE_LENGTH_ERROR);
    const context = this.context;
    const todos = [...context.todos];
    const todo = todos.find((todo) => todo.id === context.addTodoValue.id);

    todo.value.title = this.state.value.title;
    todo.value.description = this.state.value.description;

    this.showModal(false);
  };

  handleClick = () => {
    if (this.context.addTodoValue.id) {
      this.editTodo();
    } else {
      this.addNewTodo({
        title: this.state.value.title,
        description: this.state.value.description,
      });
      this.clearInput();
    }

    localStorage.setItem(
      'state',
      JSON.stringify({
        todos: this.context.todos,
        filterTodos: this.context.filterTodos,
        addTodoValue: this.state.value,
        theme: this.context.theme,
      })
    );
  };

  clearInput = () => {
    this.setState({
      value: this.state.defaultValue,
    });
    document.querySelector('.add-todo-form').reset();
  };

  showModal = (isSuccess) => {
    this.setState({ showSuccessModal: true, isSuccessType: isSuccess });
    setTimeout(() => {
      this.setState({ showSuccessModal: false, redirect: true });
    }, 1500);
  };

  // Метод для получения времени в миллисекундах для id
  getTime() {
    const date = new Date();
    return date.getTime();
  }

  render() {
    return (
      <>
        {this.state.showSuccessModal && (
          <SuccessModal isSuccess={this.state.isSuccessType} />
        )}
        <form className='add-todo-form'>
          <input
            name='title'
            type='text'
            className='add-todo-input'
            id='todoTitle'
            placeholder='Добавить новую задачу'
            onChange={this.handleChange}
            value={this.state.value.title}
          />
          <textarea
            name='description'
            className='add-todo-textarea'
            id='todoDescription'
            placeholder='Описание задачи'
            onChange={this.handleChange}
            value={this.state.value.description}
          />
          <div className='buttons-container'>
            <button
              type='button'
              className='back-btn'
              onClick={() => {
                window.history.back();
              }}
            >
              Назад
            </button>
            <button
              onClick={this.handleClick}
              className='add-todo-btn'
              type='button'
            >
              {this.state.value.id ? 'Редактировать' : 'Добавить'}
            </button>
          </div>
        </form>
        {this.state.redirect && <Navigate to='/' replace={true} />}
      </>
    );
  }
}
