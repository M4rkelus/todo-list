import Header from '../../components/Header/Header.component';
import TodoList from '../../components/TodoList/TodoList.component';

const Archive = () => {
  return (
    <>
      <Header />
      <section className='main__wrapper'>
        <TodoList />
      </section>
    </>
  );
};

export default Archive;
