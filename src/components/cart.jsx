import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getBuyerInfo, updateCart } from "../actions/action";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const user = JSON.parse(sessionStorage.getItem("user"));

const Cart = props => {
  const [quantity, setQuantity] = useState({});
  const [modalState, setModalState] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

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
        for (let key in props.buyerState.cart) {
          temp[key] = props.buyerState.cart[key].qty;
          setQuantity({ ...quantity, ...temp });
        }
      }
    }
  }, [props.buyerState.cart]);

  const changeQty = (id, type) => {
    let temp = quantity[id];
    if (type === "minus") {
      if (temp > 1) {
        temp--;
      }
    } else {
      temp++;
    }
    setQuantity({ ...quantity, ...{ [id]: temp } });
  };

  const closeModal = () => {
    setModalState(false);
  };

  const deleteFromCart = productId => {
    let lines = JSON.parse(JSON.stringify(props.buyerState.cart));
    delete lines[productId];
    console.log("lines: ", lines);
    props.updateCart(user.id, lines);
    closeModal();
  };

  const openDeleteModal = (id, name) => {
    setSelectedProduct({ id: id, name: name });
    setModalState(true);
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
                onClick={() => openDeleteModal(item.id, item.name)}
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
          <h1>Your cart is empty.</h1>
        </div>
      );
    }
    return (
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
          <Modal size="lg" show={modalState} onHide={() => closeModal()}>
            <Modal.Header closeButton>
              <Modal.Title>
                Are you sure to delete{" "}
                <strong className="delete-product-name">
                  {selectedProduct.name}
                </strong>{" "}
                from cart?
              </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => closeModal()}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => deleteFromCart(selectedProduct.id)}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div className="col-md-3 mt-5 pl-5">
          <div className="card sub-total-box">
            <button className="btn btn-sm btn-info mb-1">Clear Cart</button>
            <p>Subtotal: $900</p>
            <p>Tax: $90</p>
            <p>Total: $990</p>
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
