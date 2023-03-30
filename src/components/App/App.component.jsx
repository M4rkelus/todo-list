import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { TodoContext } from '../../context/todoContext';
import { ThemeContext } from '../../context/themeContext';

import { AppRoute } from '../../utils/constants';

import Main from '../../pages/Main/Main.component';
import Done from '../../pages/Done/Done.component';
import Archive from '../../pages/Archive/Archive.component';
import Form from '../../pages/Form/Form.component';

import { todosData } from '../../utils/todosData';

import './App.styles.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: todosData,
      filterTodos: [],
      addTodoValue: {
        id: '',
        title: '',
        description: '',
      },
      theme: 'light',
    };
  }

  componentDidMount() {
    const localTheme = JSON.parse(localStorage.getItem('state')).theme;
    this.setState({
      theme: localTheme === this.state.theme ? this.state.theme : localTheme,
    });
  }

  componentDidUpdate(prevState) {
    if (prevState === this.state) return;
    document.body.dataset.theme = this.state.theme;
    const localState = JSON.parse(localStorage.getItem('state'));
    localStorage.setItem(
      'state',
      JSON.stringify({
        todos: localState.todos,
        filterTodos: localState.filterTodos,
        addTodoValue: localState.addTodoValue,
        theme: this.state.theme,
      })
    );
  }

  toggleTheme = () => {
    this.setState({
      theme: this.state.theme === 'light' ? 'dark' : 'light',
    });
  };

  render() {
    if (
      localStorage.getItem('state') === null ||
      localStorage.getItem('state') === undefined
    ) {
      localStorage.setItem('state', JSON.stringify(this.state));
    }
    const localTodos = JSON.parse(localStorage.getItem('state'));

    return (
      <ThemeContext.Provider
        value={{
          theme: this.state.theme,
          toggleTheme: this.toggleTheme,
        }}
      >
        <TodoContext.Provider value={localTodos ? localTodos : this.state}>
          <BrowserRouter>
            <Routes>
              <Route exact path={AppRoute.MAIN} element={<Main />} />
              <Route exact path={AppRoute.DONE} element={<Done />} />
              <Route exact path={AppRoute.ARCHIVE} element={<Archive />} />
              <Route exact path={AppRoute.EVENT} element={<Form />} />
            </Routes>
          </BrowserRouter>
        </TodoContext.Provider>
      </ThemeContext.Provider>
    );
  }
}
