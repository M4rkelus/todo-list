import React, { Component } from 'react';

import Header from '../../components/Header/Header.component';
import TodoList from '../../components/TodoList/TodoList.component';

class Main extends Component {
  render() {
    return (
      <>
        <Header />
        <section className='main__wrapper'>
          <TodoList />
        </section>
      </>
    );
  }
}

export default Main;
