import React from "react";
import { Route, Router } from "react-router-dom";
import { Switch } from "react-router";
import history from "../history";
import NavBar from "./navbar";
import UserForm from "./userForm";
import ProductList from './productList';
import ProductDetail from './produceDetail';

const App = props => {
  return (
    <div className="container">
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route path="/" exact component={UserForm} />
          <Route path="/productlist" component={ProductList} />
          <Route path="/detail/:productid" exact component={ProductDetail} />

        </Switch>
      </Router>
    </div>
  );
};

export default App;
