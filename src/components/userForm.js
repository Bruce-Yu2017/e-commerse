import React, { useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { connect } from 'react-redux';
import { register, initUserState, login } from '../actions/action';
import uuid from 'uuid';

const UserForm = props => {
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setregPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regInputStatus, setRegInputStatus] = useState({emailTouched: false, pwdTouched: false, confirmPwdTouched: false});
  const [logInEmail, setlogInEmail] = useState('');
  const [logInPassword, setlogInPassword] = useState('');
  const [logInInputStatus, setlogInInputStatus] = useState({emailTouched: false, pwdTouched: false});

  const blur = (from, type) => {
    if(from === 'reg') {
      let temp = {...regInputStatus};
      if(type === "email") {
        setRegInputStatus({...temp, emailTouched: true});
      }
      else if(type === "password") {
        setRegInputStatus({...temp, pwdTouched: true});
      }
      else {
        setRegInputStatus({...temp, confirmPwdTouched: true});
      }
    }
    else {
      let temp = {...logInInputStatus};
      console.log('temp: ', temp);
      if(type === "email") {
        setlogInInputStatus({...temp, emailTouched: true});
      }
      else if(type === "password") {
        setlogInInputStatus({...temp, pwdTouched: true});
      }
    }
    
  }

  const login = (e) => {
    e.preventDefault();
    let data = {
      email: logInEmail,
      password: logInPassword
    }
    props.login(data);
  }

  const register = (event) => {
    event.preventDefault();
    if(regPassword !== regConfirmPassword) {
      alert("Please confirm your password again.");
      return;
    }
    else {
      let data = {
        id: uuid.v1(),
        email: regEmail,
        password: regPassword
      }
      props.register(data);
    }
  }

  const onchangeRegEmail = (event) => {
    setRegEmail(event.target.value);
  }

  const selectLogin = key => {
    if(key === 'register') {
      setlogInEmail('');
      setlogInPassword('');
      setlogInInputStatus({emailTouched: false, pwdTouched: false})
    }
    else {
      setRegEmail('');
      setregPassword('');
      setRegConfirmPassword('');
      setRegInputStatus({emailTouched: false, pwdTouched: false, confirmPwdTouched: false});
    }
    props.initUserState();
  };


  return (
    <div className="mt-5 userForm">
      <Tabs
        defaultActiveKey="login"
        id="uncontrolled-tab-example"
        onSelect={key => {
          selectLogin(key);
        }}
      >
        <Tab eventKey="login" title="Login" className='mt-4'>
          <Form onSubmit={(e) => {login(e)}}>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required value={logInEmail} onChange={(event) => {setlogInEmail(event.target.value)}} onBlur={() => blur('login', 'email')}/>
              {logInInputStatus.emailTouched && logInEmail.length === 0 && <small className='errMsg'>* Please Enter Your Email.</small>}
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required value={logInPassword} onChange={(event) => {setlogInPassword(event.target.value)}} onBlur={() => blur('login', 'password')}/>
              {logInInputStatus.pwdTouched && logInPassword.length === 0 && <small className='errMsg'>* Please Enter Your Password.</small>}
            </Form.Group>
          
            {logInEmail.length > 0 && logInPassword.length > 0 && <Button variant="primary" type="submit">
              Submit
            </Button>}
          </Form>
          {!props.userState.isValid && props.userState.msg && <small className='errMsg'>*{props.userState.msg}</small>}
          
        </Tab>
        <Tab eventKey="register" title="Register" className='mt-4'>
          <Form onSubmit={(event) => register(event)}>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control autoComplete="off" type="email" placeholder="Enter email" required value={regEmail} onChange={(event) => {onchangeRegEmail(event)}} onBlur={() => blur('reg', 'email')}/>
              {regInputStatus.emailTouched && regEmail.length === 0 && <small className='errMsg'>* Please Enter Your Email.</small>}
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required value={regPassword} onChange={(event) => setregPassword(event.target.value)} placeholder="Password" onBlur={() => blur('reg', 'password')}/>
              {regInputStatus.pwdTouched && regPassword.length === 0 && <small className='errMsg'>* Please Enter Your Password.</small>}
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" value={regConfirmPassword} onChange={(event) => setRegConfirmPassword(event.target.value)} required placeholder="Confirm Password" onBlur={() => blur('reg', 'confirmpassword')} />
              {regInputStatus.confirmPwdTouched && regConfirmPassword.length === 0 && <small className='errMsg'>* Please Confirm Your Password.</small>}
            </Form.Group>
            
            {regEmail.length > 0 && regPassword.length > 0 && regConfirmPassword.length > 0 && <Button variant="primary" type="submit">
              Submit
            </Button>}
          </Form>
          {!props.userState.isValid && props.userState.msg && <small className='errMsg'>*{props.userState.msg}</small>}
        </Tab>
      </Tabs>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, {register, initUserState, login})(UserForm);
