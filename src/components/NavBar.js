import React from 'react';
import { BsLinkedin, BsGithub } from 'react-icons/bs';

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark bg-color">
      <a className="navbar-brand" href="/">
        <h3 className="mx-4" id="logo">
          Origin<span>OfName</span>
        </h3>
      </a>
      <div className="navbar-brand icons">
        <a
          className="mx-2"
          href="https://github.com/cleosilva"
          target="_blank"
          rel="noreferrer"
        >
          {' '}
          <BsGithub size={25} color="FFF" />
        </a>
        <a
          className="mx-2"
          href="https://www.linkedin.com/in/cleo-silva/"
          target="_blank"
          rel="noreferrer"
        >
          <BsLinkedin size={25} color="FFF" />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
