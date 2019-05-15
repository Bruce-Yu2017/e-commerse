import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { connect } from 'react-redux';
import history from '../history';
import { initUserState } from '../actions/action';
import { Link } from 'react-router-dom';

const NavBar = props => {
  
  const [user, setUser] = useState('');

  useEffect(() => {
    getUser();
    
  })

  const getUser = () => {
    if(localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      setUser(user.email.slice(0, user.email.indexOf('@')))
    }
    else {
      history.push("/")
    }
  }

  const logout = () => {
    props.initUserState();
    localStorage.clear();
    setUser("");
    history.push("/")
  }
  return (
    <div>
      <Navbar bg="light" variant="light">
        {!localStorage.getItem('user') && 
          <Navbar.Brand className='mr-auto navBrand'>
            <Link to='/'>Bruce's Market</Link>
          </Navbar.Brand>}
        {localStorage.getItem('user') && 
          <Navbar.Brand className='mr-auto navBrand'>
            <Link to='/productlist' className='brand-link'>Bruce's Market</Link>
          </Navbar.Brand>}
        {user.length === 0 && <span className="mr-sm-2">Welcome</span>}
        {user.length > 0 && <span className="mr-sm-2">Hello, {user} <button onClick={() => logout()} className='btn btn-warning btn-sm ml-2'>Log out</button></span>}
        
      </Navbar>
      
    </div>
  );
};

const mapStateToProps = (state) => {
  return state.userState;
}

export default connect(mapStateToProps, { initUserState })(NavBar);
