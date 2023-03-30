import React from 'react';
import Event from '../../components/Event/Event.component';
import Header from '../../components/Header/Header.component';

const Form = () => {
  return (
    <>
      <Header />
      <section className='main__wrapper'>
        <Event />
      </section>
    </>
  );
};

export default Form;
