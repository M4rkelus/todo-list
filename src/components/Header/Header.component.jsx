import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';

import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher.component';

import './Header.styles.css';

export default class Header extends Component {
  render() {
    const pathname = window.location.pathname;

    return (
      <section className='main__header'>
        <div className='main__header-wrap'>
          <h1 className='main__header-logo'>Список задач</h1>
          <div className='main__header-group-lnk'>
            <Link
              to='/'
              className={`main__header-lnk ${
                pathname === AppRoute.MAIN && 'lnk-active'
              }`}
            >
              Все задачи
            </Link>
            <Link
              to='/done'
              className={`main__header-lnk ${
                pathname === AppRoute.DONE && 'lnk-active'
              }`}
            >
              Выполненные
            </Link>
            <Link
              to='/archive'
              className={`main__header-lnk ${
                pathname === AppRoute.ARCHIVE && 'lnk-active'
              }`}
            >
              Архив
            </Link>
          </div>
          <ThemeSwitcher />
        </div>
      </section>
    );
  }
}
