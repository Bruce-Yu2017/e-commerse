import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { connect } from 'react-redux';

const NavBar = props => {
  
  const [user, setUser] = useState('');

  useEffect(() => {
    if(props.isValid) {
        setUser(props.userData.email.slice(0, props.userData.email.indexOf('@')))
    }
  }, [props.isValid, props.userData.email])

  const getUser = () => {
    if(props.userState && props.useState.isValid) {
      let email = props.userState.userData.email
      let name= email.slice(0, email.indexOf('@'));
      setUser(name);
    }
  }
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand className='mr-auto'>Market Place</Navbar.Brand>
        {user.length === 0 && <span className="mr-sm-2">Welcome</span>}
        {user.length > 0 && <span className="mr-sm-2">Hello, {user}</span>}
        
      </Navbar>
      
    </div>
  );
};

const mapStateToProps = (state) => {
  return state.userState;
}

export default connect(mapStateToProps)(NavBar);
