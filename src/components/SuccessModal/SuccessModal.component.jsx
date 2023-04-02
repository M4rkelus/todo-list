import React, { Component } from 'react';

import './SuccessModal.styles.css';

class SuccessModal extends Component {
  state = {
    visible: true,
  };

  componentDidMount() {
    this.setState({ visible: true });
    setTimeout(() => {
      this.setState({ visible: false });
    }, 1500);
  }

  render() {
    const { visible } = this.state;
    return (
      visible && (
        <div className='success-modal'>
          <div className='success-modal__overlay' />
          <div className='success-modal__content'>
            <p className='success-modal__text'>
              {this.props.isSuccess
                ? 'Задача успешно добавлена!'
                : 'Задача успешно изменена!'}
            </p>
          </div>
        </div>
      )
    );
  }
}

export default SuccessModal;
