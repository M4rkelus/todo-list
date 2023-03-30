import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TodoContext } from '../../context/todoContext';

import { AppRoute } from '../../utils/constants';

import './Filter.styles.css';

export default class Filter extends Component {
  static contextType = TodoContext;

  handleClick = () => {
    this.context.addTodoValue = {
      id: '',
      title: '',
      description: '',
    };

    localStorage.setItem('state', JSON.stringify(this.context));
  };

  render() {
    return (
      <section className='main__filter filter'>
        <div className='filter__wrapper'>
          <div className='filter__item'>
            <input
              type='radio'
              name='filter'
              id='all'
              className='filter__input visually-hidden'
              defaultChecked
              onChange={() => this.props.onFilter('all')}
            />
            <label htmlFor='all' className='filter__label'>
              Все
              <span className='filter__all-count'>
                {this.context.todos.length}
              </span>
            </label>
          </div>
          <div className='filter__item'>
            <input
              type='radio'
              name='filter'
              id='today'
              className='filter__input visually-hidden'
              onChange={() => this.props.onFilter('today')}
            />
            <label htmlFor='today' className='filter__label'>
              Сегодня
              <span className='filter__today-count'>
                {
                  this.context.todos.filter((todo) => {
                    return todo.isToday;
                  }).length
                }
              </span>
            </label>
          </div>
          <div className='filter__item'>
            <input
              type='radio'
              name='filter'
              id='undone'
              className='filter__input visually-hidden'
              onChange={() => this.props.onFilter('undone')}
            />
            <label htmlFor='undone' className='filter__label'>
              Не выполненные
              <span className='filter__undone-count'>
                {
                  this.context.todos.filter((todo) => {
                    return !todo.isDone;
                  }).length
                }
              </span>
            </label>
          </div>
          <div className='filter__item'>
            <input
              type='radio'
              name='filter'
              id='unarchived'
              className='filter__input visually-hidden'
              onChange={() => this.props.onFilter('unarchived')}
            />
            <label htmlFor='unarchived' className='filter__label'>
              Не в архиве
              <span className='filter__unarchived-count'>
                {
                  this.context.todos.filter((todo) => {
                    return !todo.isArchived;
                  }).length
                }
              </span>
            </label>
          </div>
        </div>
        <Link to={AppRoute.ADD}>
          <button className='btn-add' onClick={this.handleClick}>
            Создать
          </button>
        </Link>
      </section>
    );
  }
}
