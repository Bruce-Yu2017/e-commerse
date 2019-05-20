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
    if (sessionStorage.getItem("user")) {
      let user = JSON.parse(sessionStorage.getItem("user"));
      setUser(user.email.slice(0, user.email.indexOf("@")));
    } else {
      history.push("/");
    }
  };

  const logout = () => {
    props.initUserState();
    sessionStorage.clear();
    setUser("");
    history.push("/");
  };

  const iconPopoverComponent = () => {
    let itemNum = props.buyerState.cart ? Object.keys(props.buyerState.cart).length : 0;
    return (
      <Popover id="popover-basic" title="Cart Info:">
        You have {itemNum} {itemNum > 1 ? "items" : "item"} in cart.
      </Popover>
    );
  };

  const togglePopover = () => {
    setPopoverState(!popoverState);
  }

  return (
    <div className='top-nav-bar marginToNavBar'>
      <Navbar bg="light" variant="light" fixed="top">
        {!sessionStorage.getItem("user") && (
          <Navbar.Brand className="mr-auto navBrand">
            <Link to="/">Bruce's Market</Link>
          </Navbar.Brand>
        )}
        {sessionStorage.getItem("user") && (
          <Navbar.Brand className="mr-auto navBrand">
            <Link to="/productlist" className="brand-link">
              Bruce's Market
            </Link>
          </Navbar.Brand>
        )}
        {user.length === 0 && <span className="mr-sm-2">Welcome</span>}
        {user.length > 0 && (
          <span className="mr-sm-2">
            <Link to='/cart'><i className="fas fa fa-cart-plus mr-2 cart-in-navbar" id="cart" onMouseEnter={() => togglePopover()} onMouseLeave={() => togglePopover()}/></Link>
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
