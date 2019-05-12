import { REGISTER, CHECK_VALID_USER, INIT_USER_STATE, LOGIN } from "./types";
import history from '../history';
import axios from "axios";

export const login = data => dispatch => {
  let wrongPwd = false;
  let exist = false;
  axios.get("http://localhost:3004/users").then((res) => {
    let users = res.data;
    let foundUser;
    users.forEach((user) => {
      if(user.email === data.email) {
        exist = true;
        foundUser = user;
        if(user.password !== data.password) {
          wrongPwd = true;
        }
      }
    })
    if(!exist || wrongPwd) {
      dispatch({
        type: CHECK_VALID_USER,
        payload: {
          isValid: false,
          msg: "Email or Password are invalid.",
          userData: {},
          type: "login"
        }
      })
    }
    else {
      dispatch({
        type: LOGIN,
        payload: {
          isValid: true,
          msg: "",
          userData: foundUser,
          type: "login"
        }
      });
      console.log(history)
    }
  })
}

export const register = data => dispatch => {
  let count = 0;
  axios.get("http://localhost:3004/users").then(res => {
    let users = res.data;
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === data.email) {
        count++;
        dispatch({
          type: CHECK_VALID_USER,
          payload: {
            isValid: false,
            msg: "This email already exist.",
            userData: {},
            type: "register"
          }
        });
        break;
      }
    }
    if (count === 0) {
      axios.post("http://localhost:3004/users", data).then(res => {
        dispatch({
          type: REGISTER,
          payload: {
            isValid: true,
            msg: "",
            userData: res.data,
            type: "register"
          }
        });
      });
    }
  });
};

export const initUserState = () => {
  return {
    type: INIT_USER_STATE,
    payload: {
      isValid: true,
      msg: "",
      userData: {},
      type: ""
    }
  }
}
