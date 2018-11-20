import React from 'react';

import '../styles.scss';
import './Header.scss';

const Header = () => {
  return (
    <header className="app-header">
      <h1>BC Government Directory</h1>
      <a href="https://www.quartech.com" target="_blank">
        by Quartech Systems
      </a>
    </header>
  );
};
export default Header;
