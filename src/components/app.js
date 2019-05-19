import React from "react";
import { Route, Router } from "react-router-dom";
import { Switch } from "react-router";
import history from "../history";
import NavBar from "./navbar";
import UserForm from "./userForm";
import ProductList from './productList';
import ProductDetail from './produceDetail';
import Cart from './cart';

const App = props => {
  return (
    <div>
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route path="/" exact component={UserForm} />
          <Route path="/productlist" component={ProductList} />
          <Route path="/detail/:productid" component={ProductDetail} />
          <Route path="/cart" exact component={Cart} />

        </Switch>
      </Router>
    </div>
  );
};

export default App;
