import React from 'react';
import { ThemeContext } from '../../context/themeContext';

import './ThemeSwitcher.styles.css';

export default class ThemeSwitcher extends React.Component {
  static contextType = ThemeContext;

  render() {
    const { theme, toggleTheme } = this.context;

    return (
      <div className='theme-switcher'>
        <label>
          <input
            type='checkbox'
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />
          <span className='slider round' />
        </label>
        <span className='switch-text'>
          {theme === 'light' ? 'Свет' : 'Тьма'}
        </span>
      </div>
    );
  }
}
