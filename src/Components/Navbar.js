import React from 'react';

const Navbar = ({ brand }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">
          {brand}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
