import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { connect } from "react-redux";
import history from "../history";
import { initUserState } from "../actions/action";
import { Link } from "react-router-dom";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

const NavBar = props => {
  const [user, setUser] = useState("");
  const [popoverState, setPopoverState] = useState(false)

  useEffect(() => {
    getUser();
  });

  const getUser = () => {
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"));
      setUser(user.email.slice(0, user.email.indexOf("@")));
    } else {
      history.push("/");
    }
  };

  const logout = () => {
    props.userState.initUserState();
    localStorage.clear();
    setUser("");
    history.push("/");
  };

  const iconPopoverComponent = () => {
    let itemNum = props.buyerState.cart ? Object.keys(props.buyerState.cart).length : 0;
    return (
      <Popover id="popover-basic" title="Shopping Cart Info:">
        You have {itemNum} {itemNum > 1 ? "items" : "item"} in your shopping cart.
      </Popover>
    );
  };

  const togglePopover = () => {
    setPopoverState(!popoverState);
  }

  return (
    <div>
      <Navbar bg="light" variant="light">
        {!localStorage.getItem("user") && (
          <Navbar.Brand className="mr-auto navBrand">
            <Link to="/">Bruce's Market</Link>
          </Navbar.Brand>
        )}
        {localStorage.getItem("user") && (
          <Navbar.Brand className="mr-auto navBrand">
            <Link to="/productlist" className="brand-link">
              Bruce's Market
            </Link>
          </Navbar.Brand>
        )}
        {user.length === 0 && <span className="mr-sm-2">Welcome</span>}
        {user.length > 0 && (
          <span className="mr-sm-2">
            <i className="fas fa fa-cart-plus mr-2" id="cart" onMouseEnter={() => togglePopover()} onMouseLeave={() => togglePopover()}/>
            <Overlay
              show={popoverState}
              target={document.getElementById("cart")}
              placement="bottom"
              container={this}
              containerPadding={20}
            >
              {iconPopoverComponent()}
            </Overlay>
            Hello, {user}
            <button
              onClick={() => logout()}
              className="btn btn-warning btn-sm ml-2"
            >
              Log out
            </button>
          </span>
        )}
      </Navbar>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userState: state.userState,
    buyerState: state.buyerState
  };
};

export default connect(
  mapStateToProps,
  { initUserState }
)(NavBar);
