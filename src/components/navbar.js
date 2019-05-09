import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";

const NavBar = props => {
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand className='mr-auto'>Market Place</Navbar.Brand>
        <span className="mr-sm-2">Welcome</span>
        
      </Navbar>
      
    </div>
  );
};

export default NavBar;
