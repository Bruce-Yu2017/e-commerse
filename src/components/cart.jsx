import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getBuyerInfo, updateCart } from "../actions/action";
import Spinner from "react-bootstrap/Spinner";
import DeleteModal from "./deleteModalInCart";
import Alert from "react-bootstrap/Alert";

const user = JSON.parse(sessionStorage.getItem("user"));

const Cart = props => {
  const [quantity, setQuantity] = useState({});
  const [modalState, setModalState] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [modalType, setmodalType] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [resultJson, setresultJson] = useState(null);
  const [cancelAlertState, setcancelAlertState] = useState(false);
  const [successAlertState, setsuccessAlertState] = useState(false);

  const toggleCancelAlert = () => {
    setcancelAlertState(true);
    setTimeout(() => {
      setcancelAlertState(false);      
    }, 3000);
  }
  const toggleSuccessAlert = () => {
    setsuccessAlertState(true);
    setTimeout(() => {
      setsuccessAlertState(false);      
    }, 3000);
  }

  useEffect(() => {
    if (!props.buyerState.id) {
      setTimeout(() => {
        props.getBuyerInfo(user.id);
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (props.buyerState.id) {
      if (props.buyerState.cart) {
        let temp = { ...quantity };
        let calculation = 0;
        for (let key in props.buyerState.cart) {
          temp[key] = props.buyerState.cart[key].qty;
          setQuantity({ ...quantity, ...temp });
          calculation +=
            props.buyerState.cart[key].qty * props.buyerState.cart[key].price;
        }
        setSubtotal(calculation);
      }
    }
  }, [props.buyerState.cart]);

  const changeQty = (id, type) => {
    let unitPrice = props.buyerState.cart[id].price;
    let tempTotal = subtotal;
    let temp = quantity[id];
    if (type === "minus") {
      if (temp > 1) {
        temp--;
        tempTotal -= unitPrice;
        setSubtotal(tempTotal);
      }
    } else {
      temp++;
      tempTotal += unitPrice;
      setSubtotal(tempTotal);
    }
    setQuantity({ ...quantity, ...{ [id]: temp } });
  };

  const closeModal = () => {
    setModalState(false);
  };

  const openDeleteModal = (id, name, type) => {
    if (type === "one") {
      setSelectedProduct({ id: id, name: name });
    }
    setmodalType(type);
    setModalState(true);
  };

  const checkout = () => {
    let lines = JSON.parse(JSON.stringify(props.buyerState.cart));
    for (let key in lines) {
      lines[key].qty = quantity[key];
      delete lines[key].img;
    }
    setresultJson(lines);
    openDeleteModal(null, null, "result");
  };

  const renderLine = () => {
    let lines = JSON.parse(JSON.stringify(props.buyerState.cart));
    let arr = [];
    for (let key in lines) {
      let temp = lines[key];
      temp["id"] = parseInt(key);
      arr.push(temp);
    }
    return arr.map(item => {
      return (
        <div key={item.id}>
          <div className="row mt-2">
            <div className="col-md-2 cart-table-cell">
              <div>
                <img
                  src={require(`./img/${item.img.slice(4)}`)}
                  alt=""
                  className="small-img"
                />
              </div>
            </div>
            <div className="col-md-2 cart-table-cell">{item.name}</div>
            <div className="col-md-2 cart-table-cell">${item.price}</div>
            <div className="col-md-2 cart-table-cell">
              <span>
                <i
                  className="far fa-minus-square mr-2"
                  onClick={() => changeQty(item.id, "minus")}
                />
                {quantity[item.id] !== undefined ? quantity[item.id] : 1}
                <i
                  className="far fa-plus-square ml-2"
                  onClick={() => changeQty(item.id, "addminus")}
                />
              </span>
            </div>
            <div className="col-md-2 cart-table-cell">
              <i
                className="fas fa-trash delete-icon"
                onClick={() => openDeleteModal(item.id, item.name, "one")}
              />
            </div>
            <div className="col-md-2 cart-table-cell">
              <strong>Item Total: ${item.price * quantity[item.id]}</strong>
            </div>
          </div>
          <hr />
        </div>
      );
    });
  };

  const renderCart = () => {
    if (!props.buyerState.id) {
      return (
        <div className="cart-title marginToNavBar">
          <Spinner animation="grow" variant="info" className="cart-spiner" />
        </div>
      );
    }
    if (
      props.buyerState.cart === undefined ||
      Object.keys(props.buyerState.cart).length === 0
    ) {
      return (
        <div className="cart-title marginToNavBar">
          {successAlertState && <Alert variant="success">
            Your order was submitted successfully!
          </Alert>}
          <h1>Your cart is empty.</h1>
        </div>
      );
    }
    return (
      <div>
        <div className="row">
          {cancelAlertState && <Alert variant="success" className="cancel-alert">Your order was cancelled.</Alert>}
        </div>
        <div className="row marginToNavBar">
          <div className="col-md-9">
            <div className="cart-title">
              <h1>Your cart</h1>
            </div>
            <div className="carrTable">
              <div className="cartHeader row">
                <h3 className="col-md-2">Products</h3>
                <h3 className="col-md-2">Name</h3>
                <h3 className="col-md-2">Price</h3>
                <h3 className="col-md-2">Quntity</h3>
                <h3 className="col-md-2">Remove</h3>
                <h3 className="col-md-2">Total</h3>
              </div>
              <div className="tableBody">{renderLine()}</div>
            </div>
            <DeleteModal
              modalState={modalState}
              closeModalFunc={closeModal}
              selectedProduct={selectedProduct}
              modalType={modalType}
              json={resultJson}
              toggleCancelAlert={toggleCancelAlert}
              toggleSuccessAlert={toggleSuccessAlert}
            />
          </div>
          <div className="col-md-3 mt-5 pl-5">
            <div className="card sub-total-box">
              <button
                className="btn btn-sm btn-info mb-1"
                onClick={() => openDeleteModal(null, null, "all")}
              >
                <i className="fas fa-1x mr-1 fa-trash-alt" />
                Clear Cart
              </button>
              <p>Subtotal: ${subtotal}</p>
              <p>Tax: ${(subtotal * 0.1).toFixed(2)}</p>
              <p>Total: ${(subtotal * 1.1).toFixed(2)}</p>
              <button
                className="btn btn-sm btn-warning"
                onClick={() => checkout()}
              >
                <i className="fab fa-2x fa-paypal mr-2 paypal-icon" />
                <span>Check out by Paypal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div>{renderCart()}</div>;
};

const mapStateToProps = state => {
  return {
    buyerState: state.buyerState
  };
};

export default connect(
  mapStateToProps,
  { getBuyerInfo, updateCart }
)(Cart);
